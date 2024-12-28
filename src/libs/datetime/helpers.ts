export function dateValues(date: Date, utc: boolean): {
    month: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    fullYear: number;
} {
    if (utc) {
        return {
            month: date.getUTCMonth(),
            date: date.getUTCDate(),
            hours: date.getUTCHours(),
            minutes: date.getUTCMinutes(),
            seconds: date.getUTCSeconds(),
            milliseconds: date.getUTCMilliseconds(),
            fullYear: date.getUTCFullYear(),
        };
    } else {
        return {
            month: date.getMonth(),
            date: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            milliseconds: date.getMilliseconds(),
            fullYear: date.getFullYear(),
        };
    }
}

export function padNum(value: number, length: number = 2): string {
    return value.toString().padStart(length, '0');
}

export function formatTZOffset(date: Date, utc: boolean): string {
    const offsetMinutes = utc ? 0 : date.getTimezoneOffset();
    const sign = offsetMinutes > 0 ? '-' : '+';
    const hours = padNum(Math.abs(Math.floor(offsetMinutes / 60)));
    const minutes = padNum(Math.abs(offsetMinutes % 60));
    return `${sign}${hours}${minutes}`; // Format as ±HHMM
}

export function tzStr(date: Date, utc: boolean): string {
    if (utc) {
        return 'GMT';
    } else {
        return (date.toString()).match(/\(([^)]+)\)$/)?.[1] ??
            '';
    }
}

export function monthStr(monthNumber: number): string {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    if (monthNumber > 12) {
        throw new Error('Invalid month number. Must be between 1 and 12.');
    }

    return months[monthNumber];
}
