/**
 * @module
 *
 * Module logger contains helper logging methods for handling
 * handling output streams.
 */

import * as log from 'jsr:@std/log@0.224.12';
import { formatDate } from '$datetime';

export type Options = {
    colors: boolean;
    level?: log.LevelName;
    file: log.FileHandler | log.RotatingFileHandler | null;
    stdout: boolean;
    formatter: log.FormatterFunction;
};

export type HandlerConfig = {
    file?: log.FileHandler;
    console?: log.ConsoleHandler;
};

export const DEFAULT_LOGGER_CONFIG: Options = {
    colors: true,
    level: 'INFO',
    file: null,
    stdout: true,
    formatter: function defaultFormatter(record: log.LogRecord) {
        const date = formatDate(record.datetime);
        const level = record.levelName.slice(0, 4);
        return `[${level}] [${date}] ${record.msg}`;
    } satisfies log.FormatterFunction,
};

function formatterFn(mod: string, fn: log.FormatterFunction) {
    return (record: log.LogRecord) => `[${mod}] ${fn(record)}`;
}

/**
 * @description creates a logger instance from a provided module name
 * @todo allow for the creation and injection of a custom formatter
 * @todo rotatable logger
 * @todo config timestamp
 */
export function createLogger(
    mod: string,
    opts: Options = DEFAULT_LOGGER_CONFIG,
): log.Logger {
    const level: log.LevelName = opts.level ?? 'INFO';

    const handlers: HandlerConfig = {
        file: opts.file
            ? new log.FileHandler(level, {
                filename: `${mod}.log`,
            })
            : undefined,
        console: new log.ConsoleHandler(level, {
            useColors: opts.colors,
            formatter: formatterFn(mod, opts.formatter),
        }),
    };

    if (!handlers.file) {
        delete handlers.file;
    }

    if (!opts.stdout) {
        delete handlers.console;
    }

    const logConfig: log.LogConfig = {
        handlers,
        loggers: {
            [mod]: {
                level,
                handlers: Object.keys(handlers),
            },
        },
    };

    log.setup(logConfig);

    return log.getLogger(mod);
}

// deno run src/libs/logger/logger.ts
function example() {
    const logger = createLogger('example-logger');

    logger.info('Example');
}

if (import.meta.main) {
    example();
}
