"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.init = exports.emit = exports.on = exports.Beep = exports.initial = void 0;

var jetstate = _interopRequireWildcard(require("jetstate"));

var jetemit = _interopRequireWildcard(require("jetemit"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * @param {Object} field
 * @param {string} field.name
 * @param {*} field.defaultValue
 * @param {function} field.shouldUpdate
 * @param {function} field.willUpdate
 * @param {function} field.didUpdate
 * @returns {undefined}
 */
function $init(field) {
  jetstate.init(_objectSpread(_objectSpread({}, field), {}, {
    didUpdate: value => {
      jetemit.emit(field.name, value);
      field.didUpdate && field.didUpdate(value);
    }
  }));
}
/**
 *
 * @param {string} name
 * @param {*} value
 */


function $emit(name, value) {
  if (jetstate.state[name]) jetstate.state[name] = value;else jetemit.emit(name, value);
}
/**
 *
 * @param {Object[]} fields
 * @param {string} fields[].name
 * @param {*} fields[].defaultValue
 * @param {function} fields[].shouldUpdate
 * @param {function} fields[].willUpdate
 * @param {function} fields[].didUpdate
 * @returns {undefined}
 */


const initial = fields => fields.forEach(field => $init(field));
/**
 *
 * @param {array} fields array of lisining state name
 * @param {React.Component|React.PureComponent} component for extends
 * @returns {React.Component|React.PureComponent}
 */


exports.initial = initial;

const Beep = (fields, component) => {
  return class extends component {
    constructor(props) {
      super(props);
      this.__UNSUBSCRIBES = [];
      fields.forEach(field => {
        const unsubscribe = jetemit.on(field, () => {
          this.forceUpdate();
        });

        this.__UNSUBSCRIBES.push(unsubscribe);
      });
    }

    componentWillUnmount() {
      this.__UNSUBSCRIBES.forEach(unsubscribe => unsubscribe());

      this.__UNSUBSCRIBES = [];
    }

  };
};

exports.Beep = Beep;
const on = jetemit.on;
exports.on = on;
const emit = $emit;
exports.emit = emit;
const init = $init;
exports.init = init;
const state = jetstate.state;
exports.state = state;