# timer-x

> A promise-based timer.

## TOC

- [Introduction](#introduction)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Example](#example)
- [Links](#links)

## Introduction

`timer-x` is a promise-based timer lib which provides some utils for time management.

## Usage

### npm

1. Use npm to install it as a dependency:

    ```bash
    npm install timer-x
    ```

2. Import the exports of this lib:

    ```js
    import { /* ... */ } from "timer-x";
    // or
    const { /* ... */ } = require("timer-x");
    ```

3. Use them in your code.

### CDN

1. Include one of the following script tags in your HTML file:

    via jsdelivr:

    ```html
    <script type="text/javascript" crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/timer-x@latest/dist/timer-x.umd.min.js"></script>
    ```

    or via unpkg:

    ```html
    <script type="text/javascript" crossorigin="anonymous" src="https://unpkg.com/timer-x@latest/dist/timer-x.umd.min.js"></script>
    ```

2. Access the APIs via the `TX` global.

    ```js
    const { /* ... */ } = TX;
    ```

If you want a specified version, just replace `latest` with that in the url. By the way, it is recommended to use a specified version in production.

For more information about these two CDN sites, visit [www.jsdelivr.com](https://www.jsdelivr.com) and [unpkg.com](https://unpkg.com).

## API Reference

```ts
/**
 * @desc The class for timers.
 */
class Timer {

    /**
     * @desc Register a delayed task (using `setTimeout` internally)
     * @returns a promise resolved after specific timeout with the given data
     */
    waitTimeout<T = unknown>(timeout: number, data?: T): Promise<T>;

    /**
     * @desc Register an animation-frame task (using `requestAnimationFrame` internally)
     * @returns a promise resolved at next animation frame with the given data
     */
    waitAnimationFrame<T = unknown>(data?: T): Promise<T>;

    /**
     * @desc Remove the tasks (their promises will be rejected with the given reason)
     */
    abort(reason?: unknown): void;

    /**
     * @desc Flush the tasks (their promises will be resolved immediately)
     */
    flush(): void;

    /**
     * @desc Pause the tasks (their timing will be paused)
     */
    pause(): void;

    /**
     * @desc Resume paused tasks (their timing will be continued)
     */
    resume(): void;

    /**
     * @desc Reset the timing of the tasks
     */
    reset(): void;

}

/**
 * @desc Similar to `timer.waitTimeout` but simplified
 */
function waitTimeout<T = unknown>(timeout: number, data?: T): Promise<T>;

/**
 * @desc Similar to `timer.waitAnimationFrame` but simplified
 */
function waitAnimationFrame<T = unknown>(data?: T): Promise<T>;
```

## Example

```js
TX.waitAnimationFrame()
    .then(() => {
        // ...
    })
    .then(TX.waitTimeout(1000))
    .then(() => {
        // ...
        return TX.waitTimeout(500, data);
    })
    .then(data => {
        // ...
    });

const timer = new TX.Timer();

timer.waitTimeout(5000)
    .then(() => {
        // ...
    })
    .catch(error => {
        console.error(error);
    });

function handleClick(id, listener) {
    document.getElementById(id)
        .addEventListener('click', listener);
}

handleClick('pause', () => timer.pause());
handleClick('resume', () => timer.resume());
handleClick('reset', () => timer.reset());
handleClick('flush', () => timer.flush());
handleClick('abort', () => timer.abort('ABORT'));
```

## Links

- [Contributing Guide](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)
- [License (MIT)](./LICENSE)
