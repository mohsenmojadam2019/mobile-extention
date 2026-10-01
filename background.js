import { findDevice } from "./devices.js";

const PROTOCOL_VERSION = "1.3";
const SESSION_PREFIX = "responsive-tab:";
const DEFAULT_DEVICE_ID = "iphone-15-pro";

function sessionKey(tabId) { return SESSION_PREFIX + tabId; }

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0] || null;
}

async function getTabState(tabId) {
  const key = sessionKey(tabId);
  const result = await chrome.storage.session.get(key);
  return result[key] || null;
}

async function saveTabState(tabId, state) {
  const payload = {};
  payload[sessionKey(tabId)] = state;
  await chrome.storage.session.set(payload);
}

async function clearTabState(tabId) { await chrome.storage.session.remove(sessionKey(tabId)); }

function canEmulate(tab) {
  if (!tab || !tab.id || !tab.url) return false;
  return !/^(chrome|edge|about|chrome-extension|devtools):/i.test(tab.url);
}

async function isAttached(tabId) {
  const targets = await chrome.debugger.getTargets();
  return targets.some(function(target) { return target.tabId === tabId && target.attached; });
}

async function attach(tabId) {
  if (!(await isAttached(tabId))) await chrome.debugger.attach({ tabId: tabId }, PROTOCOL_VERSION);
}

function metricsFromState(state) {
  const portrait = state.orientation !== "landscape";
  return {
    width: portrait ? state.baseWidth : state.baseHeight,
    height: portrait ? state.baseHeight : state.baseWidth,
    dpr: state.dpr,
    orientation: portrait ? "portraitPrimary" : "landscapePrimary",
    angle: portrait ? 0 : 90
  };
}

async function applyState(tabId, state) {
  await attach(tabId);
  const metrics = metricsFromState(state);

  await chrome.debugger.sendCommand({ tabId: tabId }, "Emulation.setDeviceMetricsOverride", {
    width: metrics.width,
    height: metrics.height,
    deviceScaleFactor: Number(state.dpr) || 1,
    mobile: state.mobile !== false,
    screenWidth: metrics.width,
    screenHeight: metrics.height,
    screenOrientation: { type: metrics.orientation, angle: metrics.angle }
  });

  await chrome.debugger.sendCommand({ tabId: tabId }, "Emulation.setTouchEmulationEnabled", {
    enabled: state.touch !== false,
    maxTouchPoints: state.touch === false ? 0 : 5
  });

  if (state.userAgent) {
    await chrome.debugger.sendCommand({ tabId: tabId }, "Emulation.setUserAgentOverride", {
      userAgent: state.userAgent,
      platform: state.platform || ""
    });
  }

  const saved = Object.assign({}, state, {
    enabled: true,
    width: metrics.width,
    height: metrics.height,
    updatedAt: Date.now()
  });

  await saveTabState(tabId, saved);
  await chrome.action.setBadgeBackgroundColor({ tabId: tabId, color: "#111827" });
  await chrome.action.setBadgeText({ tabId: tabId, text: String(metrics.width) });
  await chrome.action.setTitle({
    tabId: tabId,
    title: "Responsive Device Switcher - " + metrics.width + "x" + metrics.height + " @ " + state.dpr + "x"
  });
  return saved;
}

async function resetTab(tabId) {
  try {
    if (await isAttached(tabId)) {
      await chrome.debugger.sendCommand({ tabId: tabId }, "Emulation.clearDeviceMetricsOverride");
      await chrome.debugger.sendCommand({ tabId: tabId }, "Emulation.setTouchEmulationEnabled", { enabled: false, maxTouchPoints: 0 });
      await chrome.debugger.sendCommand({ tabId: tabId }, "Emulation.setUserAgentOverride", { userAgent: "" });
      await chrome.debugger.detach({ tabId: tabId });
    }
  } catch (error) { console.warn("Reset warning:", error); }
  await clearTabState(tabId);
  await chrome.action.setBadgeText({ tabId: tabId, text: "" });
  await chrome.action.setTitle({ tabId: tabId, title: "Responsive Device Switcher" });
}

function stateForDevice(device, orientation) {
  return {
    mode: "preset",
    deviceId: device.id,
    label: device.label,
    brand: device.groupLabel || "",
    baseWidth: device.width,
    baseHeight: device.height,
    dpr: device.dpr,
    orientation: orientation || "portrait",
    touch: true,
    mobile: true,
    userAgent: device.ua,
    platform: device.platform
  };
}

async function applyPreset(tabId, deviceId, orientation) {
  const device = findDevice(deviceId);
  if (!device) throw new Error("Device preset not found.");
  return applyState(tabId, stateForDevice(device, orientation));
}

async function applyCustom(tabId, payload) {
  const width = Math.max(240, Math.min(2560, Number(payload.width) || 393));
  const height = Math.max(320, Math.min(2560, Number(payload.height) || 852));
  const dpr = Math.max(1, Math.min(5, Number(payload.dpr) || 1));
  return applyState(tabId, {
    mode: "custom",
    deviceId: "custom",
    label: "Custom viewport",
    brand: "Custom",
    baseWidth: width,
    baseHeight: height,
    dpr: dpr,
    orientation: payload.orientation === "landscape" ? "landscape" : "portrait",
    touch: payload.touch !== false,
    mobile: payload.mobile !== false,
    userAgent: payload.userAgent || "Mozilla/5.0 (Linux; Android 15; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36",
    platform: payload.platform || "Android"
  });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  (async function() {
    const tab = await getActiveTab();
    if (!tab || !tab.id) throw new Error("No active tab found.");
    if (message.type !== "GET_STATE" && !canEmulate(tab)) throw new Error("Open a normal website tab first.");

    if (message.type === "GET_STATE") {
      sendResponse({ ok: true, tab: { id: tab.id, title: tab.title, url: tab.url }, state: await getTabState(tab.id) });
      return;
    }
    if (message.type === "APPLY_PRESET") {
      sendResponse({ ok: true, state: await applyPreset(tab.id, message.deviceId, message.orientation) });
      return;
    }
    if (message.type === "APPLY_CUSTOM") {
      sendResponse({ ok: true, state: await applyCustom(tab.id, message) });
      return;
    }
    if (message.type === "ROTATE") {
      const current = await getTabState(tab.id);
      if (!current || !current.enabled) throw new Error("Enable a device first.");
      const next = Object.assign({}, current, { orientation: current.orientation === "landscape" ? "portrait" : "landscape" });
      sendResponse({ ok: true, state: await applyState(tab.id, next) });
      return;
    }
    if (message.type === "RESET") {
      await resetTab(tab.id);
      sendResponse({ ok: true, state: null });
      return;
    }
    throw new Error("Unknown action.");
  })().catch(function(error) {
    sendResponse({ ok: false, error: error && error.message ? error.message : String(error) });
  });
  return true;
});

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo) {
  if (changeInfo.status !== "loading") return;
  const state = await getTabState(tabId);
  if (!state || !state.enabled) return;
  try { await applyState(tabId, state); } catch (error) { console.warn("Reapply failed:", error); }
});

chrome.tabs.onRemoved.addListener(async function(tabId) { await clearTabState(tabId); });

chrome.debugger.onDetach.addListener(async function(source) {
  if (!source.tabId) return;
  await clearTabState(source.tabId);
  try { await chrome.action.setBadgeText({ tabId: source.tabId, text: "" }); } catch (error) {}
});

chrome.commands.onCommand.addListener(async function(command) {
  if (command !== "toggle-responsive") return;
  const tab = await getActiveTab();
  if (!tab || !tab.id || !canEmulate(tab)) return;
  const current = await getTabState(tab.id);
  if (current && current.enabled) await resetTab(tab.id);
  else await applyPreset(tab.id, DEFAULT_DEVICE_ID, "portrait");
});

chrome.runtime.onInstalled.addListener(async function() {
  await chrome.storage.local.set({ lastDeviceId: DEFAULT_DEVICE_ID, lastBrandId: "apple", lastOrientation: "portrait" });
});
