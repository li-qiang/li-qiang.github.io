---
layout: post
title:  Object.defineProperty
date:   2016-06-06 14:40:00
categories: node
---

### Object.defineProperty

```javascript
Object.defineProperty(obj, prop, descriptor)
```

- Params

  - `(Object) obj`: the object which need a property.

  - `(string) prop`: the property name.

  - `(Object) descriptor`:

    - `(Any) value`: property value, default is `undefined`

    - `(Boolean) writable`: if false, can't set the property. Default is false

    - `(Function) get`: call when get the property value

    - `(Function) set`: call when set the property value

    - `(Boolean) configurable`: if false, any action to delete or edit (writable, configurable, enumerable) will be ignored. Default is false

    - `(Boolean) enumerable`: if true, can get the property name when `for...in` and `Object.keys`. Default is false

    - **In descriptor, we can't set (_get_ and _set_) with value or writable, otherwise it will throw an error.**

### Usage

- Define property

  ```javascript

  var bayMax = {};

  Object.defineProperty(bayMax, 'sayHello', {
    value: (name) => console.log(`Hello, ${name}. I am bayMax.`)
  });

  bayMax.sayHello('Lee'); #=>  Hello, Lee. I am bayMax.
  ```

- Define no-writable property

  ```javascript

  var bayMax = {};

  Object.defineProperty(bayMax, 'sayHello', {
    value: (name) => console.log(`Hello, ${name}. I am bayMax.`),
    writable: false
  });

  bayMax.sayHello = (name) => console.log('BayMax is superman.');

  bayMax.sayHello('Lee'); #=>  Hello, Lee. I am bayMax.

  /* It is useless, but not throw any error when set a no-writable property. */
  ```

- Define a no-configurable property

  ```javascript
  var bayMax = {};

  Object.defineProperty(bayMax, 'sayHello', {
    value: (name) => console.log(`Hello, ${name}. I am bayMax.`),
    configurable: false
  });

  delete bayMax.sayHello;

  bayMax.sayHello('Lee'); #=>  Hello, Lee. I am bayMax.

  /* It is useless when delete a no-configurable property. */
  ```
- Define a property with enumerable

  ```javascript
  var bayMax = {};

  Object.defineProperty(bayMax, 'sayHello', {
    value: (name) => console.log(`Hello, ${name}. I am bayMax.`),
    enumerable: true
  });

  Object.defineProperty(bayMax, 'sayBye', {
    value: (name) => console.log(`Hello, ${name}. GoodBye.`),
    enumerable: false
  });

  console.log(Object.keys(bayMax)) #=> [ 'sayHello' ]

  /* It show the enumerable function when get Object.keys. */
  ```

- Define a property with getter and setter

  ```javascript
  var bayMax = {};

  Object.defineProperty(bayMax, 'size', {
    get() {
      console.log('My size is max');
      return 'Max';
    },
    set(size) {
      console.log(`Set size as ${size}`);
    }
  });

  bayMax.size
  #=> My size is max
  #=> Max

  bayMax.size = 'Big' #=> Set size as Big
  ```
