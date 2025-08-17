# Compiler

The compiler API is a lil' slapdash. It's essentially a wrapper over an array of text which is concatenated at the end with `/` to produce the JSON output.

Most important things to note:

1.  Every node has a `compile()` function that accepts two parameters, the compiler instance (conventionally, `$`) and state, which is discarded after compilation.
2.  Commands and macros are simply function versions of these, taking an array of string arguments as parameters instead of requiring you to futz with the AST.
3.  The compiler has 4 commonly-used public methods and 3 others of incidental importance.

| Method                                                      | Description                                               |
| :---------------------------------------------------------- | --------------------------------------------------------- |
| `$.write(text: string)`                                     | Append `text` to the end of the current line.             |
| `$.writeLine(text: string)`                                 | End the current line, create a new line with from `text`. |
| `$.getID(): string`                                         | Return a new sequential identifier for the given scope.   |
| `$.getI18nKey(text: string): string`                        | Return a unique i18n key for the given text.              |
| `$.getBuffer(): string[]`                                   | Returns underlying text array.                            |
| `$.addRequirement(key: string, value: string)`              | Add a key-value pair to the list of event requirements.   |
| `$.addScope(type: ScopeType, name: string, cb: () => void)` | Create a new compiler scope with the given type and name. |

## Macros & Commands

You can write both **Commands** and **Macros**. While the underlying implementation is identical, there's a meaningful semantic distinction between the two.

Long story short: if emitting it verbatim will cause an error at runtime, use a Macro. Long story long:

- **Commands** (capital C) correspond 1:1 to the lowercase-c commands in the [SDV event format](https://stardewvalleywiki.com/Modding:Event_data#Event_scripts). These may _modify_ the compiler state (e.g., `faceDirection` updates a character's position in the scene), but should never _derive_ any behavior from it. If a command is invoked but not given a specific code implementation, the underlying SDV command will be emitted verbatim.

- **Macros** can write to and read from the state, and can emit any number of (lowercase-c) commands. If a Macro is invoked but not defined in code, the compiler _will throw an error_.

| Type    | Read State | Write State | 1:1 SDV | compile-time 💥 | runtime 💥 |
| :------ | :--------: | :---------: | :-----: | :-------------: | :--------: |
| Command |     ✗      |      ✓      |    ✓    |        ✗        |     ✓      |
| Macro   |     ✓      |      ✓      |    ✗    |        ✓        |     ✗      |

There are a few macros implemented by default:

| Name           | Signature                      | Description                                                    |
| :------------- | :----------------------------- | -------------------------------------------------------------- |
| `$offsetReset` | `<actor>`                      | Reset's an actor's pixel offset to 0, 0.                       |
| `$beginFade`   | `[time] [continue]`            | Start a global fade, move the camera off-screen.               |
| `$endFade`     |                                | Fade in with prev. params, return camera to original position. |
| `$face`        | `<actor1> <actor2> [continue]` | Make actor 1 change direction to face actor 2.                 |

New ones can be registered in `y2d.config.ts`. By assigning a `ysls` property with a value adhering to the Yarn Language Server spec, the macro will be added to the project's YSLS config on boot.

If you're relying on values in state, then also define a `getInitialState` property that creates the appropriate default values on the state.

### Example

An example macro to message the user "hello, world" an arbitrary number of times and another to set the number of times to message.

```ts
import type { State, Compiler } from 'yarn2dew';

const setHelloFn = ($: Compiler, state: State, count: string) => {
  state.helloCount = +count;
};

const setHelloYSLS = {
  Documentation: 'number of times to message "hello, world!"',
  Parameters: [{ Name: 'Count', Type: 'number' }]
};

const sayHelloFn = ($: Compiler, state: State, text: string = 'Hello, world!') => {
  const count = state.helloCount ?? 1;
  for (let i = 0; i < count; i++) {
    $.writeLine(`message "${text}"`);
  }
};

const sayHelloYSLS = {
  Documentation: 'Display a message reading "Hello, world!"',
  Parameters: [
    {
      Name: 'Text',
      Type: 'string',
      Documentation: 'Text to print',
      DefaultValue: 'Hello, world!'
    }
  ]
};

const getInitialState = (state: State) => ({ ...state, helloCount: 1 });

const sayHello = Object.assign(sayHelloFn, { ysls: sayHelloYSLS });
const setHello = Object.assign(setHelloFn, { ysls: setHelloYSLS, getInitialState });

export { sayHello, setHello };
```

In `y2d.config.ts`...

```ts
import * as macros from './macros';

declare module 'yarn2dew' {
  interface State {
    helloCount: number;
  }
}

export default {
  // ...
  macros
};
```

And then in yarn...

```yarn
<<$setHello 3>>
<<$sayHello>>
```
