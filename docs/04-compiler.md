# Compiler

The compiler API is pretty slapdash. It's essentially a wrapper over an array of text which is concatenated at the end with `/` to produce the JSON output.

Most important things to note:

1.  Every node has a `compile()` function that accepts two parameters, the compiler instance (conventionally, `$`) and state, which is discarded after compilation. You may notice that commands and macros are simply function versions of these and take an array of string arguments as parameters instead of requiring you to parse them manually.

2.  The compiler has 4 particularly relevant methods and 3 others of incidental importance.

| Method                                                      | Description                                               |
| :---------------------------------------------------------- | --------------------------------------------------------- |
| `$.write(text: string)`                                     | Append `text` to the end of the current line.             |
| `$.writeLine(text: string)`                                 | End the current line, create a new line with from `text`. |
| `$.getID(): string`                                         | Return a new sequential identifier for the given scope.   |
| `$.getI18nKey(text: string): string`                        | Return a unique i18n key for the given text.              |
| `$.getBuffer(): string[]`                                   | Returns underlying text array.                            |
| `$.addRequirement(key: string, value: string)`              | Add a key-value pair to the list of event requirements.   |
| `$.addScope(type: ScopeType, name: string, cb: () => void)` | Create a new compiler scope with the given type and name. |

## Commands & Macros

You can write custom `commands`, which read and write from state at compile-time, and `macros`, which expand to encompass multiple commands (and also modify state). These have low-level access to the compiler and a primitive event state.

At the implementation level there's no difference between a macro and a command, but using a macro allows you to explicitly indicate that something isn't built-in.

There are a few macros integrated by default:

| Name             | Signature             | Description                                                    |
| :--------------- | :-------------------- | -------------------------------------------------------------- |
| `$positionReset` | `<actor>`             | Reset's an actor's pixel offset to 0, 0.                       |
| `$beginFade`     | `[time] [toContinue]` | Start a global fade, move the camera off-screen.               |
| `$endFade`       |                       | Fade in with prev. params, return camera to original position. |

New ones can be registered in the `y2d.config.{ts,js}` file at the project root. By assigning a `ysls` property with a value adhering to the Yarn Language Server spec, the macro will be added to the project's YSLS config on boot.

If you're relying on values in state, then also define a `getInitialState` property that creates the appropriate default values on the state.

### Example

An example macro to message the user "hello, world" an arbitrary number of times and another macro to set the number of times to message.

```ts
import type { State, Compiler } from 'yarn2dew';

export const setHelloCount = Object.assign(
  ($: Compiler, state: State, count: string) => {
    state.helloCount = +count;
  },
  {
    ysls: {
      YarnName: '$setHelloCount',
      Documentation: 'number of times to message "hello, world!"',
      Parameters: [{ Name: 'Count', Type: 'number' }]
    }
  }
);

export const hello = Object.assign(
  ($: Compiler, state: State, text: string = 'Hello, world!') => {
    for (let i = 0; i < state.helloCount; i++) {
      $.writeLine(`message "${text}"`);
    }
  },
  {
    getInitialState: (state: State) => ({ ...state, helloCount: 1 }),
    ysls: {
      YarnName: '$hello',
      Documentation: 'Display a message reading "Hello, world!"',
      Parameters: [
        {
          Name: 'Text',
          Type: 'string',
          Documentation: 'Text to print',
          DefaultValue: 'Hello, world!'
        }
      ]
    }
  }
);
```

And then in `y2d.config.ts`...

```ts
import { hello, setHelloCount } from './macros';

declare module 'yarn2dew' {
  interface State {
    helloCount: number;
  }
}

export default {
  // ...
  macros: { hello, setHelloCount }
};
```
