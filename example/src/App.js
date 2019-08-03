import React from 'react';
import { initial, init, Beep, state, on, emit } from './react-beep';

initial([
  {
    name: 'counter',
    defaultValue: 0
  }
]);

// init({
//   name: 'counter',
//   defaultValue: 0
// });

on('counter', value => {
  console.log('On counter', value);
});

on('log', value => {
  console.log('On log', value);
});

class ManualIncreaserCounter extends Beep([], React.Component) {
  render() {
    console.log('Render ManualIncreaserCounter', state.counter);
    return (
      <div>
        <button onClick={() => (state.counter = state.counter + 1)}>+</button>
        <button onClick={() => (state.counter = state.counter - 1)}>-</button>
        <button onClick={() => (state.counter = 0)}>Reset</button>
      </div>
    );
  }
}

class AuotIncreaserCounter extends Beep(['counter'], React.Component) {
  constructor() {
    super();
    this.intervalId = setInterval(() => {
      if (state.counter < 5) state.counter = state.counter + 1;
      else clearInterval(this.intervalId);
    }, 500);
  }
  render() {
    console.log('Render AuotIncreaserCounter', state.counter);
    return <div>Counter AuotIncreaser: {state.counter}</div>;
  }
}

class DisplayCounterA extends Beep(['counter'], React.Component) {
  render() {
    console.log('Render DisplayCounterA', state.counter);
    return <div>Counter A: {state.counter}</div>;
  }
}

class DisplayCounterB extends Beep(['counter'], React.PureComponent) {
  render() {
    console.log('Render DisplayCounterB', state.counter);
    return <div>Counter B: {state.counter}</div>;
  }
}

class DisplayCounterC extends Beep([], React.PureComponent) {
  render() {
    console.log('Render DisplayCounterC', state.counter);
    return (
      <div>
        Counter C: {state.counter}
        <button onClick={() => this.forceUpdate()}>Get counter</button>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <DisplayCounterA />
      <DisplayCounterB />
      <DisplayCounterC />
      <AuotIncreaserCounter />
      <ManualIncreaserCounter />
      <button
        onClick={() => {
          emit('counter', 0);
          emit('log', new Date().getTime());
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
