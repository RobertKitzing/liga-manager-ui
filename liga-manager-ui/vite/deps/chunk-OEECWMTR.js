import {
  Capacitor,
  DarkModeAppearance,
  StatusBar,
  Style,
  WebPlugin,
  isDarkColor,
  isValidHexColor,
  normalizeHexColor
} from "./chunk-DVOXUN2V.js";
import {
  __async
} from "./chunk-3OV72XIM.js";

// node_modules/@aparajita/capacitor-dark-mode/dist/esm/base.js
var kDefaultBackgroundVariable = "--background";
var DarkModeBase = class extends WebPlugin {
  constructor() {
    super(...arguments);
    this.appearance = DarkModeAppearance.system;
    this.darkModeClass = "dark";
    this.registeredListener = false;
    this.appearanceListeners = /* @__PURE__ */ new Set();
    this.syncStatusBar = true;
    this.statusBarBackgroundVariable = kDefaultBackgroundVariable;
    this.handleTransitions = true;
  }
  // @native(callback)
  /* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/require-await */
  // noinspection JSUnusedLocalSymbols
  setNativeDarkModeListener(options, callback) {
    return __async(this, null, function* () {
      throw this.unimplemented("setNativeDarkModeListener is native only");
    });
  }
  /* eslint-enable @typescript-eslint/no-unused-vars,@typescript-eslint/require-await */
  init() {
    return __async(this, arguments, function* ({
      cssClass,
      statusBarBackgroundVariable,
      getter,
      setter,
      syncStatusBar,
      statusBarStyleGetter,
      disableTransitions
    } = {}) {
      if (cssClass) {
        document.documentElement.classList.remove(this.darkModeClass);
        this.darkModeClass = cssClass;
      }
      this.statusBarBackgroundVariable = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      statusBarBackgroundVariable || kDefaultBackgroundVariable;
      if (typeof getter === "function") {
        this.getter = getter;
      }
      if (typeof setter === "function") {
        this.setter = setter;
      }
      if (typeof syncStatusBar === "boolean" || syncStatusBar === "textOnly") {
        this.syncStatusBar = syncStatusBar;
      }
      if (typeof statusBarStyleGetter === "function") {
        this.statusBarStyleGetter = statusBarStyleGetter;
      }
      if (typeof disableTransitions === "boolean") {
        this.handleTransitions = disableTransitions;
      }
      if (!this.registeredListener) {
        yield this.registerDarkModeListener();
      }
      yield this.update();
    });
  }
  configure(options) {
    return __async(this, null, function* () {
      return this.init(options);
    });
  }
  addAppearanceListener(listener) {
    return __async(this, null, function* () {
      this.appearanceListeners.add(listener);
      return Promise.resolve({
        remove: () => this.appearanceListeners.delete(listener)
      });
    });
  }
  disableTransitions() {
    if (!this.handleTransitions) {
      return;
    }
    if (!this.disableTransitionsStyle) {
      this.disableTransitionsStyle = document.createElement("style");
      this.disableTransitionsStyle.innerText = `* { transition: none !important; --transition: none !important; } ion-content::part(background) { transition: none !important; }`;
    }
    document.head.appendChild(this.disableTransitionsStyle);
  }
  enableTransitions() {
    if (!this.handleTransitions) {
      return;
    }
    if (this.disableTransitionsStyle) {
      const style = this.disableTransitionsStyle;
      window.setTimeout(() => {
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      }, 100);
    }
  }
  update(data) {
    return __async(this, null, function* () {
      const oldDarkMode = document.body.classList.contains(this.darkModeClass);
      let darkMode;
      let appearance = this.appearance;
      if (this.getter) {
        const getterResult = yield this.getter();
        if (getterResult) {
          appearance = getterResult;
        }
      }
      if (appearance === DarkModeAppearance.system) {
        darkMode = data ? data.dark : (yield this.isDarkMode()).dark;
      } else {
        darkMode = appearance === DarkModeAppearance.dark;
      }
      if (darkMode !== oldDarkMode) {
        this.disableTransitions();
        document.body.classList[darkMode ? "add" : "remove"](this.darkModeClass);
        this.enableTransitions();
      }
      if (Capacitor.isNativePlatform()) {
        yield this.handleStatusBar(darkMode);
      }
      if (this.setter && this.appearance !== appearance) {
        yield this.setter(appearance);
      }
      if (data) {
        for (const listener of this.appearanceListeners) {
          listener(data);
        }
      }
      this.appearance = appearance;
      return Promise.resolve(this.appearance);
    });
  }
  getBackgroundColor() {
    const content = document.querySelector("ion-content");
    if (content) {
      const color = getComputedStyle(content).getPropertyValue(this.statusBarBackgroundVariable).trim();
      if (isValidHexColor(color)) {
        return normalizeHexColor(color);
      } else {
        console.warn(`Invalid hex color '${color}' for ${this.statusBarBackgroundVariable}`);
      }
    }
    return "";
  }
  handleStatusBar(darkMode) {
    return __async(this, null, function* () {
      let setStatusBarStyle = Capacitor.getPlatform() === "ios";
      let statusBarStyle = darkMode ? Style.Dark : Style.Light;
      let color = "";
      if (this.syncStatusBar && Capacitor.getPlatform() === "android") {
        setStatusBarStyle = true;
        if (this.syncStatusBar !== "textOnly") {
          color = this.getBackgroundColor();
        }
        if (this.statusBarStyleGetter) {
          const style = yield this.statusBarStyleGetter(statusBarStyle, color);
          if (style) {
            statusBarStyle = style;
          }
        } else if (color) {
          statusBarStyle = isDarkColor(color) ? Style.Dark : Style.Light;
        } else {
          setStatusBarStyle = false;
        }
      }
      const actions = [];
      if (color) {
        actions.push(StatusBar.setBackgroundColor({
          color
        }));
      }
      if (setStatusBarStyle) {
        actions.push(StatusBar.setStyle({
          style: statusBarStyle
        }));
      }
      if (actions.length) {
        yield Promise.all(actions);
      }
    });
  }
};

export {
  DarkModeBase
};
//# sourceMappingURL=chunk-OEECWMTR.js.map
