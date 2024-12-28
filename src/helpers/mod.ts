import { Command, type CommandAction, type CommandMeta, Flag } from '$cli';

/** Root command/Command object creation helper */
export function createApplication(
    metadata: CommandMeta,
    subCommands: Command[] = [],
    flags: Flag[] = [],
    action: CommandAction = function (_) {
        console.log('Default action');
    },
): Command {
    return new Command(
        metadata,
        action,
        flags,
        [],
        subCommands,
        true,
    );
}

/** Command object creation helper */
export function createCommand(
    metadata: CommandMeta,
    action: (args?: Record<string, any>) => void,
    subCommands: Command[] = [],
    flags: Flag[] = [],
    aliases?: string[],
): Command {
    return new Command(
        metadata,
        action,
        flags,
        aliases,
        subCommands,
        false,
    );
}
