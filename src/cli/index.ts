import { parseArgs } from "jsr:@std/cli@1.0.9";
import { repeatChar } from "$utils";

/** Flag is a wrapper around parsed flag attributes for a command. */
export class Flag {
  constructor(
    /** Named type of the flag */
    public type: string,
    public name: string,
    public usage: string,
    public required: boolean = false
  ) {}

  fmtType(n: number): string {
    return `<${this.type}>` + repeatChar(" ", n + 2);
  }

  /**
   * usageText is a getter that generates formatted usage text for
   * a flag.
   */
  get usageText(): string {
    return (this.required ? " (required)  " : "") + `${this.usage}`;
  }
}

/**
 * createSubCommandMap is a helper function that maps command
 * names to actions.
 */
export function createSubCommandMap(cmds: Command[]) {
  const m = new Map<string, Command>();

  for (const cmd of cmds) {
    m.set(cmd.name, cmd);
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
    public name: string,
    public usage: string,
    public action: (args?: Record<string, any>) => void,
    public flags: Flag[] = [],
    public aliases: string[] = [],
    public commands: Command[] = [],
    public authors: string[] = [],
    public isRoot: boolean = false,
    public usageText?: string,
    public copyright?: string
  ) {
    if (!this.copyright) {
      this.copyright = this.defaultCopyright();
    }

    this.map = createSubCommandMap(this.commands);
  }

  private defaultCopyright(year?: number): string {
    let copy: string = `&copy ${year}`;

    if (!year) {
      copy = `&copy ${new Date().getFullYear()}`;
    }

    if (this.authors) {
      copy += " ";
      copy += this.authors.join(", ");
    }

    return copy;
  }

  /**
   * Given a list of subcommands, we want to created a formatted
   * help line of the format __{command name}__{help text}. This
   * takes the longest named command, and makes sure that each
   * command name takes up the same horizontal space.
   */
  private get formattedCommandText(): string {
    const cmds = this.commands;

    const lines: string[] = [];

    const maxLength = Math.max(...cmds.map((cmd) => cmd.name.length));

    for (const cmd of cmds) {
      let nameTag = "  " + cmd.name;

      const diff = maxLength - cmd.name.length;

      nameTag += repeatChar(" ", diff + 1);

      const line: string =
        nameTag + (cmd.usageText ? cmd.usageText : cmd.usage);

      lines.push(line);
    }

    return lines.join("\n");
  }

  /**
   * Formats the usage text for each flag
   */
  private get formattedFlagText(): string {
    const flags = this.flags;
    const lines: string[] = [];

    const maxLength = Math.max(...flags.map((flg) => flg.name.length));
    const maxFlagLength = Math.max(...flags.map((flg) => flg.type.length));

    for (const flag of flags) {
      let nameTag = "  --" + flag.name;

      if (nameTag.length < maxLength) {
        const diff = maxLength - flag.name.length;
        const buff = repeatChar(" ", diff);
        nameTag += `${buff}  ${flag.fmtType(maxFlagLength)}`;
      }

      const line: string = nameTag + flag.usageText;

      lines.push(line);
    }

    return lines.join("\n");
  }

  get usageLine(): string {
    return `Usage: deno run ${this.name} <command> [options]`;
  }

  get help(): string {
    if (!this.isRoot) {
      return "";
    }

    let text = this.usageLine;

    const commandLines = this.formattedCommandText;
    const optionLines = this.formattedFlagText;

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
  public printHelp(): void {
    this.print(this.help);
  }

  /** run executes the root command using parsed arguments */
  public run(args: string[]): void {
    const parsed = parseArgs(args, {
      boolean: ["help"],
      string: ["name", "type"],
      alias: { h: "help" },
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
