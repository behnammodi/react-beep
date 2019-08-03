# react-beep

New way for state management without connect component

[![NPM](https://nodei.co/npm/react-beep.png)](https://nodei.co/npm/react-beep/)

[![dependencies](https://david-dm.org/uxitten/react-beep.svg)](https://david-dm.org/uxitten/react-beep.svg)

<a href="https://www.npmjs.com/package/react-beep">
  <img src="https://img.shields.io/npm/v/react-beep.svg" alt="Version">
</a>

<a href="https://www.npmjs.com/package/react-beep">
  <img src="https://img.shields.io/npm/l/react-beep.svg" alt="License">
</a>

<a href="https://www.npmjs.com/package/react-beep">
  <img src="https://img.shields.io/npm/dm/react-beep.svg" alt="Downloads">
</a>

# install

```npm
npm install react-beep
```

# use

## Initial state

```javascript
import { initial } from 'react-beep';

initial([
  {
    name: 'time',
    defaultValue: 2018
  }
]);
```

## Connect to components

```javascript
import React, { PureComponent } from 'react';
import { state, Beep } from 'react-beep';

class DisplayTime extends Beep(['time'], PureComponent) {
  render() {
    return <div>{state.time}</div>;
  }
}
```

## Change state

```javascript
import { state } from 'react-beep';

state.time = 2019;
```

## Advance

```javascript
import { initial } from 'react-beep';

initial([
  {
    name: 'time',
    defaultValue: 2018,
    shouldUpdate: (prevValue, nextValue) => nextValue > prevValue,
    willUpdate: (prevValue, nextValue) => console.log(prevValue, nextValue),
    didUpdate: value => console.log(value)
  }
]);
```

## API

### Listen to the changes

```javascript
import { on } from 'react-beep';

on('time', value => {
  console.log('change time:', value);
});
```

### Init single state

```javascript
import { init } from 'react-beep';

init({
  name: 'time',
  defaultValue: 2018
});
```

### Other way for change state

if `time` is not inited, emit just send message to the listener

```javascript
import { emit } from 'react-beep';

emit('time', 2020);
```

## Migration from v1 to v2

You should pass `React.PureComponent` or `React.Component` as second argument.

```diff
- class DisplayTime extends Beep(['time']) {
+ class DisplayTime extends Beep(['time'], PureComponent)
```
