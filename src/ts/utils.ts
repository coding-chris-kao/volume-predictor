import { MAX_TIME, MIN_TIME } from "../config";
import { TimeFactors } from "./timeFactors";

export function getQuotient(a: number, b: number) {
  return Math.ceil(a / b);
}

function getTimeValue(time: string) {
  const tmp = time.split(":");
  return parseInt(tmp[0]) * 60 + parseInt(tmp[1]);
}

export function getLatestTimeFactor(time: Date) {
  const h = time.getHours();
  const m = time.getMinutes();
  let currTimeValue = h * 60 + m;
  if (currTimeValue < MIN_TIME || currTimeValue > MAX_TIME) return null;

  const found = TimeFactors.find((x) => {
    const tmp = getTimeValue(x.time);
    const diff = currTimeValue - tmp;
    return diff >= 0 && diff < 5;
  });

  if (!found) return null;

  return found.factor;
}
