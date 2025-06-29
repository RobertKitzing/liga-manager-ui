import "./chunk-DEGVVWOK.js";
import {
  isPlatformBrowser
} from "./chunk-QFK7LIOZ.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  NgZone,
  Optional,
  PLATFORM_ID,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-YUVKTLXH.js";
import "./chunk-CC5G7TDW.js";
import "./chunk-FKDPOPPS.js";
import {
  Subject,
  distinctUntilChanged,
  filter,
  map,
  of,
  shareReplay,
  switchMap
} from "./chunk-5LLUFP7J.js";
import "./chunk-HM5YLMWO.js";
import "./chunk-3OV72XIM.js";

// node_modules/ngx-webstorage/fesm2022/ngx-webstorage.mjs
var StorageStrategies;
(function(StorageStrategies2) {
  StorageStrategies2["Local"] = "local_strategy";
  StorageStrategies2["Session"] = "session_strategy";
  StorageStrategies2["InMemory"] = "in_memory_strategy";
})(StorageStrategies || (StorageStrategies = {}));
var CompatHelper = class {
  static isStorageAvailable(storage) {
    let available = true;
    try {
      if (typeof storage === "object") {
        storage.setItem("test-storage", "foobar");
        storage.removeItem("test-storage");
      } else available = false;
    } catch (e) {
      available = false;
    }
    return available;
  }
};
function noop() {
}
var DefaultPrefix = "ngx-webstorage";
var DefaultSeparator = "|";
var DefaultIsCaseSensitive = false;
var StorageKeyManager = class _StorageKeyManager {
  static {
    this.prefix = DefaultPrefix;
  }
  static {
    this.separator = DefaultSeparator;
  }
  static {
    this.isCaseSensitive = DefaultIsCaseSensitive;
  }
  static normalize(raw) {
    raw = _StorageKeyManager.isCaseSensitive ? raw : raw.toLowerCase();
    return `${_StorageKeyManager.prefix}${_StorageKeyManager.separator}${raw}`;
  }
  static isNormalizedKey(key) {
    return key.indexOf(_StorageKeyManager.prefix + _StorageKeyManager.separator) === 0;
  }
  static setPrefix(prefix) {
    _StorageKeyManager.prefix = prefix;
  }
  static setSeparator(separator) {
    _StorageKeyManager.separator = separator;
  }
  static setCaseSensitive(enable) {
    _StorageKeyManager.isCaseSensitive = enable;
  }
  static consumeConfiguration(config) {
    if ("prefix" in config) this.setPrefix(config.prefix);
    if ("separator" in config) this.setSeparator(config.separator);
    if ("caseSensitive" in config) this.setCaseSensitive(config.caseSensitive);
  }
};
var SyncStorage = class {
  constructor(strategy) {
    this.strategy = strategy;
  }
  retrieve(key) {
    let value;
    this.strategy.get(StorageKeyManager.normalize(key)).subscribe((result) => value = typeof result === "undefined" ? null : result);
    return value;
  }
  store(key, value) {
    this.strategy.set(StorageKeyManager.normalize(key), value).subscribe(noop);
    return value;
  }
  clear(key) {
    if (key !== void 0) this.strategy.del(StorageKeyManager.normalize(key)).subscribe(noop);
    else this.strategy.clear().subscribe(noop);
  }
  getStrategyName() {
    return this.strategy.name;
  }
  observe(key) {
    key = StorageKeyManager.normalize(key);
    return this.strategy.keyChanges.pipe(filter((changed) => changed === null || changed === key), switchMap(() => this.strategy.get(key)), distinctUntilChanged(), shareReplay({
      refCount: true,
      bufferSize: 1
    }));
  }
};
var AsyncStorage = class {
  constructor(strategy) {
    this.strategy = strategy;
  }
  retrieve(key) {
    return this.strategy.get(StorageKeyManager.normalize(key)).pipe(map((value) => typeof value === "undefined" ? null : value));
  }
  store(key, value) {
    return this.strategy.set(StorageKeyManager.normalize(key), value);
  }
  clear(key) {
    return key !== void 0 ? this.strategy.del(StorageKeyManager.normalize(key)) : this.strategy.clear();
  }
  getStrategyName() {
    return this.strategy.name;
  }
  observe(key) {
    key = StorageKeyManager.normalize(key);
    return this.strategy.keyChanges.pipe(filter((changed) => changed === null || changed === key), switchMap(() => this.strategy.get(key)), distinctUntilChanged(), shareReplay({
      refCount: true,
      bufferSize: 1
    }));
  }
};
var StrategyCacheService = class _StrategyCacheService {
  constructor() {
    this.caches = {};
  }
  get(strategyName, key) {
    return this.getCacheStore(strategyName)[key];
  }
  set(strategyName, key, value) {
    this.getCacheStore(strategyName)[key] = value;
  }
  del(strategyName, key) {
    delete this.getCacheStore(strategyName)[key];
  }
  clear(strategyName) {
    this.caches[strategyName] = {};
  }
  getCacheStore(strategyName) {
    if (strategyName in this.caches) return this.caches[strategyName];
    return this.caches[strategyName] = {};
  }
  static {
    this.ɵfac = function StrategyCacheService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StrategyCacheService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _StrategyCacheService,
      factory: _StrategyCacheService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StrategyCacheService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var LOCAL_STORAGE = new InjectionToken("window_local_storage");
function getLocalStorage() {
  return typeof window !== "undefined" ? window.localStorage : null;
}
var LocalStorageProvider = {
  provide: LOCAL_STORAGE,
  useFactory: getLocalStorage
};
var SESSION_STORAGE = new InjectionToken("window_session_storage");
function getSessionStorage() {
  return typeof window !== "undefined" ? window.sessionStorage : null;
}
var SessionStorageProvider = {
  provide: SESSION_STORAGE,
  useFactory: getSessionStorage
};
var BaseSyncStorageStrategy = class {
  constructor(storage, cache) {
    this.storage = storage;
    this.cache = cache;
    this.keyChanges = new Subject();
  }
  get isAvailable() {
    if (this._isAvailable === void 0) this._isAvailable = CompatHelper.isStorageAvailable(this.storage);
    return this._isAvailable;
  }
  get(key) {
    let data = this.cache.get(this.name, key);
    if (data !== void 0) return of(data);
    try {
      const item = this.storage.getItem(key);
      if (item !== null) {
        data = JSON.parse(item);
        this.cache.set(this.name, key, data);
      }
    } catch (err) {
      console.warn(err);
    }
    return of(data);
  }
  set(key, value) {
    const data = JSON.stringify(value);
    this.storage.setItem(key, data);
    this.cache.set(this.name, key, value);
    this.keyChanges.next(key);
    return of(value);
  }
  del(key) {
    this.storage.removeItem(key);
    this.cache.del(this.name, key);
    this.keyChanges.next(key);
    return of(null);
  }
  clear() {
    this.storage.clear();
    this.cache.clear(this.name);
    this.keyChanges.next(null);
    return of(null);
  }
};
var LocalStorageStrategy = class _LocalStorageStrategy extends BaseSyncStorageStrategy {
  static {
    this.strategyName = StorageStrategies.Local;
  }
  constructor(storage, cache, platformId, zone) {
    super(storage, cache);
    this.storage = storage;
    this.cache = cache;
    this.platformId = platformId;
    this.zone = zone;
    this.name = _LocalStorageStrategy.strategyName;
    if (isPlatformBrowser(this.platformId)) this.listenExternalChanges();
  }
  listenExternalChanges() {
    window.addEventListener("storage", (event) => this.zone.run(() => {
      if (event.storageArea !== this.storage) return;
      const key = event.key;
      if (key !== null) this.cache.del(this.name, event.key);
      else this.cache.clear(this.name);
      this.keyChanges.next(key);
    }));
  }
  static {
    this.ɵfac = function LocalStorageStrategy_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LocalStorageStrategy)(ɵɵinject(LOCAL_STORAGE), ɵɵinject(StrategyCacheService), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _LocalStorageStrategy,
      factory: _LocalStorageStrategy.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocalStorageStrategy, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LOCAL_STORAGE]
    }]
  }, {
    type: StrategyCacheService
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: NgZone
  }], null);
})();
var SessionStorageStrategy = class _SessionStorageStrategy extends BaseSyncStorageStrategy {
  static {
    this.strategyName = StorageStrategies.Session;
  }
  constructor(storage, cache, platformId, zone) {
    super(storage, cache);
    this.storage = storage;
    this.cache = cache;
    this.platformId = platformId;
    this.zone = zone;
    this.name = _SessionStorageStrategy.strategyName;
    if (isPlatformBrowser(this.platformId)) this.listenExternalChanges();
  }
  listenExternalChanges() {
    window.addEventListener("storage", (event) => this.zone.run(() => {
      if (event.storageArea !== this.storage) return;
      const key = event.key;
      if (event.key !== null) this.cache.del(this.name, event.key);
      else this.cache.clear(this.name);
      this.keyChanges.next(key);
    }));
  }
  static {
    this.ɵfac = function SessionStorageStrategy_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SessionStorageStrategy)(ɵɵinject(SESSION_STORAGE), ɵɵinject(StrategyCacheService), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _SessionStorageStrategy,
      factory: _SessionStorageStrategy.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SessionStorageStrategy, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [SESSION_STORAGE]
    }]
  }, {
    type: StrategyCacheService
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: NgZone
  }], null);
})();
var InMemoryStorageStrategy = class _InMemoryStorageStrategy {
  static {
    this.strategyName = StorageStrategies.InMemory;
  }
  constructor(cache) {
    this.cache = cache;
    this.keyChanges = new Subject();
    this.isAvailable = true;
    this.name = _InMemoryStorageStrategy.strategyName;
  }
  get(key) {
    return of(this.cache.get(this.name, key));
  }
  set(key, value) {
    this.cache.set(this.name, key, value);
    this.keyChanges.next(key);
    return of(value);
  }
  del(key) {
    this.cache.del(this.name, key);
    this.keyChanges.next(key);
    return of(null);
  }
  clear() {
    this.cache.clear(this.name);
    this.keyChanges.next(null);
    return of(null);
  }
  static {
    this.ɵfac = function InMemoryStorageStrategy_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InMemoryStorageStrategy)(ɵɵinject(StrategyCacheService));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _InMemoryStorageStrategy,
      factory: _InMemoryStorageStrategy.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InMemoryStorageStrategy, [{
    type: Injectable
  }], () => [{
    type: StrategyCacheService,
    decorators: [{
      type: Inject,
      args: [StrategyCacheService]
    }]
  }], null);
})();
var STORAGE_STRATEGIES = new InjectionToken("STORAGE_STRATEGIES");
var Strategies = [{
  provide: STORAGE_STRATEGIES,
  useClass: InMemoryStorageStrategy,
  multi: true
}, {
  provide: STORAGE_STRATEGIES,
  useClass: LocalStorageStrategy,
  multi: true
}, {
  provide: STORAGE_STRATEGIES,
  useClass: SessionStorageStrategy,
  multi: true
}];
var [InMemoryStorageStrategyProvider, LocalStorageStrategyProvider, SessionStorageStrategyProvider] = Strategies;
var StorageStrategyStubName = "stub_strategy";
var StorageStrategyStub = class {
  constructor(name) {
    this.keyChanges = new Subject();
    this.store = {};
    this._available = true;
    this.name = name || StorageStrategyStubName;
  }
  get isAvailable() {
    return this._available;
  }
  get(key) {
    return of(this.store[key]);
  }
  set(key, value) {
    this.store[key] = value;
    this.keyChanges.next(key);
    return of(value);
  }
  del(key) {
    delete this.store[key];
    this.keyChanges.next(key);
    return of(null);
  }
  clear() {
    this.store = {};
    this.keyChanges.next(null);
    return of(null);
  }
};
var StorageStub = class {
  constructor() {
    this.store = {};
  }
  get length() {
    return Object.keys(this.store).length;
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  key(index) {
    return Object.keys(this.store)[index];
  }
  removeItem(key) {
    delete this.store[key];
  }
  setItem(key, value) {
    this.store[key] = value;
  }
};
var InvalidStrategyError = "invalid_strategy";
var StrategyIndex = class _StrategyIndex {
  static {
    this.index = {};
  }
  constructor(strategies) {
    this.strategies = strategies;
    this.registration$ = new Subject();
    if (!strategies) strategies = [];
    this.strategies = strategies.reverse().map((strategy, index, arr) => strategy.name).map((name, index, arr) => arr.indexOf(name) === index ? index : null).filter((index) => index !== null).map((index) => strategies[index]);
  }
  static get(name) {
    if (!this.isStrategyRegistered(name)) throw Error(InvalidStrategyError);
    let strategy = this.index[name];
    if (!strategy.isAvailable) {
      strategy = this.index[StorageStrategies.InMemory];
    }
    return strategy;
  }
  static set(name, strategy) {
    this.index[name] = strategy;
  }
  static clear(name) {
    if (name !== void 0) delete this.index[name];
    else this.index = {};
  }
  static isStrategyRegistered(name) {
    return name in this.index;
  }
  static hasRegistredStrategies() {
    return Object.keys(this.index).length > 0;
  }
  getStrategy(name) {
    return _StrategyIndex.get(name);
  }
  indexStrategies() {
    this.strategies.forEach((strategy) => this.register(strategy.name, strategy));
  }
  indexStrategy(name, overrideIfExists = false) {
    if (_StrategyIndex.isStrategyRegistered(name) && !overrideIfExists) return _StrategyIndex.get(name);
    const strategy = this.strategies.find((strategy2) => strategy2.name === name);
    if (!strategy) throw new Error(InvalidStrategyError);
    this.register(name, strategy, overrideIfExists);
    return strategy;
  }
  register(name, strategy, overrideIfExists = false) {
    if (!_StrategyIndex.isStrategyRegistered(name) || overrideIfExists) {
      _StrategyIndex.set(name, strategy);
      this.registration$.next(name);
    }
  }
  static {
    this.ɵfac = function StrategyIndex_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StrategyIndex)(ɵɵinject(STORAGE_STRATEGIES, 8));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _StrategyIndex,
      factory: _StrategyIndex.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StrategyIndex, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [STORAGE_STRATEGIES]
    }]
  }], null);
})();
var LocalStorageService = class extends SyncStorage {
};
function buildService$1(index) {
  const strategy = index.indexStrategy(StorageStrategies.Local);
  return new SyncStorage(strategy);
}
var LocalStorageServiceProvider = {
  provide: LocalStorageService,
  useFactory: buildService$1,
  deps: [StrategyIndex]
};
var SessionStorageService = class extends SyncStorage {
};
function buildService(index) {
  const strategy = index.indexStrategy(StorageStrategies.Session);
  return new SyncStorage(strategy);
}
var SessionStorageServiceProvider = {
  provide: SessionStorageService,
  useFactory: buildService,
  deps: [StrategyIndex]
};
var DecoratorBuilder = class {
  static buildSyncStrategyDecorator(strategyName, prototype, propName, key, defaultValue = null) {
    const rawKey = key || propName;
    let storageKey;
    Object.defineProperty(prototype, propName, {
      get: function() {
        let value;
        StrategyIndex.get(strategyName).get(getKey()).subscribe((result) => value = result);
        return value === void 0 ? defaultValue : value;
      },
      set: function(value) {
        StrategyIndex.get(strategyName).set(getKey(), value).subscribe(noop);
      }
    });
    function getKey() {
      if (storageKey !== void 0) return storageKey;
      return storageKey = StorageKeyManager.normalize(rawKey);
    }
  }
};
function LocalStorage(key, defaultValue) {
  return function(prototype, propName) {
    DecoratorBuilder.buildSyncStrategyDecorator(StorageStrategies.Local, prototype, propName, key, defaultValue);
  };
}
function SessionStorage(key, defaultValue) {
  return function(prototype, propName) {
    DecoratorBuilder.buildSyncStrategyDecorator(StorageStrategies.Session, prototype, propName, key, defaultValue);
  };
}
var LIB_CONFIG = new InjectionToken("ngx_webstorage_config");
var InternalNgxWebstorageFeatureKind;
(function(InternalNgxWebstorageFeatureKind2) {
  InternalNgxWebstorageFeatureKind2[InternalNgxWebstorageFeatureKind2["Config"] = 1] = "Config";
  InternalNgxWebstorageFeatureKind2[InternalNgxWebstorageFeatureKind2["LocalStorage"] = 2] = "LocalStorage";
  InternalNgxWebstorageFeatureKind2[InternalNgxWebstorageFeatureKind2["SessionStorage"] = 3] = "SessionStorage";
})(InternalNgxWebstorageFeatureKind || (InternalNgxWebstorageFeatureKind = {}));
function appInit() {
  const config = inject(LIB_CONFIG);
  const index = inject(StrategyIndex);
  return () => {
    StorageKeyManager.consumeConfiguration(config);
    index.indexStrategies();
  };
}
function provideNgxWebstorage(...features) {
  const {
    configProvider,
    featureProviders
  } = parseFeatures(features);
  return makeEnvironmentProviders([configProvider, InMemoryStorageStrategyProvider, provideAppInitializer(() => {
    const initializerFn = appInit();
    return initializerFn();
  }), ...featureProviders]);
}
function parseFeatures(features) {
  let configProvider;
  const featureProviders = [];
  const parsedFeatures = /* @__PURE__ */ new Set();
  for (const feature of features) {
    if (parsedFeatures.has(feature.kind)) throw new Error(`Feature ${feature.kind} is already provided.`);
    if (feature.kind === InternalNgxWebstorageFeatureKind.Config) {
      configProvider = feature.providers[0];
    } else featureProviders.push(...feature.providers);
    parsedFeatures.add(feature.kind);
  }
  return {
    configProvider: configProvider ?? {
      provide: LIB_CONFIG,
      useValue: {
        prefix: DefaultPrefix,
        separator: DefaultSeparator,
        caseSensitive: DefaultIsCaseSensitive
      }
    },
    featureProviders
  };
}
function makeNgxWebstorageFeature(kind, providers) {
  return {
    kind,
    providers
  };
}
function withNgxWebstorageConfig(config) {
  return makeNgxWebstorageFeature(InternalNgxWebstorageFeatureKind.Config, [{
    provide: LIB_CONFIG,
    useValue: config
  }]);
}
function withLocalStorage() {
  return makeNgxWebstorageFeature(InternalNgxWebstorageFeatureKind.LocalStorage, [LocalStorageProvider, LocalStorageServiceProvider, LocalStorageStrategyProvider]);
}
function withSessionStorage() {
  return makeNgxWebstorageFeature(InternalNgxWebstorageFeatureKind.SessionStorage, [SessionStorageProvider, SessionStorageServiceProvider, SessionStorageStrategyProvider]);
}
export {
  AsyncStorage,
  CompatHelper,
  InMemoryStorageStrategy,
  InternalNgxWebstorageFeatureKind,
  InvalidStrategyError,
  LIB_CONFIG,
  LOCAL_STORAGE,
  LocalStorage,
  LocalStorageService,
  LocalStorageStrategy,
  SESSION_STORAGE,
  STORAGE_STRATEGIES,
  SessionStorage,
  SessionStorageService,
  SessionStorageStrategy,
  StorageStrategies,
  StorageStrategyStub,
  StorageStrategyStubName,
  StorageStub,
  StrategyCacheService,
  StrategyIndex,
  SyncStorage,
  makeNgxWebstorageFeature,
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage
};
//# sourceMappingURL=ngx-webstorage.js.map
