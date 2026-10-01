# Responsive Device Switcher

Chrome/Chromium Manifest V3 extension for fast responsive QA.

## Features

- Real viewport emulation through Chrome DevTools Protocol
- Apple, Samsung, Xiaomi/Redmi/POCO presets
- Portrait and landscape
- CSS width/height, DPR, touch and mobile user-agent emulation
- Custom viewport
- Quick responsive widths: 320, 360, 375, 390, 393, 412, 430, 768
- Per-tab state and automatic re-apply after reload/navigation
- Reset to desktop
- Keyboard toggle: Alt + Shift + M
- No build step and no npm dependencies

## Install locally

1. Open chrome://extensions
2. Enable Developer mode
3. Click Load unpacked
4. Select this repository folder
5. Pin Responsive Device Switcher
6. Open a normal website and select a device

The extension requests Chrome's debugger permission because DevTools Protocol is required to change viewport metrics, DPR, touch and user-agent.

Responsive emulation tests layout behavior in Chromium. It does not replace testing in the real Safari/WebKit or Samsung Internet rendering engines.
