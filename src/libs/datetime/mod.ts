import { dateValues, formatTZOffset, monthStr, padNum, tzStr } from './helpers.ts';

/** TimeFormatters is a collection of static methods to format Date objects */
export class TimeFormatters {
    public static Layout(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        return `${padNum(values.month + 1)}/${padNum(values.date)} ${
            padNum(values.hours % 12 || 12)
        }:${padNum(values.minutes)}:${padNum(values.seconds)}${values.hours >= 12 ? 'PM' : 'AM'} '${
            values.fullYear
                .toString()
                .slice(-2)
        } ${formatTZOffset(date, utc)}`;
    }

    public static ANSIC(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);
        const day = (utc ? date.toUTCString() : date.toString()).slice(0, 3);
        const month = monthStr(values.month).slice(0, 3);
        const dayOfMonth = padNum(values.date);
        const time = `${padNum(values.hours)}:${padNum(values.minutes)}:${padNum(values.seconds)}`;
        const year = values.fullYear;
        return `${day} ${month} ${dayOfMonth} ${time} ${year}`;
    }

    public static UnixDate(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);
        const day = (utc ? date.toUTCString() : date.toString()).slice(0, 3);
        const month = monthStr(values.month).slice(0, 3);
        const dayOfMonth = padNum(values.date);
        const time = `${padNum(values.hours)}:${padNum(values.minutes)}:${padNum(values.seconds)}`;
        const timezone = tzStr(date, utc);
        const year = values.fullYear;
        return `${day} ${month} ${dayOfMonth} ${time} ${timezone} ${year}`;
    }

    public static RubyDate(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);
        const day = (utc ? date.toUTCString() : date.toString()).slice(0, 3);
        const month = monthStr(values.month).slice(0, 3);
        const dayOfMonth = padNum(values.date);
        const time = `${padNum(values.hours)}:${padNum(values.minutes)}:${padNum(values.seconds)}`;
        const year = values.fullYear;

        return `${day} ${month} ${dayOfMonth} ${time} ${formatTZOffset(date, utc)} ${year}`;
    }

    public static RFC822(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const day = padNum(values.date);
        const month = monthStr(values.month).slice(0, 3);
        const year = values.fullYear.toString().slice(-2);
        const time = `${padNum(values.hours)}:${padNum(values.minutes)}`;
        const timezone = utc ? 'GMT' : (date.toString()).match(/\(([^)]+)\)$/)?.[1] ??
            '';
        return `${day} ${month} ${year} ${time} ${timezone}`;
    }

    public static RFC822Z(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const day = padNum(values.date);
        const month = monthStr(values.month).slice(0, 3);
        const year = values.fullYear.toString().slice(-2);
        const time = `${padNum(values.hours)}:${padNum(values.minutes)}`;
        return `${day} ${month} ${year} ${time} ${formatTZOffset(date, utc)}`;
    }

    public static RFC850(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const day = (utc ? date.toUTCString() : date.toString()).slice(0, 3);
        const month = monthStr(values.month).slice(0, 3);
        const dayOfMonth = padNum(values.date);
        const time = `${padNum(values.hours)}:${padNum(values.minutes)}:${padNum(values.seconds)}`;
        const year = values.fullYear;
        const timezone = tzStr(date, utc);

        return `${day}, ${dayOfMonth}-${month}-${year} ${time} ${timezone}`;
    }

    public static RFC1123(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const day = (utc ? date.toUTCString() : date.toString()).slice(0, 3);
        const month = monthStr(values.month).slice(0, 3);
        const dayOfMonth = padNum(values.date);
        const time = `${padNum(values.hours)}:${padNum(values.minutes)}:${padNum(values.seconds)}`;
        const year = values.fullYear;
        const timezone = tzStr(date, utc);

        return `${day}, ${dayOfMonth} ${month} ${year} ${time} ${timezone}`;
    }

    public static RFC1123Z(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const day = (utc ? date.toUTCString() : date.toString()).slice(0, 3);
        const month = monthStr(values.month).slice(0, 3);
        const dayOfMonth = padNum(values.date);
        const time = `${padNum(values.hours)}:${
            padNum(
                values.minutes,
            )
        }:${padNum(values.seconds)}`;
        const year = values.fullYear;

        return `${day}, ${dayOfMonth} ${month} ${year} ${time} ${formatTZOffset(date, utc)}`;
    }

    public static RFC3339(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const datePart = `${values.fullYear}-${padNum(values.month + 1)}-${padNum(values.date)}`;
        const timePart = `${padNum(values.hours)}:${padNum(values.minutes)}:${
            padNum(values.seconds)
        }`;
        const timezone = formatTZOffset(date, utc);
        return `${datePart}T${timePart}${timezone}`;
    }

    public static RFC3339Nano(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const datePart = `${values.fullYear}-${padNum(values.month + 1)}-${padNum(values.date)}`;
        const timePart = `${padNum(values.hours)}:${padNum(values.minutes)}:${
            padNum(values.seconds)
        }`;
        const milliseconds = values.milliseconds.toString().padStart(3, '0');
        const timezone = formatTZOffset(date, utc);

        return `${datePart}T${timePart}.${milliseconds}Z${timezone}`;
    }

    public static Kitchen(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const hours = values.hours % 12 || 12;
        const minutes = padNum(values.minutes);
        const period = values.hours >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes}${period}`;
    }

    public static Stamp(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const month = monthStr(values.month).slice(0, 3);
        const day = padNum(values.date);
        const time = `${padNum(values.hours)}:${padNum(values.minutes)}:${padNum(values.seconds)}`;
        return `${month} ${day} ${time}`;
    }

    public static StampMilli(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const stamp = TimeFormatters.Stamp(date, utc);
        const milliseconds = values.milliseconds.toString().padStart(3, '0');
        return `${stamp}.${milliseconds}`;
    }

    public static StampMicro(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const stamp = TimeFormatters.Stamp(date, utc);
        const microseconds = (values.milliseconds * 1000)
            .toString()
            .padStart(6, '0');
        return `${stamp}.${microseconds}`;
    }

    public static StampNano(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const stamp = TimeFormatters.Stamp(date, utc);
        const nanoseconds = (values.milliseconds * 1000000)
            .toString()
            .padStart(9, '0');
        return `${stamp}.${nanoseconds}`;
    }

    public static DateTime(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        const datePart = `${values.fullYear}-${padNum(values.month + 1)}-${padNum(values.date)}`;
        const timePart = `${padNum(values.hours)}:${padNum(values.minutes)}:${
            padNum(values.seconds)
        }`;

        return `${datePart} ${timePart}`;
    }

    public static DateOnly(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        return `${values.fullYear}-${padNum(values.month + 1)}-${padNum(values.date)}`;
    }

    public static TimeOnly(date: Date, utc: boolean): string {
        const values = dateValues(date, utc);

        return `${padNum(values.hours)}:${padNum(values.minutes)}:${padNum(values.seconds)}`;
    }
}

/** Enumeration of available formats */
export enum TimeFormat {
    Layout = 'Layout',
    ANSIC = 'ANSIC',
    UnixDate = 'UnixDate',
    RubyDate = 'RubyDate',
    RFC822 = 'RFC822',
    RFC822Z = 'RFC822Z',
    RFC850 = 'RFC850',
    RFC1123 = 'RFC1123',
    RFC1123Z = 'RFC1123Z',
    RFC3339 = 'RFC3339',
    RFC3339Nano = 'RFC3339Nano',
    Kitchen = 'Kitchen',
    Stamp = 'Stamp',
    StampMilli = 'StampMilli',
    StampMicro = 'StampMicro',
    StampNano = 'StampNano',
    DateTime = 'DateTime',
    DateOnly = 'DateOnly',
    TimeOnly = 'TimeOnly',
}

/** Pattern matching function for TimeFormat to Formatter function */
export function getFormatter(format: TimeFormat) {
    switch (format) {
        case TimeFormat.Layout:
            return TimeFormatters.Layout;
        case TimeFormat.ANSIC:
            return TimeFormatters.ANSIC;
        case TimeFormat.UnixDate:
            return TimeFormatters.UnixDate;
        case TimeFormat.RubyDate:
            return TimeFormatters.RubyDate;
        case TimeFormat.RFC822:
            return TimeFormatters.RFC822;
        case TimeFormat.RFC822Z:
            return TimeFormatters.RFC822Z;
        case TimeFormat.RFC850:
            return TimeFormatters.RFC850;
        case TimeFormat.RFC1123:
            return TimeFormatters.RFC1123;
        case TimeFormat.RFC1123Z:
            return TimeFormatters.RFC1123Z;
        case TimeFormat.RFC3339:
            return TimeFormatters.RFC3339;
        case TimeFormat.RFC3339Nano:
            return TimeFormatters.RFC3339Nano;
        case TimeFormat.Kitchen:
            return TimeFormatters.Kitchen;
        case TimeFormat.Stamp:
            return TimeFormatters.Stamp;
        case TimeFormat.StampMilli:
            return TimeFormatters.StampMilli;
        case TimeFormat.StampMicro:
            return TimeFormatters.StampMicro;
        case TimeFormat.StampNano:
            return TimeFormatters.StampNano;
        case TimeFormat.DateTime:
            return TimeFormatters.DateTime;
        case TimeFormat.DateOnly:
            return TimeFormatters.DateOnly;
        case TimeFormat.TimeOnly:
            return TimeFormatters.TimeOnly;
        default:
            throw new Error(`Unsupported format: ${format}`);
    }
}

/**
 * Helper/Utility method that takes a date and options to format based on the
 * provided layout */
export function formatDate(
    date: Date = new Date(),
    format: TimeFormat = TimeFormat.RFC822Z,
    utc: boolean = false,
): string {
    const fn = getFormatter(format);
    return fn(date, utc);
}
