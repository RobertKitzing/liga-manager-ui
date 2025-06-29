import {
  DarkModeBase
} from "./chunk-OEECWMTR.js";
import "./chunk-DVOXUN2V.js";
import {
  __async
} from "./chunk-3OV72XIM.js";

// node_modules/@aparajita/capacitor-dark-mode/dist/esm/web.js
var DarkModeWeb = class extends DarkModeBase {
  registerDarkModeListener() {
    return __async(this, null, function* () {
      const onChange = (ev) => {
        this.update({
          dark: ev.matches
        }).catch(console.error);
      };
      const query = this.getDarkModeQuery();
      if (query.addEventListener) {
        query.addEventListener("change", onChange);
      } else {
        query.addListener(onChange);
      }
      this.registeredListener = true;
      return Promise.resolve();
    });
  }
  isDarkMode() {
    return __async(this, null, function* () {
      const query = this.getDarkModeQuery();
      return Promise.resolve({
        dark: query ? query.matches : false
      });
    });
  }
  getDarkModeQuery() {
    if (!this.mediaQuery) {
      this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    }
    return this.mediaQuery;
  }
};
export {
  DarkModeWeb
};
//# sourceMappingURL=web-YZ3CPXVO.js.map
