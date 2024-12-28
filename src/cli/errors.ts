/** Common program exit codes */
export enum ExitCodes {
    Success,
    GeneralError,
    ParsingError,
}

/** Error object */
export type CommandError = {
    message: string;
    code: ExitCodes | number;
    error?: Error;
};

/** Function to handle a CommandError */
export type ErrorHandler = (err: CommandError) => void;
