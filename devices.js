export const DEVICE_GROUPS = [
  {
    id: "apple",
    label: "Apple",
    devices: [
      { id: "iphone-se-3", label: "iPhone SE (3rd gen)", width: 375, height: 667, dpr: 2, platform: "iPhone", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" },
      { id: "iphone-13-mini", label: "iPhone 13 mini", width: 375, height: 812, dpr: 3, platform: "iPhone", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" },
      { id: "iphone-14", label: "iPhone 14", width: 390, height: 844, dpr: 3, platform: "iPhone", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" },
      { id: "iphone-14-pro-max", label: "iPhone 14 Pro Max", width: 430, height: 932, dpr: 3, platform: "iPhone", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" },
      { id: "iphone-15-pro", label: "iPhone 15 Pro", width: 393, height: 852, dpr: 3, platform: "iPhone", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" },
      { id: "iphone-15-pro-max", label: "iPhone 15 Pro Max", width: 430, height: 932, dpr: 3, platform: "iPhone", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" },
      { id: "iphone-16-pro", label: "iPhone 16 Pro", width: 402, height: 874, dpr: 3, platform: "iPhone", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" },
      { id: "iphone-16-pro-max", label: "iPhone 16 Pro Max", width: 440, height: 956, dpr: 3, platform: "iPhone", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" },
      { id: "ipad-mini", label: "iPad mini", width: 768, height: 1024, dpr: 2, platform: "iPad", ua: "Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" }
    ]
  },
  {
    id: "samsung",
    label: "Samsung",
    devices: [
      { id: "galaxy-a54", label: "Galaxy A54", width: 360, height: 800, dpr: 3, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; SM-A546B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "galaxy-s21", label: "Galaxy S21", width: 360, height: 800, dpr: 3, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "galaxy-s22-ultra", label: "Galaxy S22 Ultra", width: 384, height: 824, dpr: 3.5, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "galaxy-s23", label: "Galaxy S23", width: 360, height: 780, dpr: 3, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "galaxy-s23-ultra", label: "Galaxy S23 Ultra", width: 384, height: 824, dpr: 3.5, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "galaxy-s24", label: "Galaxy S24", width: 360, height: 780, dpr: 3, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 15; SM-S921B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "galaxy-s24-ultra", label: "Galaxy S24 Ultra", width: 384, height: 824, dpr: 3.5, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 15; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "galaxy-z-flip5", label: "Galaxy Z Flip5", width: 360, height: 748, dpr: 3, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; SM-F731B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" }
    ]
  },
  {
    id: "xiaomi",
    label: "Xiaomi",
    devices: [
      { id: "xiaomi-12", label: "Xiaomi 12", width: 393, height: 873, dpr: 2.75, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; 2201123G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "xiaomi-13", label: "Xiaomi 13", width: 393, height: 873, dpr: 2.75, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; 2211133G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "xiaomi-14", label: "Xiaomi 14", width: 393, height: 852, dpr: 3, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 15; 23127PN0CG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "xiaomi-14-ultra", label: "Xiaomi 14 Ultra", width: 412, height: 915, dpr: 3.5, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 15; 24030PN60G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "redmi-note-12", label: "Redmi Note 12", width: 393, height: 873, dpr: 2.75, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; 23021RAAEG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "redmi-note-13-pro", label: "Redmi Note 13 Pro", width: 393, height: 873, dpr: 2.75, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; 23090RA98G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" },
      { id: "poco-x6-pro", label: "POCO X6 Pro", width: 393, height: 873, dpr: 2.75, platform: "Android", ua: "Mozilla/5.0 (Linux; Android 14; 2311DRK48G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36" }
    ]
  }
];

export const QUICK_WIDTHS = [
  { label: "320", width: 320, height: 700, dpr: 2 },
  { label: "360", width: 360, height: 800, dpr: 3 },
  { label: "375", width: 375, height: 812, dpr: 3 },
  { label: "390", width: 390, height: 844, dpr: 3 },
  { label: "393", width: 393, height: 852, dpr: 3 },
  { label: "412", width: 412, height: 915, dpr: 3 },
  { label: "430", width: 430, height: 932, dpr: 3 },
  { label: "768", width: 768, height: 1024, dpr: 2 }
];

export function findDevice(deviceId) {
  for (const group of DEVICE_GROUPS) {
    const device = group.devices.find(function(item) { return item.id === deviceId; });
    if (device) return Object.assign({}, device, { groupId: group.id, groupLabel: group.label });
  }
  return null;
}
