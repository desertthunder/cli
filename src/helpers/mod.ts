import { Command, Flag } from '$cli';

/** Root command/Command object creation helper */
export function createApplication(
    name: string,
    usage: string,
    subCommands: Command[] = [],
    flags: Flag[] = [],
    usageText?: string,
    copyright?: string,
): Command {
    return new Command(
        name,
        usage,
        function (_) {
            throw new Error('Root command has no action');
        },
        flags,
        [],
        subCommands,
        [],
        true,
        usageText,
        copyright,
    );
}

/** Command object creation helper */
export function createCommand(
    name: string,
    usage: string,
    action: (args?: Record<string, any>) => void,
    subCommands: Command[] = [],
    flags: Flag[] = [],
    aliases?: string[],
    usageText?: string,
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
        usageText,
    );
}
