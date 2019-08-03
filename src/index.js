import * as jetstate from 'jetstate';
import * as jetemit from 'jetemit';

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
  jetstate.init({
    ...field,
    didUpdate: value => {
      jetemit.emit(field.name, value);
      field.didUpdate && field.didUpdate(value);
    }
  });
}

/**
 *
 * @param {string} name
 * @param {*} value
 */
function $emit(name, value) {
  if (jetstate.state[name]) jetstate.state[name] = value;
  else jetemit.emit(name, value);
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
export const initial = fields => fields.forEach(field => $init(field));

/**
 *
 * @param {array} fields array of lisining state name
 * @param {React.Component|React.PureComponent} component for extends
 * @returns {React.Component|React.PureComponent}
 */
export const Beep = (fields, component) => {
  return class extends component {
    constructor(props) {
      super(props);
      fields.forEach(field => jetemit.on(field, () => this.forceUpdate()));
    }
  };
};

export const on = jetemit.on;

export const emit = $emit;

export const init = $init;

export const state = jetstate.state;
