import {
  __commonJS
} from "./chunk-3OV72XIM.js";

// node_modules/ts-password-generator/dist/lib/index.js
var require_lib = __commonJS({
  "node_modules/ts-password-generator/dist/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.generator = void 0;
    var lowToHigh = (low, high) => {
      const array = [];
      for (let i = low; i <= high; i++) {
        array.push(i);
      }
      return array;
    };
    var lowercaseCharactersCode = lowToHigh(97, 122);
    var uppercaseCharactersCode = lowToHigh(65, 90);
    var numberCharactersCode = lowToHigh(48, 57);
    var symbolsCharactersCode = lowToHigh(33, 47).concat(lowToHigh(58, 64)).concat(lowToHigh(123, 126)).concat(lowToHigh(91, 96));
    var generator = ({
      charsQty = 10,
      isUppercase = false,
      haveString = true,
      haveNumbers = false,
      haveSymbols = false
    } = {
      charsQty: 10,
      isUppercase: false,
      haveString: true,
      haveNumbers: false,
      haveSymbols: false
    }) => {
      let charactersCode = [];
      if (haveString) charactersCode = charactersCode.concat(lowercaseCharactersCode);
      if (isUppercase) charactersCode = charactersCode.concat(uppercaseCharactersCode);
      if (haveNumbers) charactersCode = charactersCode.concat(numberCharactersCode);
      if (haveSymbols) charactersCode = charactersCode.concat(symbolsCharactersCode);
      const password = [];
      if (charactersCode.length === 0) {
        return "";
      }
      for (let i = 0; i < charsQty; i++) {
        const char = Math.floor(Math.random() * charactersCode.length);
        password.push(String.fromCharCode(charactersCode[char]));
      }
      return password.join("");
    };
    exports.generator = generator;
  }
});

// node_modules/ts-password-generator/dist/index.js
var require_dist = __commonJS({
  "node_modules/ts-password-generator/dist/index.js"(exports) {
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
          return m[k];
        }
      });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __exportStar(require_lib(), exports);
  }
});
export default require_dist();
//# sourceMappingURL=ts-password-generator.js.map
