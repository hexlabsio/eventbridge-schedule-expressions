import { scheduleExpression } from '../src';

// A list of expressions that are compiled as part of testing.

scheduleExpression('rate(5 minutes)');
scheduleExpression('rate(1 minute)');
scheduleExpression('rate(10 hours)');
scheduleExpression('rate(10 hour)');
scheduleExpression('rate(4 days)');
scheduleExpression('rate(20 day)');

scheduleExpression('cron(* * * * * *)');
scheduleExpression('cron(* 2 * * * *)');
scheduleExpression('cron(0,1,44 0-2 ? * SUN-TUE 1970-1975)');
scheduleExpression('cron(0-59 0-2 L * SUN,TUE 1970-1975)');
scheduleExpression('cron(0-59 0-2 3W * SUN,TUE 1970-1975)');
scheduleExpression('cron(0-59 0-2 3W JAN-APR SUN,TUE 1970-1975)');
scheduleExpression('cron(0-59 0-2 3W JAN,DEC SUN,TUE 1970-1975)');

scheduleExpression('cron(0-59 0-2 3W * 3#1 1970-1975)');
scheduleExpression('cron(1/10 0-2 3W * 3#1 1970-1975)');
