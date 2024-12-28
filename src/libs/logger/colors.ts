/** Append RESET_COLOR to restore stdout colors */
export const RESET_COLOR = '\u001b[0m';

/** Enumeration of commonly used terminal foreground colors */
export enum TerminalTextColor {
    BLACK = '\u001b[30m',
    RED = '\u001b[31m',
    GREEN = '\u001b[32m',
    YELLOW = '\u001b[33m',
    BLUE = '\u001b[34m',
    MAGENTA = '\u001b[35m',
    CYAN = '\u001b[36m',
    WHITE = '\u001b[37m',
    BRIGHT_BLACK = '\u001b[90m',
    BRIGHT_RED = '\u001b[91m',
    BRIGHT_GREEN = '\u001b[92m',
    BRIGHT_YELLOW = '\u001b[93m',
    BRIGHT_BLUE = '\u001b[94m',
    BRIGHT_MAGENTA = '\u001b[95m',
    BRIGHT_CYAN = '\u001b[96m',
    BRIGHT_WHITE = '\u001b[97m',
}

export enum TerminalBackgroundColor {
    BG_BLACK = '\u001b[40m',
    BG_RED = '\u001b[41m',
    BG_GREEN = '\u001b[42m',
    BG_YELLOW = '\u001b[43m',
    BG_BLUE = '\u001b[44m',
    BG_MAGENTA = '\u001b[45m',
    BG_CYAN = '\u001b[46m',
    BG_WHITE = '\u001b[47m',
    BG_BRIGHT_BLACK = '\u001b[100m',
    BG_BRIGHT_RED = '\u001b[101m',
    BG_BRIGHT_GREEN = '\u001b[102m',
    BG_BRIGHT_YELLOW = '\u001b[103m',
    BG_BRIGHT_BLUE = '\u001b[104m',
    BG_BRIGHT_MAGENTA = '\u001b[105m',
    BG_BRIGHT_CYAN = '\u001b[106m',
    BG_BRIGHT_WHITE = '\u001b[107m',
}

/**
 * colorizeText takes a string and appends a color tag to it to
 * return a colored version of it.
 */
export function colorizeText(text: string, color: TerminalTextColor): string {
    return `${color}${text}${RESET_COLOR}`;
}

export type Spacing = {
    padding?: {
        l?: number;
        r?: number;
    };
    margin?: {
        l?: number;
        r?: number;
    };
};

/** DEFAULT_SPACING is no margins or padding */
export const DEFAULT_SPACING: Spacing = {
    padding: { l: 0, r: 0 },
    margin: { l: 0, r: 0 },
};

/**
 * colorizeBg takes a background color and optional padding and
 * margin values, and returns colored block of text.
 */
export function colorizeBg(
    text: string,
    bgColor: TerminalBackgroundColor,
    spacing: Spacing = {
        padding: { l: 0, r: 0 },
        margin: { l: 0, r: 0 },
    },
): string {
    const rightPad = ' '.repeat(spacing.padding?.r ?? 0);
    const leftPad = ' '.repeat(spacing.padding?.l ?? 0);
    const rightMargin = ' '.repeat(spacing.margin?.r ?? 0);
    const leftMargin = ' '.repeat(spacing.margin?.l ?? 0);
    const paddedText = `${leftPad}${text}${rightPad}`;

    return `${leftMargin}${bgColor}${paddedText}${RESET_COLOR}${rightMargin}`;
}

/**
 * formatTextWithColorsAndPadding takes a text & background color with optional
 * spacing and formats it for stdout.
 */
export function formatTextWithColorsAndPadding(
    text: string,
    bgColor: TerminalBackgroundColor,
    fgColor: TerminalTextColor,
    spacing: Spacing = DEFAULT_SPACING,
): string {
    const rightPad = ' '.repeat(spacing.padding?.r ?? 0);
    const leftPad = ' '.repeat(spacing.padding?.l ?? 0);

    const paddedText = `${bgColor}${leftPad}${text}${rightPad}`;

    const rightMargin = ' '.repeat(spacing.margin?.r ?? 0);
    const leftMargin = ' '.repeat(spacing.margin?.l ?? 0);

    return `${leftMargin}${fgColor}${paddedText}${RESET_COLOR}${rightMargin}`;
}

// deno run src/libs/logger/colors.ts
function example() {
    console.log(colorizeText('This is red text', TerminalTextColor.RED));
    console.log(
        colorizeText('This is (bright) cyan text', TerminalTextColor.BRIGHT_CYAN),
    );
    console.log(
        colorizeBg('Padded Text', TerminalBackgroundColor.BG_GREEN, {
            padding: {
                l: 2,
                r: 5,
            },
        }),
    );
    console.log(
        colorizeBg('Warning', TerminalBackgroundColor.BG_YELLOW, {
            padding: {
                l: 4,
                r: 4,
            },
        }),
    );

    console.log(
        formatTextWithColorsAndPadding(
            'Stylized Text',
            TerminalBackgroundColor.BG_BRIGHT_BLUE,
            TerminalTextColor.WHITE,
            {
                padding: {
                    l: 4,
                    r: 4,
                },
            },
        ),
    );

    console.log(
        formatTextWithColorsAndPadding(
            'Error',
            TerminalBackgroundColor.BG_BRIGHT_WHITE,
            TerminalTextColor.BRIGHT_RED,
            {
                padding: {
                    l: 5,
                    r: 5,
                },
            },
        ),
    );
}

if (import.meta.main) {
    example();
}
