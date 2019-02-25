import { Component } from "react";
import * as jetstate from "jetstate";
import * as jetemit from "jetemit";

export const initial = fields => 
  fields.forEach(field =>
    jetstate.init({ 
      ...field, 
      didUpdate: value => {
        jetemit.emit(field.name, value);
        field.didUpdate && field.didUpdate(value);
      }
    })
  );

export const Beep = fields => {
  return class extends Component {
    constructor(props) {
      super(props);
      fields.forEach(field => jetemit.on(field, () => this.forceUpdate()));
    }
  };
};

export const on = jetemit.on;

export const emit = jetemit.emit; 

export const init = jetstate.init;

export const state = jetstate.state;
