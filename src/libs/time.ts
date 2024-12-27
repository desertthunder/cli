export class TimeFormatters {
  private static pad(value: number, length: number = 2): string {
    return value.toString().padStart(length, "0");
  }

  private static formatTimezoneOffset(date: Date): string {
    const offset = date.getTimezoneOffset();
    const sign = offset > 0 ? "-" : "+";
    const hours = TimeFormatters.pad(Math.abs(Math.floor(offset / 60)));
    const minutes = TimeFormatters.pad(Math.abs(offset % 60));
    return `${sign}${hours}${minutes}`;
  }

  public static Layout(date: Date): string {
    return `${TimeFormatters.pad(date.getMonth() + 1)}/${TimeFormatters.pad(
      date.getDate()
    )} ${TimeFormatters.pad(date.getHours() % 12 || 12)}:${TimeFormatters.pad(
      date.getMinutes()
    )}:${TimeFormatters.pad(date.getSeconds())}${
      date.getHours() >= 12 ? "PM" : "AM"
    } '${date
      .getFullYear()
      .toString()
      .slice(-2)} ${TimeFormatters.formatTimezoneOffset(date)}`;
  }

  public static ANSIC(date: Date): string {
    const day = date.toString().slice(0, 3);
    const month = date.toString().slice(4, 7);
    const dayOfMonth = TimeFormatters.pad(date.getDate());
    const time = `${TimeFormatters.pad(date.getHours())}:${TimeFormatters.pad(
      date.getMinutes()
    )}:${TimeFormatters.pad(date.getSeconds())}`;
    const year = date.getFullYear();
    return `${day} ${month} ${dayOfMonth} ${time} ${year}`;
  }

  public static UnixDate(date: Date): string {
    const day = date.toString().slice(0, 3);
    const month = date.toString().slice(4, 7);
    const dayOfMonth = TimeFormatters.pad(date.getDate());
    const time = `${TimeFormatters.pad(date.getHours())}:${TimeFormatters.pad(
      date.getMinutes()
    )}:${TimeFormatters.pad(date.getSeconds())}`;
    const timezone = date.toString().match(/\(([^)]+)\)$/)?.[1] ?? "";
    const year = date.getFullYear();
    return `${day} ${month} ${dayOfMonth} ${time} ${timezone} ${year}`;
  }

  public static RubyDate(date: Date): string {
    const day = date.toString().slice(0, 3);
    const month = date.toString().slice(4, 7);
    const dayOfMonth = TimeFormatters.pad(date.getDate());
    const time = `${TimeFormatters.pad(date.getHours())}:${TimeFormatters.pad(
      date.getMinutes()
    )}:${TimeFormatters.pad(date.getSeconds())}`;
    const year = date.getFullYear();
    return `${day} ${month} ${dayOfMonth} ${time} ${TimeFormatters.formatTimezoneOffset(
      date
    )} ${year}`;
  }

  public static RFC822(date: Date): string {
    const day = TimeFormatters.pad(date.getDate());
    const month = date.toString().slice(4, 7);
    const year = date.getFullYear().toString().slice(-2);
    const time = `${TimeFormatters.pad(date.getHours())}:${TimeFormatters.pad(
      date.getMinutes()
    )}`;
    const timezone = date.toString().match(/\(([^)]+)\)$/)?.[1] ?? "";
    return `${day} ${month} ${year} ${time} ${timezone}`;
  }

  public static RFC822Z(date: Date): string {
    const day = TimeFormatters.pad(date.getDate());
    const month = date.toString().slice(4, 7);
    const year = date.getFullYear().toString().slice(-2);
    const time = `${TimeFormatters.pad(date.getHours())}:${TimeFormatters.pad(
      date.getMinutes()
    )}`;
    return `${day} ${month} ${year} ${time} ${TimeFormatters.formatTimezoneOffset(
      date
    )}`;
  }

  public static RFC850(date: Date): string {
    const day = date.toString().slice(0, 3);
    const month = date.toString().slice(4, 7);
    const dayOfMonth = TimeFormatters.pad(date.getDate());
    const time = `${TimeFormatters.pad(date.getHours())}:${TimeFormatters.pad(
      date.getMinutes()
    )}:${TimeFormatters.pad(date.getSeconds())}`;
    const year = date.getFullYear();
    const timezone = date.toString().match(/\(([^)]+)\)$/)?.[1] ?? "";
    return `${day}, ${dayOfMonth}-${month}-${year} ${time} ${timezone}`;
  }

  public static RFC1123(date: Date): string {
    const day = date.toString().slice(0, 3);
    const month = date.toString().slice(4, 7);
    const dayOfMonth = TimeFormatters.pad(date.getDate());
    const time = `${TimeFormatters.pad(date.getHours())}:${TimeFormatters.pad(
      date.getMinutes()
    )}:${TimeFormatters.pad(date.getSeconds())}`;
    const year = date.getFullYear();
    const timezone = date.toString().match(/\(([^)]+)\)$/)?.[1] ?? "";
    return `${day}, ${dayOfMonth} ${month} ${year} ${time} ${timezone}`;
  }

  public static RFC1123Z(date: Date): string {
    const day = date.toString().slice(0, 3);
    const month = date.toString().slice(4, 7);
    const dayOfMonth = TimeFormatters.pad(date.getDate());
    const time = `${TimeFormatters.pad(date.getHours())}:${TimeFormatters.pad(
      date.getMinutes()
    )}:${TimeFormatters.pad(date.getSeconds())}`;
    const year = date.getFullYear();
    return `${day}, ${dayOfMonth} ${month} ${year} ${time} ${TimeFormatters.formatTimezoneOffset(
      date
    )}`;
  }

  public static RFC3339(date: Date): string {
    const datePart = `${date.getFullYear()}-${TimeFormatters.pad(
      date.getMonth() + 1
    )}-${TimeFormatters.pad(date.getDate())}`;
    const timePart = `${TimeFormatters.pad(
      date.getHours()
    )}:${TimeFormatters.pad(date.getMinutes())}:${TimeFormatters.pad(
      date.getSeconds()
    )}`;
    const timezone = TimeFormatters.formatTimezoneOffset(date);
    return `${datePart}T${timePart}${timezone}`;
  }

  public static RFC3339Nano(date: Date): string {
    const datePart = `${date.getFullYear()}-${TimeFormatters.pad(
      date.getMonth() + 1
    )}-${TimeFormatters.pad(date.getDate())}`;
    const timePart = `${TimeFormatters.pad(
      date.getHours()
    )}:${TimeFormatters.pad(date.getMinutes())}:${TimeFormatters.pad(
      date.getSeconds()
    )}`;
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
    const timezone = TimeFormatters.formatTimezoneOffset(date);
    return `${datePart}T${timePart}.${milliseconds}Z${timezone}`;
  }

  public static Kitchen(date: Date): string {
    const hours = date.getHours() % 12 || 12;
    const minutes = TimeFormatters.pad(date.getMinutes());
    const period = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes}${period}`;
  }

  public static Stamp(date: Date): string {
    const month = date.toString().slice(4, 7);
    const day = TimeFormatters.pad(date.getDate());
    const time = `${TimeFormatters.pad(date.getHours())}:${TimeFormatters.pad(
      date.getMinutes()
    )}:${TimeFormatters.pad(date.getSeconds())}`;
    return `${month} ${day} ${time}`;
  }

  public static StampMilli(date: Date): string {
    const stamp = TimeFormatters.Stamp(date);
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
    return `${stamp}.${milliseconds}`;
  }

  public static StampMicro(date: Date): string {
    const stamp = TimeFormatters.Stamp(date);
    const microseconds = (date.getMilliseconds() * 1000)
      .toString()
      .padStart(6, "0");
    return `${stamp}.${microseconds}`;
  }

  public static StampNano(date: Date): string {
    const stamp = TimeFormatters.Stamp(date);
    const nanoseconds = (date.getMilliseconds() * 1000000)
      .toString()
      .padStart(9, "0");
    return `${stamp}.${nanoseconds}`;
  }

  public static DateTime(date: Date): string {
    const datePart = `${date.getFullYear()}-${TimeFormatters.pad(
      date.getMonth() + 1
    )}-${TimeFormatters.pad(date.getDate())}`;
    const timePart = `${TimeFormatters.pad(
      date.getHours()
    )}:${TimeFormatters.pad(date.getMinutes())}:${TimeFormatters.pad(
      date.getSeconds()
    )}`;
    return `${datePart} ${timePart}`;
  }

  public static DateOnly(date: Date): string {
    return `${date.getFullYear()}-${TimeFormatters.pad(
      date.getMonth() + 1
    )}-${TimeFormatters.pad(date.getDate())}`;
  }

  public static TimeOnly(date: Date): string {
    return `${TimeFormatters.pad(date.getHours())}:${TimeFormatters.pad(
      date.getMinutes()
    )}:${TimeFormatters.pad(date.getSeconds())}`;
  }
}

export enum TimeFormat {
  Layout = "Layout",
  ANSIC = "ANSIC",
  UnixDate = "UnixDate",
  RubyDate = "RubyDate",
  RFC822 = "RFC822",
  RFC822Z = "RFC822Z",
  RFC850 = "RFC850",
  RFC1123 = "RFC1123",
  RFC1123Z = "RFC1123Z",
  RFC3339 = "RFC3339",
  RFC3339Nano = "RFC3339Nano",
  Kitchen = "Kitchen",
  Stamp = "Stamp",
  StampMilli = "StampMilli",
  StampMicro = "StampMicro",
  StampNano = "StampNano",
  DateTime = "DateTime",
  DateOnly = "DateOnly",
  TimeOnly = "TimeOnly",
}

function getFormatter(format: TimeFormat) {
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

export function formatDate(
  date: Date = new Date(),
  format: TimeFormat = TimeFormat.RFC822Z
): string {
  const fn = getFormatter(format);
  return fn(date);
}
