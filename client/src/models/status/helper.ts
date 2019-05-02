import { Status } from ".";

export function isStatus(status: Status[], target: Status) {
  return status.length === 1 && status[0] === target;
}
