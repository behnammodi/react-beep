"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.init = exports.emit = exports.on = exports.Beep = exports.initial = void 0;

var jetstate = _interopRequireWildcard(require("jetstate"));

var jetemit = _interopRequireWildcard(require("jetemit"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  jetstate.init(_objectSpread({}, field, {
    didUpdate: function didUpdate(value) {
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


var initial = function initial(fields) {
  return fields.forEach(function (field) {
    return $init(field);
  });
};
/**
 *
 * @param {array} fields array of lisining state name
 * @param {React.Component|React.PureComponent} component for extends
 * @returns {React.Component|React.PureComponent}
 */


exports.initial = initial;

var Beep = function Beep(fields, component) {
  return (
    /*#__PURE__*/
    function (_component) {
      _inherits(_class, _component);

      function _class(props) {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
        _this.__UNSUBSCRIBES = [];
        fields.forEach(function (field) {
          var unsubscribe = jetemit.on(field, function () {
            _this.forceUpdate();
          });

          _this.__UNSUBSCRIBES.push(unsubscribe);
        });
        return _this;
      }

      _createClass(_class, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.__UNSUBSCRIBES.forEach(function (unsubscribe) {
            return unsubscribe();
          });

          this.__UNSUBSCRIBES = [];
        }
      }]);

      return _class;
    }(component)
  );
};

exports.Beep = Beep;
var on = jetemit.on;
exports.on = on;
var emit = $emit;
exports.emit = emit;
var init = $init;
exports.init = init;
var state = jetstate.state;
exports.state = state;