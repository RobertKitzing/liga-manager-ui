import {
  ApplicationRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  VERSION,
  createComponent,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-YUVKTLXH.js";

// node_modules/@angular/cdk/fesm2022/style-loader-Cu9AvjH9.mjs
var appsWithLoaders = /* @__PURE__ */ new WeakMap();
var _CdkPrivateStyleLoader = class __CdkPrivateStyleLoader {
  _appRef;
  _injector = inject(Injector);
  _environmentInjector = inject(EnvironmentInjector);
  /**
   * Loads a set of styles.
   * @param loader Component which will be instantiated to load the styles.
   */
  load(loader) {
    const appRef = this._appRef = this._appRef || this._injector.get(ApplicationRef);
    let data = appsWithLoaders.get(appRef);
    if (!data) {
      data = {
        loaders: /* @__PURE__ */ new Set(),
        refs: []
      };
      appsWithLoaders.set(appRef, data);
      appRef.onDestroy(() => {
        appsWithLoaders.get(appRef)?.refs.forEach((ref) => ref.destroy());
        appsWithLoaders.delete(appRef);
      });
    }
    if (!data.loaders.has(loader)) {
      data.loaders.add(loader);
      data.refs.push(createComponent(loader, {
        environmentInjector: this._environmentInjector
      }));
    }
  }
  static ɵfac = function _CdkPrivateStyleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __CdkPrivateStyleLoader)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: __CdkPrivateStyleLoader,
    factory: __CdkPrivateStyleLoader.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_CdkPrivateStyleLoader, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/backwards-compatibility-DHR38MsD.mjs
function _bindEventWithOptions(renderer, target, eventName, callback, options) {
  const major = parseInt(VERSION.major);
  const minor = parseInt(VERSION.minor);
  if (major > 19 || major === 19 && minor > 0 || major === 0 && minor === 0) {
    return renderer.listen(target, eventName, callback, options);
  }
  target.addEventListener(eventName, callback, options);
  return () => {
    target.removeEventListener(eventName, callback, options);
  };
}

export {
  _CdkPrivateStyleLoader,
  _bindEventWithOptions
};
//# sourceMappingURL=chunk-2RXY62XX.js.map
