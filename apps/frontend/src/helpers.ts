import { Duration } from "luxon";

export const secondsToDigital = (seconds: number): string =>
  Duration.fromObject({ seconds }).toFormat("h:mm:ss");
