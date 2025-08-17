# Tooling

There's a very basic implementation of a watching content patcher. It ~~probably~~ will maul existing `content.json` files, so you'll want to keep those in Git just in case.

```sh
bun run dist    # creates an executable
./yarn2dew      # recursively watches for `yarn` file changes,
                # then updates ./i18n/default.json and ./content.json
```

## Config

Create a `y2d.config.ts` file in your project's working directory.

```ts
declare module 'yarn2dew' {
  interface State {
    // put state for custom macros and commands here
  }
}

export default {
  namespace: 'MyMod',
  directory: '/foo/bar/baz',
  macros: {},
  commands: {}
};
```
