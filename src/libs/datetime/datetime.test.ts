import { TimeFormat } from '$libs';
import { formatDate } from '$datetime';
import { assertEquals } from '@std/assert';

const SUPERMAN_DATE = new Date('1938-04-18T00:00:00Z');

const testCases: [TimeFormat, string][] = [
    [TimeFormat.Layout, "04/18 12:00:00AM '38 +0000"],
    [TimeFormat.ANSIC, 'Mon Apr 18 00:00:00 1938'],
    [TimeFormat.UnixDate, 'Mon Apr 18 00:00:00 GMT 1938'],
    [TimeFormat.RubyDate, 'Mon Apr 18 00:00:00 +0000 1938'],
    [TimeFormat.RFC822, '18 Apr 38 00:00 GMT'],
    [TimeFormat.RFC822Z, '18 Apr 38 00:00 +0000'],
    [TimeFormat.RFC850, 'Mon, 18-Apr-1938 00:00:00 GMT'],
    [TimeFormat.RFC1123, 'Mon, 18 Apr 1938 00:00:00 GMT'],
    [TimeFormat.RFC1123Z, 'Mon, 18 Apr 1938 00:00:00 +0000'],
    [TimeFormat.RFC3339, '1938-04-18T00:00:00+0000'],
    [TimeFormat.RFC3339Nano, '1938-04-18T00:00:00.000Z+0000'],
    [TimeFormat.Kitchen, '12:00AM'],
    [TimeFormat.Stamp, 'Apr 18 00:00:00'],
    [TimeFormat.StampMilli, 'Apr 18 00:00:00.000'],
    [TimeFormat.StampMicro, 'Apr 18 00:00:00.000000'],
    [TimeFormat.StampNano, 'Apr 18 00:00:00.000000000'],
    [TimeFormat.DateTime, '1938-04-18 00:00:00'],
    [TimeFormat.DateOnly, '1938-04-18'],
    [TimeFormat.TimeOnly, '00:00:00'],
];

for (const [fmt, want] of testCases) {
    console.log(fmt, want);
    Deno.test(`${fmt}`, function () {
        const got = formatDate(SUPERMAN_DATE, fmt, true);
        assertEquals(got, want);
    });
}
