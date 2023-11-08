import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);


/**
 * 
 * @param format the desired format in what we want our string
 * @param arg the date that we want to format
 * @returns a formatted string representing the given date
 */

export function formatDate(format: string = 'YYYY-MM-DD', arg: Date | string): string {
  const date = dayjs(arg);
  return date.utc().format(format);
}

