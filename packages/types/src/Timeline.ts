/**
 * Keeps track of time
 * @name Timeline
 * @example
 * export interface Timeline {
 *   add(scheduledTask: ScheduledTask): void;
 *   remove(scheduledTask: ScheduledTask): boolean;
 *   removeAll(f: (scheduledTask: ScheduledTask) => boolean): void;
 *   isEmpty(): boolean;
 *   nextArrival(): Time;
 *   runTasks(time: Time, runTask: TaskRunner): void;
 * }
 * @type
 */
export { Timeline } from '@most/types'
