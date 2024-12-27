import { parseArgs } from "jsr:@std/cli";

/**
 * Create a range iterator from start to end
 */
export function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => i);
}

/**
 * Repeat character, ch, n times. Defaults to 2.
 */
export function repeatChar(ch: string, n: number = 2): string {
  let repeated = ch;

  for (const _ of range(0, n - 1)) {
    repeated += ch;
  }

  return repeated;
}

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

  get usageText() {
    return (this.required ? " (required)  " : "") + `${this.usage}`;
  }
}

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

    this.map = Command.subCommandMap(this.commands);
  }

  static subCommandMap(cmds: Command[]) {
    const m = new Map<string, Command>();

    for (const cmd of cmds) {
      m.set(cmd.name, cmd);
    }

    return m;
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
  static commandTextHelper(cmds: Command[]): string {
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

  static flagTextHelper(flags: Flag[]): string {
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

    const commandLines = Command.commandTextHelper(this.commands);
    const optionLines = Command.flagTextHelper(this.flags);

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

  public printHelp() {
    this.print(this.help);
  }

  public run(args: string[]) {
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

  public static create(
    name: string,
    usage: string,
    action: (args?: Record<string, any>) => void,
    subCommands: Command[] = [],
    flags: Flag[] = [],
    aliases?: string[],
    usageText?: string
  ): Command {
    return new Command(
      name,
      usage,
      action,
      flags,
      aliases,
      subCommands,
      [],
      false,
      usageText
    );
  }

  public static createApplication(
    name: string,
    usage: string,
    subCommands: Command[] = [],
    flags: Flag[] = [],
    usageText?: string,
    copyright?: string
  ): Command {
    return new Command(
      name,
      usage,
      function (_) {
        throw new Error("Root command has no action");
      },
      flags,
      [],
      subCommands,
      [],
      true,
      usageText,
      copyright
    );
  }

  public addFlags(flag: Flag) {
    this.flags.push(flag);
  }
}
