/**
 * A Scheduler 
 * @name Scheduler
 * @example
 * export interface Scheduler {
 *   now(): Time;
 *   asap (task: Task): ScheduledTask;
 *   delay (delay: Delay, task: Task): ScheduledTask;
 *   periodic (period: Period, task: Task): ScheduledTask;
 *   schedule (delay: Delay, period: Period, task: Task): ScheduledTask;
 *   scheduleTask (offset: Offset, delay: Delay, period: Period, task: Task): ScheduledTask;
 *   relative(offset: Offset): Scheduler;
 *   cancel(task: ScheduledTask): void;
 *   cancelAll(predicate: (task: ScheduledTask) => boolean): void;
 * }
 * @type
 */
export { Scheduler } from '@most/types'
