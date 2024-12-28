import { parseArgs } from 'jsr:@std/cli@1.0.9';
import { repeatChar } from '$utils';
import { Flag } from './flags.ts';

/** CommandMeta defines commonly used metadata attributes */
export type CommandMeta = {
    name: string;
    usage: string;
    usageText?: string;
    authors?: string[];
    copyright?: string;
    version?: string;
    description?: string;
};

/** The function that runs when the command executes */
export type CommandAction = (args?: Record<string, any>) => void;

/**
 * createSubCommandMap is a helper function that maps command
 * names to actions.
 */
export function createSubCommandMap(cmds: Command[]): Map<string, Command> {
    const m = new Map<string, Command>();

    for (const cmd of cmds) {
        m.set(cmd.metadata.name, cmd);
    }

    return m;
}

/**
 * Command encapsulates common cli command attributes and defines
 * the public interface of a command.
 */
export class Command {
    private map: Map<string, Command>;

    constructor(
        public metadata: CommandMeta,
        public action: CommandAction,
        public flags: Flag[] = [],
        public aliases: string[] = [],
        public commands: Command[] = [],
        public isRoot: boolean = false,
    ) {
        if (!this.metadata.copyright) {
            this.metadata.copyright = this.defaultCopyright();
        }

        this.map = createSubCommandMap(this.commands);
    }

    private defaultCopyright(year?: number): string {
        let copy: string = `&copy ${year}`;

        if (!year) {
            copy = `&copy ${new Date().getFullYear()}`;
        }

        if (this.metadata.authors) {
            copy += ' ';
            copy += this.metadata.authors.join(', ');
        }

        return copy;
    }

    /**
     * Given a list of subcommands, we want to created a formatted
     * help line of the format __{command name}__{help text}. This
     * takes the longest named command, and makes sure that each
     * command name takes up the same horizontal space.
     */
    get formattedCommandText(): string {
        const cmds = this.commands;

        const lines: string[] = [];

        const maxLength = Math.max(...cmds.map((cmd) => cmd.metadata.name.length));

        for (const cmd of cmds) {
            let nameTag = '  ' + cmd.metadata.name;

            const diff = maxLength - cmd.metadata.name.length;

            nameTag += repeatChar(' ', diff + 1);

            const line: string = nameTag + ' ' +
                (cmd.metadata.usageText ? cmd.metadata.usageText : cmd.metadata.usage);

            lines.push(line);
        }

        return lines.join('\n');
    }

    /**
     * Formats the usage text for each flag
     */
    get formattedFlagText(): string {
        const flags = this.flags;
        const lines: string[] = [];

        const maxLength = Math.max(...flags.map((flg) => flg.name.length));
        const maxFlagLength = Math.max(...flags.map((flg) => flg.type.length));

        for (const flag of flags) {
            let nameTag = '  --' + flag.name;

            if (nameTag.length < maxLength) {
                const diff = maxLength - flag.name.length;
                const buff = repeatChar(' ', diff);
                nameTag += `${buff}  ${flag.fmtType(maxFlagLength)}`;
            }

            const line: string = nameTag + flag.usageText;

            lines.push(line);
        }

        return lines.join('\n');
    }

    /** First line of help output. Can be overriden for custom formatting. */
    get usageLine(): string {
        return `Usage: deno run ${this.metadata.name} <command> [options]`;
    }

    /** Formats version & application name */
    get extras(): string {
        let line = '';

        if (this.metadata.version) {
            line += `${this.metadata.version}`;
        }

        if (this.metadata.description && line.length > 0) {
            line += `  -  ${this.metadata.description}`;
        } else if (this.metadata.description) {
            line += `${this.metadata.description}`;
        }

        return line;
    }

    get help(): string {
        if (!this.isRoot) {
            return '';
        }

        let text = this.usageLine;

        const commandLines = this.formattedCommandText;
        const optionLines = this.formattedFlagText;
        const extras = this.extras;

        if (extras.length > 0) {
            const spacer = repeatChar(' ', 'Usage: '.length);
            text += `\n
${spacer}${this.extras}`;
        }

        if (commandLines.length > 0) {
            text += `\n\nCommands:
${commandLines}
`;
        }

        if (optionLines.length > 0) {
            text += `\n\nFlags:
${optionLines}
`;
        }

        return text;
    }

    private print(text: string) {
        console.log(text);
    }

    /** printHelp prints the help text to the stdout stream */
    private printHelp(): void {
        this.print(this.help);
    }

    /** run executes the root command using parsed arguments */
    public run(args: string[]): void {
        const parsed = parseArgs(args, {
            boolean: ['help'],
            string: ['name', 'type'],
            alias: { h: 'help' },
        });

        const command = this.map.get(parsed._[0] as string);

        if (parsed.help || parsed._.length === 0 || !command) {
            this.printHelp();
            return;
        }

        return command.action(parsed);
    }

    public addFlags(flag: Flag) {
        this.flags.push(flag);
    }
}
