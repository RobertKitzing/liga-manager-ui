import {
  DarkModeBase
} from "./chunk-OEECWMTR.js";
import "./chunk-DVOXUN2V.js";
import {
  __async
} from "./chunk-3OV72XIM.js";

// node_modules/@aparajita/capacitor-dark-mode/dist/esm/native.js
var DarkModeNative = class extends DarkModeBase {
  constructor(capProxy) {
    super();
    this.setNativeDarkModeListener = capProxy.setNativeDarkModeListener;
    this.isDarkMode = capProxy.isDarkMode;
  }
  registerDarkModeListener() {
    return __async(this, null, function* () {
      const onChange = (data) => {
        this.update(data).catch(console.error);
      };
      yield this.setNativeDarkModeListener({}, onChange);
      this.registeredListener = true;
    });
  }
  // @native(promise)
  isDarkMode() {
    return __async(this, null, function* () {
      return Promise.resolve({
        dark: false
      });
    });
  }
};
export {
  DarkModeNative
};
//# sourceMappingURL=native-EWYK7PGV.js.map
