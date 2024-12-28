# CLI

CLI is a small framework for building CLI applications built upon Deno 2's
new standard library, inspired by similar libraries in the Golang ecosystem.

## Installation

```bash
deno add jsr:@desertthunder/cli
```

## Examples

### Logger

```typescript
function example() {
  const logger = createLogger("example-logger");

  logger.info("Example");
}

if (import.meta.main) {
  example();
}
```

### Colors

```typescript
console.log(colorizeText("This is red text", TerminalTextColor.RED));

```

## Runtime Compatibility

| Runtime | Version | Works | Notes |
| ------- | ------- | ----- | ----- |
| Deno    | 2.1.4   | ✅    |       |

## Inspiration

Charm's [log](https://github.com/charmbracelet/log) library

Urfave's [cli](https://github.com/urfave/cli) V2 & V3

## License

Copyright 2024 Owais J (mailto:desertthunder.dev@gmail.com)

SPDX-License-Identifier: [CC BY-NC-ND](/LICENSE)
