# react-beep

New way for state management without connect component

[![NPM](https://nodei.co/npm/react-beep.png)](https://nodei.co/npm/react-beep/)

[![install size](https://packagephobia.now.sh/badge?p=react-beep)](https://packagephobia.now.sh/result?p=react-beep) [![dependencies](https://david-dm.org/uxitten/react-beep.svg)](https://david-dm.org/uxitten/react-beep.svg)

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
import { initial } from "react-beep";

initial([
  {
    name: "time",
    defaultValue: 2018
  }
]);
```

## Connect to components

```javascript
import React from "react";
import { state, Beep } from "react-beep";

class DisplayTime extends Beep(["time"]) {
  render() {
    return <div>{state.time}</div>;
  }
}
```

## Change state

```javascript
import { state } from "react-beep";

state.time = 2019;
```
