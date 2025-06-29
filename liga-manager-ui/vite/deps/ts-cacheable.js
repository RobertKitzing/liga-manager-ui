import {
  merge
} from "./chunk-CC5G7TDW.js";
import "./chunk-FKDPOPPS.js";
import {
  Observable,
  Subject,
  delay,
  empty,
  finalize,
  of,
  publishReplay,
  refCount,
  tap
} from "./chunk-5LLUFP7J.js";
import "./chunk-HM5YLMWO.js";
import "./chunk-3OV72XIM.js";

// node_modules/ts-cacheable/dist/esm5/common/IStorageStrategy.js
var IStorageStrategy = (
  /** @class */
  /* @__PURE__ */ function() {
    function IStorageStrategy2() {
    }
    return IStorageStrategy2;
  }()
);

// node_modules/ts-cacheable/dist/esm5/common/InMemoryStorageStrategy.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var InMemoryStorageStrategy = (
  /** @class */
  function(_super) {
    __extends(InMemoryStorageStrategy2, _super);
    function InMemoryStorageStrategy2() {
      var _this2 = _super !== null && _super.apply(this, arguments) || this;
      _this2.cachePairs = [];
      return _this2;
    }
    InMemoryStorageStrategy2.prototype.add = function(cachePair, cacheKey, ctx) {
      this.cachePairs.push(cachePair);
    };
    ;
    InMemoryStorageStrategy2.prototype.addMany = function(cachePairs) {
      this.cachePairs = cachePairs;
    };
    ;
    InMemoryStorageStrategy2.prototype.updateAtIndex = function(index, entity) {
      var updatee = this.cachePairs[index];
      Object.assign(updatee, entity);
    };
    InMemoryStorageStrategy2.prototype.update = function(index, entity) {
      var updatee = this.cachePairs[index];
      Object.assign(updatee, entity);
    };
    InMemoryStorageStrategy2.prototype.getAll = function() {
      return this.cachePairs;
    };
    ;
    InMemoryStorageStrategy2.prototype.removeAtIndex = function(index) {
      this.cachePairs.splice(index, 1);
    };
    InMemoryStorageStrategy2.prototype.remove = function(index) {
      this.cachePairs.splice(index, 1);
    };
    InMemoryStorageStrategy2.prototype.removeAll = function() {
      this.cachePairs.length = 0;
    };
    return InMemoryStorageStrategy2;
  }(IStorageStrategy)
);

// node_modules/ts-cacheable/dist/esm5/common/IAsyncStorageStrategy.js
var IAsyncStorageStrategy = (
  /** @class */
  /* @__PURE__ */ function() {
    function IAsyncStorageStrategy2() {
    }
    return IAsyncStorageStrategy2;
  }()
);

// node_modules/ts-cacheable/dist/esm5/common/DOMStorageStrategy.js
var __extends2 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var DOMStorageStrategy = (
  /** @class */
  function(_super) {
    __extends2(DOMStorageStrategy2, _super);
    function DOMStorageStrategy2() {
      var _this2 = _super.call(this) || this;
      _this2.masterCacheKey = GlobalCacheConfig.globalCacheKey;
      if (typeof localStorage == "undefined") {
        throw new Error("Platform not supported.");
      }
      return _this2;
    }
    DOMStorageStrategy2.prototype.add = function(cachePair, cacheKey) {
      var allCachedData = this.getRawData();
      if (!allCachedData[cacheKey]) {
        allCachedData[cacheKey] = [];
      }
      allCachedData[cacheKey].push(cachePair);
      this.storeRawData(allCachedData);
    };
    ;
    DOMStorageStrategy2.prototype.addMany = function(cachePairs, cacheKey) {
      var allCachedData = this.getRawData();
      if (!allCachedData[cacheKey]) {
        allCachedData[cacheKey] = [];
      }
      allCachedData[cacheKey] = cachePairs;
      this.storeRawData(allCachedData);
    };
    ;
    DOMStorageStrategy2.prototype.getAll = function(cacheKey) {
      return this.getRawData()[cacheKey] || [];
    };
    ;
    DOMStorageStrategy2.prototype.removeAtIndex = function(index, cacheKey) {
      var allCachedData = this.getRawData();
      if (allCachedData[cacheKey] && allCachedData[cacheKey].length) {
        allCachedData[cacheKey].splice(index, 1);
      }
      this.storeRawData(allCachedData);
    };
    DOMStorageStrategy2.prototype.remove = function(index, entity, cacheKey) {
      var allCachedData = this.getRawData();
      if (allCachedData[cacheKey] && allCachedData[cacheKey].length) {
        allCachedData[cacheKey].splice(index, 1);
      }
      this.storeRawData(allCachedData);
    };
    DOMStorageStrategy2.prototype.updateAtIndex = function(index, entity, cacheKey) {
      var allCachedData = this.getRawData();
      if (allCachedData[cacheKey] && allCachedData[cacheKey][index]) {
        allCachedData[cacheKey][index] = entity;
      }
      this.storeRawData(allCachedData);
    };
    DOMStorageStrategy2.prototype.update = function(index, entity, cacheKey) {
      var allCachedData = this.getRawData();
      if (allCachedData[cacheKey] && allCachedData[cacheKey][index]) {
        allCachedData[cacheKey][index] = entity;
      }
      this.storeRawData(allCachedData);
    };
    DOMStorageStrategy2.prototype.removeAll = function(cacheKey) {
      var allCachedData = this.getRawData();
      if (allCachedData[cacheKey] && allCachedData[cacheKey].length) {
        allCachedData[cacheKey].length = 0;
      }
      this.storeRawData(allCachedData);
    };
    DOMStorageStrategy2.prototype.getRawData = function() {
      var data = localStorage.getItem(this.masterCacheKey);
      try {
        return JSON.parse(data) || {};
      } catch (error) {
        throw new Error(error);
      }
    };
    DOMStorageStrategy2.prototype.storeRawData = function(data) {
      localStorage.setItem(this.masterCacheKey, JSON.stringify(data));
    };
    return DOMStorageStrategy2;
  }(IStorageStrategy)
);

// node_modules/ts-cacheable/dist/esm5/common/LocalStorageStrategy.js
var __extends3 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var LocalStorageStrategy = (
  /** @class */
  function(_super) {
    __extends3(LocalStorageStrategy2, _super);
    function LocalStorageStrategy2() {
      var _this2 = _super.call(this) || this;
      _this2.masterCacheKey = GlobalCacheConfig.globalCacheKey;
      if (typeof localStorage == "undefined") {
        throw new Error("Platform not supported.");
      }
      return _this2;
    }
    LocalStorageStrategy2.prototype.add = function(cachePair, cacheKey) {
      var allCachedData = this.getRawData();
      if (!allCachedData[cacheKey]) {
        allCachedData[cacheKey] = [];
      }
      allCachedData[cacheKey].push(cachePair);
      this.storeRawData(allCachedData);
    };
    ;
    LocalStorageStrategy2.prototype.addMany = function(cachePairs, cacheKey) {
      var allCachedData = this.getRawData();
      if (!allCachedData[cacheKey]) {
        allCachedData[cacheKey] = [];
      }
      allCachedData[cacheKey] = cachePairs;
      this.storeRawData(allCachedData);
    };
    ;
    LocalStorageStrategy2.prototype.getAll = function(cacheKey) {
      return this.getRawData()[cacheKey] || [];
    };
    ;
    LocalStorageStrategy2.prototype.removeAtIndex = function(index, cacheKey) {
      var allCachedData = this.getRawData();
      if (allCachedData[cacheKey] && allCachedData[cacheKey].length) {
        allCachedData[cacheKey].splice(index, 1);
      }
      this.storeRawData(allCachedData);
    };
    LocalStorageStrategy2.prototype.remove = function(index, entity, cacheKey) {
      var allCachedData = this.getRawData();
      if (allCachedData[cacheKey] && allCachedData[cacheKey].length) {
        allCachedData[cacheKey].splice(index, 1);
      }
      this.storeRawData(allCachedData);
    };
    LocalStorageStrategy2.prototype.updateAtIndex = function(index, entity, cacheKey) {
      var allCachedData = this.getRawData();
      if (allCachedData[cacheKey] && allCachedData[cacheKey][index]) {
        allCachedData[cacheKey][index] = entity;
      }
      this.storeRawData(allCachedData);
    };
    LocalStorageStrategy2.prototype.update = function(index, entity, cacheKey) {
      var allCachedData = this.getRawData();
      if (allCachedData[cacheKey] && allCachedData[cacheKey][index]) {
        allCachedData[cacheKey][index] = entity;
      }
      this.storeRawData(allCachedData);
    };
    LocalStorageStrategy2.prototype.removeAll = function(cacheKey) {
      var allCachedData = this.getRawData();
      if (allCachedData[cacheKey] && allCachedData[cacheKey].length) {
        allCachedData[cacheKey].length = 0;
      }
      this.storeRawData(allCachedData);
    };
    LocalStorageStrategy2.prototype.getRawData = function() {
      var data = localStorage.getItem(this.masterCacheKey);
      try {
        return JSON.parse(data) || {};
      } catch (error) {
        throw new Error(error);
      }
    };
    LocalStorageStrategy2.prototype.storeRawData = function(data) {
      localStorage.setItem(this.masterCacheKey, JSON.stringify(data));
    };
    return LocalStorageStrategy2;
  }(IStorageStrategy)
);

// node_modules/ts-cacheable/dist/esm5/common/CacheBusterFunctions.js
function bustCache(cacheBusterConfig) {
  if (cacheBusterConfig === null || cacheBusterConfig === void 0 ? void 0 : cacheBusterConfig.cacheBusterNotifier) {
    cacheBusterConfig.cacheBusterNotifier.next();
  }
}
function isInstant(cacheBusterConfig) {
  return cacheBusterConfig && "isInstant" in cacheBusterConfig && cacheBusterConfig.isInstant;
}

// node_modules/ts-cacheable/dist/esm5/common/index.js
var DEFAULT_CACHE_RESOLVER = function(oldParams, newParams) {
  return JSON.stringify(oldParams) === JSON.stringify(newParams);
};
var DEFAULT_HASHER = function(parameters) {
  return parameters.map(function(param) {
    return param !== void 0 ? JSON.parse(JSON.stringify(param)) : param;
  });
};
var GlobalCacheConfig = {
  storageStrategy: InMemoryStorageStrategy,
  globalCacheKey: "CACHE_STORAGE",
  promiseImplementation: Promise
};

// node_modules/ts-cacheable/dist/esm5/cache-buster.decorator.js
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function CacheBuster(cacheBusterConfig) {
  return function(_target, _propertyKey, propertyDescriptor) {
    var decoratedMethod = propertyDescriptor.value;
    if (propertyDescriptor && propertyDescriptor.value) {
      propertyDescriptor.value = function() {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          parameters[_i] = arguments[_i];
        }
        if (isInstant(cacheBusterConfig)) {
          bustCache(cacheBusterConfig);
          return decoratedMethod.call.apply(decoratedMethod, __spreadArray([this], parameters, false));
        }
        var decoratedMethodResult = decoratedMethod.call.apply(decoratedMethod, __spreadArray([this], parameters, false));
        throwErrorIfResultIsNotObservable(decoratedMethodResult);
        return decoratedMethodResult.pipe(tap(function() {
          bustCache(cacheBusterConfig);
        }));
      };
    }
    ;
    return propertyDescriptor;
  };
}
var NO_OBSERVABLE_ERROR_MESSAGE = "\n  Method decorated with @CacheBuster should return observable. \n  If you don't want to change the method signature, set isInstant flag to true.\n";
function throwErrorIfResultIsNotObservable(decoratedMethodResult) {
  if (decoratedMethodResult instanceof Observable === false) {
    throw new Error(NO_OBSERVABLE_ERROR_MESSAGE);
  }
}

// node_modules/ts-cacheable/dist/esm5/cacheable.decorator.js
var __spreadArray2 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var globalCacheBusterNotifier = new Subject();
function Cacheable(cacheConfig) {
  if (cacheConfig === void 0) {
    cacheConfig = {};
  }
  return function(_target, _propertyKey, propertyDescriptor) {
    var _this2 = this;
    var cacheKey = cacheConfig.cacheKey || _target.constructor.name + "#" + _propertyKey;
    var oldMethod = propertyDescriptor.value;
    if (propertyDescriptor && propertyDescriptor.value) {
      var storageStrategy_1 = !cacheConfig.storageStrategy ? new GlobalCacheConfig.storageStrategy() : new cacheConfig.storageStrategy();
      var pendingCachePairs_1 = [];
      if (cacheConfig.cacheModifier) {
        cacheConfig.cacheModifier.subscribe(function(callback) {
          return storageStrategy_1.addMany(callback(storageStrategy_1.getAll(cacheKey, _this2)), cacheKey, _this2);
        });
      }
      merge(globalCacheBusterNotifier.asObservable(), cacheConfig.cacheBusterObserver ? cacheConfig.cacheBusterObserver : empty()).subscribe(function(_) {
        storageStrategy_1.removeAll(cacheKey, _this2);
        pendingCachePairs_1.length = 0;
      });
      var cacheResolver = cacheConfig.cacheResolver || GlobalCacheConfig.cacheResolver;
      cacheConfig.cacheResolver = cacheResolver ? cacheResolver : DEFAULT_CACHE_RESOLVER;
      var cacheHasher = cacheConfig.cacheHasher || GlobalCacheConfig.cacheHasher;
      cacheConfig.cacheHasher = cacheHasher ? cacheHasher : DEFAULT_HASHER;
      propertyDescriptor.value = function() {
        var _this3 = this;
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          parameters[_i] = arguments[_i];
        }
        var cachePairs = storageStrategy_1.getAll(cacheKey, this);
        var cacheParameters = cacheConfig.cacheHasher(parameters);
        var _foundCachePair = cachePairs.find(function(cp) {
          return cacheConfig.cacheResolver(cp.parameters, cacheParameters);
        });
        var _foundPendingCachePair = pendingCachePairs_1.find(function(cp) {
          return cacheConfig.cacheResolver(cp.parameters, cacheParameters);
        });
        if ((cacheConfig.maxAge || GlobalCacheConfig.maxAge) && _foundCachePair && _foundCachePair.created) {
          if ((/* @__PURE__ */ new Date()).getTime() - new Date(_foundCachePair.created).getTime() > (cacheConfig.maxAge || GlobalCacheConfig.maxAge)) {
            storageStrategy_1.remove ? storageStrategy_1.remove(cachePairs.indexOf(_foundCachePair), _foundCachePair, cacheKey, this) : storageStrategy_1.removeAtIndex(cachePairs.indexOf(_foundCachePair), cacheKey, this);
            _foundCachePair = null;
          } else if (cacheConfig.slidingExpiration || GlobalCacheConfig.slidingExpiration) {
            _foundCachePair.created = /* @__PURE__ */ new Date();
            storageStrategy_1.update ? storageStrategy_1.update(cachePairs.indexOf(_foundCachePair), _foundCachePair, cacheKey, this) : storageStrategy_1.updateAtIndex(cachePairs.indexOf(_foundCachePair), _foundCachePair, cacheKey, this);
          }
        }
        if (_foundCachePair) {
          var cached$ = of(_foundCachePair.response);
          return cacheConfig.async ? cached$.pipe(delay(0)) : cached$;
        } else if (_foundPendingCachePair) {
          return _foundPendingCachePair.response;
        } else {
          var response$ = oldMethod.call.apply(oldMethod, __spreadArray2([this], parameters, false)).pipe(finalize(function() {
            var _pendingCachePairToRemove = pendingCachePairs_1.find(function(cp) {
              return cacheConfig.cacheResolver(cp.parameters, cacheParameters);
            });
            pendingCachePairs_1.splice(pendingCachePairs_1.indexOf(_pendingCachePairToRemove), 1);
          }), tap(function(response) {
            if (!cacheConfig.shouldCacheDecider || cacheConfig.shouldCacheDecider(response)) {
              if (!(cacheConfig.maxCacheCount || GlobalCacheConfig.maxCacheCount) || (cacheConfig.maxCacheCount || GlobalCacheConfig.maxCacheCount) === 1 || (cacheConfig.maxCacheCount || GlobalCacheConfig.maxCacheCount) && (cacheConfig.maxCacheCount || GlobalCacheConfig.maxCacheCount) < cachePairs.length + 1) {
                storageStrategy_1.remove ? storageStrategy_1.remove(0, cachePairs[0], cacheKey, _this3) : storageStrategy_1.removeAtIndex(0, cacheKey, _this3);
              }
              storageStrategy_1.add({
                parameters: cacheParameters,
                response,
                created: cacheConfig.maxAge || GlobalCacheConfig.maxAge ? /* @__PURE__ */ new Date() : null
              }, cacheKey, _this3);
            }
          }), publishReplay(1), refCount());
          pendingCachePairs_1.push({
            parameters: cacheParameters,
            response: response$,
            created: /* @__PURE__ */ new Date()
          });
          return response$;
        }
      };
    }
    return propertyDescriptor;
  };
}

// node_modules/ts-cacheable/dist/esm5/promise.cache-buster.decorator.js
var __spreadArray3 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function PCacheBuster(cacheBusterConfig) {
  return function(_target, _propertyKey, propertyDescriptor) {
    var decoratedMethod = propertyDescriptor.value;
    if (propertyDescriptor && propertyDescriptor.value) {
      propertyDescriptor.value = function() {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          parameters[_i] = arguments[_i];
        }
        if (isInstant(cacheBusterConfig)) {
          bustCache(cacheBusterConfig);
          return decoratedMethod.call.apply(decoratedMethod, __spreadArray3([this], parameters, false));
        }
        var decoratedMethodResult = decoratedMethod.call.apply(decoratedMethod, __spreadArray3([this], parameters, false));
        throwErrorIfResultIsNotPromise(decoratedMethodResult);
        return decoratedMethodResult.then(function(response) {
          bustCache(cacheBusterConfig);
          return response;
        });
      };
    }
    ;
    return propertyDescriptor;
  };
}
var NO_PROMISE_ERROR_MESSAGE = "\n  Method decorated with @CacheBuster should return Promise. \n  If you don't want to change the method signature, set isInstant flag to true.\n";
function throwErrorIfResultIsNotPromise(decoratedMethodResult) {
  if (decoratedMethodResult instanceof Promise === false) {
    throw new Error(NO_PROMISE_ERROR_MESSAGE);
  }
}

// node_modules/ts-cacheable/dist/esm5/promise.cacheable.decorator.js
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = function(thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  }, f, y, t, g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __spreadArray4 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = void 0;
var promiseGlobalCacheBusterNotifier = new Subject();
var getResponse = function(oldMethod, cacheKey, cacheConfig, context, cachePairs, parameters, pendingCachePairs, storageStrategy, promiseImplementation) {
  var cacheParameters = cacheConfig.cacheHasher(parameters);
  var _foundCachePair = cachePairs.find(function(cp) {
    return cacheConfig.cacheResolver(cp.parameters, cacheParameters);
  });
  var _foundPendingCachePair = pendingCachePairs.find(function(cp) {
    return cacheConfig.cacheResolver(cp.parameters, cacheParameters);
  });
  if ((cacheConfig.maxAge || GlobalCacheConfig.maxAge) && _foundCachePair && _foundCachePair.created) {
    if ((/* @__PURE__ */ new Date()).getTime() - new Date(_foundCachePair.created).getTime() > (cacheConfig.maxAge || GlobalCacheConfig.maxAge)) {
      storageStrategy.remove ? storageStrategy.remove(cachePairs.indexOf(_foundCachePair), _foundCachePair, cacheKey, _this) : storageStrategy.removeAtIndex(cachePairs.indexOf(_foundCachePair), cacheKey, _this);
      _foundCachePair = null;
    } else if (cacheConfig.slidingExpiration || GlobalCacheConfig.slidingExpiration) {
      _foundCachePair.created = /* @__PURE__ */ new Date();
      storageStrategy.update ? storageStrategy.update(cachePairs.indexOf(_foundCachePair), _foundCachePair, cacheKey, _this) : storageStrategy.updateAtIndex(cachePairs.indexOf(_foundCachePair), _foundCachePair, cacheKey, _this);
    }
  }
  if (_foundCachePair) {
    return promiseImplementation.resolve(_foundCachePair.response);
  } else if (_foundPendingCachePair) {
    return _foundPendingCachePair.response;
  } else {
    var response$ = oldMethod.call.apply(oldMethod, __spreadArray4([context], parameters, false)).then(function(response) {
      removeCachePair(pendingCachePairs, parameters, cacheConfig);
      if (!cacheConfig.shouldCacheDecider || cacheConfig.shouldCacheDecider(response)) {
        if (!(cacheConfig.maxCacheCount || GlobalCacheConfig.maxCacheCount) || (cacheConfig.maxCacheCount || GlobalCacheConfig.maxCacheCount) === 1 || (cacheConfig.maxCacheCount || GlobalCacheConfig.maxCacheCount) && (cacheConfig.maxCacheCount || GlobalCacheConfig.maxCacheCount) < cachePairs.length + 1) {
          storageStrategy.remove ? storageStrategy.remove(0, cachePairs[0], cacheKey, _this) : storageStrategy.removeAtIndex(0, cacheKey, _this);
        }
        storageStrategy.add({
          parameters: cacheParameters,
          response,
          created: cacheConfig.maxAge || GlobalCacheConfig.maxAge ? /* @__PURE__ */ new Date() : null
        }, cacheKey, _this);
      }
      return response;
    }).catch(function(error) {
      removeCachePair(pendingCachePairs, parameters, cacheConfig);
      return promiseImplementation.reject(error);
    });
    pendingCachePairs.push({
      parameters: cacheParameters,
      response: response$,
      created: /* @__PURE__ */ new Date()
    });
    return response$;
  }
};
var removeCachePair = function(cachePairs, parameters, cacheConfig) {
  var cacheParameters = cacheConfig.cacheHasher(parameters);
  var _pendingCachePairToRemove = cachePairs.find(function(cp) {
    return cacheConfig.cacheResolver(cp.parameters, cacheParameters);
  });
  cachePairs.splice(cachePairs.indexOf(_pendingCachePairToRemove), 1);
};
function PCacheable(cacheConfig) {
  if (cacheConfig === void 0) {
    cacheConfig = {};
  }
  return function(_target, _propertyKey, propertyDescriptor) {
    var _this2 = this;
    var cacheKey = cacheConfig.cacheKey || _target.constructor.name + "#" + _propertyKey;
    var oldMethod = propertyDescriptor.value;
    if (propertyDescriptor && propertyDescriptor.value) {
      var storageStrategy_1 = !cacheConfig.storageStrategy ? new GlobalCacheConfig.storageStrategy() : new cacheConfig.storageStrategy();
      var pendingCachePairs_1 = [];
      if (cacheConfig.cacheModifier) {
        cacheConfig.cacheModifier.subscribe(function(callback) {
          return __awaiter(_this2, void 0, void 0, function() {
            var _a, _b, _c;
            return __generator(this, function(_d) {
              switch (_d.label) {
                case 0:
                  _b = (_a = storageStrategy_1).addMany;
                  _c = callback;
                  return [4, storageStrategy_1.getAll(cacheKey, this)];
                case 1:
                  return [2, _b.apply(_a, [_c.apply(void 0, [_d.sent()]), cacheKey, this])];
              }
            });
          });
        });
      }
      merge(promiseGlobalCacheBusterNotifier.asObservable(), cacheConfig.cacheBusterObserver ? cacheConfig.cacheBusterObserver : empty()).subscribe(function(_) {
        storageStrategy_1.removeAll(cacheKey, _this2);
        pendingCachePairs_1.length = 0;
      });
      var cacheResolver = cacheConfig.cacheResolver || GlobalCacheConfig.cacheResolver;
      cacheConfig.cacheResolver = cacheResolver ? cacheResolver : DEFAULT_CACHE_RESOLVER;
      var cacheHasher = cacheConfig.cacheHasher || GlobalCacheConfig.cacheHasher;
      cacheConfig.cacheHasher = cacheHasher ? cacheHasher : DEFAULT_HASHER;
      propertyDescriptor.value = function() {
        var _this3 = this;
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          parameters[_i] = arguments[_i];
        }
        var promiseImplementation = typeof GlobalCacheConfig.promiseImplementation === "function" && GlobalCacheConfig.promiseImplementation !== Promise ? GlobalCacheConfig.promiseImplementation.call(this) : GlobalCacheConfig.promiseImplementation;
        var cachePairs = storageStrategy_1.getAll(cacheKey, this);
        if (!(cachePairs instanceof promiseImplementation)) {
          cachePairs = promiseImplementation.resolve(cachePairs);
        }
        return cachePairs.then(function(cachePairs2) {
          return getResponse(oldMethod, cacheKey, cacheConfig, _this3, cachePairs2, parameters, pendingCachePairs_1, storageStrategy_1, promiseImplementation);
        });
      };
    }
    return propertyDescriptor;
  };
}
export {
  CacheBuster,
  Cacheable,
  DEFAULT_CACHE_RESOLVER,
  DEFAULT_HASHER,
  DOMStorageStrategy,
  GlobalCacheConfig,
  IAsyncStorageStrategy,
  IStorageStrategy,
  InMemoryStorageStrategy,
  LocalStorageStrategy,
  NO_OBSERVABLE_ERROR_MESSAGE,
  NO_PROMISE_ERROR_MESSAGE,
  PCacheBuster,
  PCacheable,
  bustCache,
  globalCacheBusterNotifier,
  isInstant,
  promiseGlobalCacheBusterNotifier,
  throwErrorIfResultIsNotObservable
};
//# sourceMappingURL=ts-cacheable.js.map
