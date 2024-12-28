import { repeatChar } from '$utils';

/** Available types for flags */
export type FlagType = 'string' | 'bool' | 'int' | 'float';

/** Function that tells caller if value is valid or not */
export type ValidatorFn = (value: any) => boolean;

/** Simple type validators for flags. */
export const DefaultValidators = {
    string: (value: any): boolean => {
        return value == `${value}`;
    },
    bool: (value: any): boolean => {
        return value === Boolean(value);
    },
    int: (value: any): boolean => {
        return !Number.isNaN(value) && Number.isInteger(value);
    },
    float: (value: any): boolean => {
        return !Number.isNaN(value) && !Number.isInteger(value);
    },
} as const;

/** Flag is a wrapper around parsed flag attributes for a command. */
export class Flag {
    private validatorFn: ValidatorFn;

    constructor(
        /** Named type of the flag */
        public type: FlagType,
        /** Name of the flag */
        public name: string,
        /** Usage/Help Text of the flag */
        public usage: string,
        /** Whether or not flag should be required */
        public required: boolean = false,
        /** Whether or not to run validator function */
        public shouldValidate: boolean = false,
        /** Optional override of validator function */
        validator?: ValidatorFn,
    ) {
        this.validatorFn = validator ?? DefaultValidators[this.type];
    }

    private validate(value: any): boolean {
        if (this.shouldValidate) {
            return this.validatorFn(value);
        }

        return true;
    }

    set validator(validatorFn: ValidatorFn) {
        this.validatorFn = validatorFn;
    }

    fmtType(n: number): string {
        return `<${this.type}>` + repeatChar(' ', n + 2);
    }

    /**
     * usageText is a getter that generates formatted usage text for
     * a flag.
     */
    get usageText(): string {
        return (this.required ? ' (required)  ' : '') + `${this.usage}`;
    }
}
