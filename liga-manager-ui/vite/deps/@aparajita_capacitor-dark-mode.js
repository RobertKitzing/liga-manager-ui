import {
  DarkModeAppearance,
  appearanceToStyle,
  isDarkColor,
  isValidHexColor,
  normalizeHexColor,
  registerPlugin,
  styleToAppearance
} from "./chunk-DVOXUN2V.js";
import {
  __async
} from "./chunk-3OV72XIM.js";

// node_modules/@aparajita/capacitor-dark-mode/dist/esm/index.js
var proxy = registerPlugin("DarkModeNative", {
  web: () => __async(null, null, function* () {
    return import("./web-YZ3CPXVO.js").then((module) => new module.DarkModeWeb());
  }),
  ios: () => __async(null, null, function* () {
    return import("./native-EWYK7PGV.js").then((module) => new module.DarkModeNative(proxy));
  }),
  android: () => __async(null, null, function* () {
    return import("./native-EWYK7PGV.js").then((module) => new module.DarkModeNative(proxy));
  })
});
export {
  proxy as DarkMode,
  DarkModeAppearance,
  appearanceToStyle,
  isDarkColor,
  isValidHexColor,
  normalizeHexColor,
  styleToAppearance
};
//# sourceMappingURL=@aparajita_capacitor-dark-mode.js.map
