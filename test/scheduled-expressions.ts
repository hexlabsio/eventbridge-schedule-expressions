import { scheduleExpression } from '../src';

scheduleExpression('cron(* * * * * *)');
scheduleExpression('cron(* 2 * * * *)');

scheduleExpression('rate(5 minutes)');
scheduleExpression('rate(10 hours)');
scheduleExpression('rate(4 days)');
scheduleExpression('cron(0,1,44 0-2 ? * SUN-TUE 1970-1975)');
