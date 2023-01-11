type PositiveInt<T extends number> = `${T}` extends
  | `-${number}`
  | `${number}.${number}`
  ? never
  : T;
type NumericRange<
  start extends number,
  end extends number,
  arr extends unknown[] = [],
  acc extends number = never,
> = arr['length'] extends end
  ? start | acc | end
  : start extends PositiveInt<start>
  ? end extends PositiveInt<end>
    ? NumericRange<
        start,
        end,
        [...arr, 1],
        arr[start] extends undefined ? acc : acc | arr['length']
      >
    : never
  : never;
type UnionAsReturnTypes<T> = T extends never ? never : () => T;
type UnionToIntersection<U> = (
  U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
  ? I
  : never;
type asNumber<T extends string> = T extends `${infer n extends number}`
  ? n
  : never;
type UnionToPrefixedTuple<Prefix extends number, T> = UnionToIntersection<
  UnionAsReturnTypes<T>
> extends () => infer W
  ? W extends number
    ? [
        ...UnionToPrefixedTuple<Prefix, Exclude<T, W>>,
        asNumber<`${Prefix}${W}`>,
      ]
    : never
  : [];

type ListOf<
  Elem extends string | number | boolean,
  T extends string,
> = T extends `${Elem},${infer rest}`
  ? rest extends `${Elem}`
    ? T
    : rest extends ListOf<Elem, rest>
    ? T
    : never
  : T extends `${Elem}`
  ? T
  : never;

type RangeOf<
  Elem extends string | number | boolean,
  T extends string,
> = T extends `${Elem}-${Elem}` ? T : never;
type Nth<
  Elem extends string | number | boolean,
  T extends string,
> = T extends `${Elem}/${Elem}` ? T : never;
type W<
  Elem extends string | number | boolean,
  T extends string,
> = T extends `${Elem}W` ? T : never;
type Hash<
  Elem1 extends string | number | boolean,
  Elem2 extends string | number | boolean,
  T extends string,
> = T extends `${Elem1}#${Elem2}` ? T : never;

// type checker complains about excessive nesting for NumbericRange + UnionToPrefixedTuple so had to
// break this into an ugly union
type YearRange =
  | UnionToPrefixedTuple<197, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<198, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<199, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<200, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<201, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<202, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<203, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<204, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<205, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<206, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<207, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<208, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<209, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<210, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<211, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<212, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<213, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<214, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<215, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<216, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<217, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<218, NumericRange<0, 9>>[number]
  | UnionToPrefixedTuple<219, NumericRange<0, 9>>[number];
type MinuteRange = NumericRange<0, 59>;
type HourRange = NumericRange<0, 23>;
type MonthDayRange = NumericRange<1, 31>;
type WeekDayRange = NumericRange<1, 7>;
type MonthRange = NumericRange<1, 12>;
type AbreviatedMonth =
  | 'JAN'
  | 'FEB'
  | 'MAR'
  | 'APR'
  | 'MAY'
  | 'JUN'
  | 'JUL'
  | 'AUG'
  | 'SEP'
  | 'OCT'
  | 'NOV'
  | 'DEC';
type AbreviatedDay =
  | 'SUN'
  | 'MON'
  | 'TUE'
  | 'WED'
  | 'THU'
  | 'FRI'
  | 'SAT'
  | 'SUN';

type Minute<T extends string> =
  | `${MinuteRange}`
  | ListOf<MinuteRange, T>
  | RangeOf<MinuteRange, T>
  | Nth<MinuteRange, T>
  | '*';

type Hour<T extends string> =
  | `${HourRange}`
  | ListOf<HourRange, T>
  | RangeOf<HourRange, T>
  | Nth<HourRange, T>
  | '*';

type DayOfMonth<T extends string> =
  | `${MonthDayRange}`
  | ListOf<MonthDayRange, T>
  | RangeOf<MonthDayRange, T>
  | Nth<MonthDayRange, T>
  | W<MonthDayRange, T>
  | '*'
  | '?'
  | 'L';

type Month<T extends string> =
  | `${MonthRange}`
  | ListOf<MonthRange, T>
  | RangeOf<MonthRange, T>
  | Nth<MonthDayRange, T>
  | `${AbreviatedMonth}`
  | ListOf<AbreviatedMonth, T>
  | RangeOf<AbreviatedMonth, T>
  | '*';

type DayOfWeek<T extends string> =
  | `${WeekDayRange}`
  | ListOf<WeekDayRange, T>
  | RangeOf<WeekDayRange, T>
  | Nth<WeekDayRange, T>
  | Hash<NumericRange<1, 5>, WeekDayRange, T>
  | `${AbreviatedDay}`
  | ListOf<AbreviatedDay, T>
  | RangeOf<AbreviatedDay, T>
  | '*'
  | '?'
  | 'L';

type Year<T extends string> =
  | `${YearRange}`
  | ListOf<YearRange, T>
  | RangeOf<YearRange, T>
  | Nth<YearRange, T>
  | '*';

export type Cron<T extends string> =
  T extends `cron(${infer min} ${infer hr} ${infer dom} ${infer mnth} ${infer dow} ${infer yr})`
    ? min extends Minute<min>
      ? hr extends Hour<hr>
        ? dom extends DayOfMonth<dom>
          ? mnth extends Month<mnth>
            ? dow extends DayOfWeek<dow>
              ? yr extends Year<yr>
                ? T
                : never
              : never
            : never
          : never
        : never
      : never
    : never;

type RateUnit = 'minute' | 'minutes' | 'hour' | 'hours' | 'day' | 'days';
export type Rate<T extends string> = T extends `rate(${infer v} ${infer unit})`
  ? unit extends RateUnit
    ? v extends `${number}`
      ? v extends `-${number}` | `${number}.${number}`
        ? never
        : T //Positive Int check needed to be inlined here
      : never
    : never
  : never;

export type ScheduleExpression<T extends string> = Cron<T> | Rate<T>;

//invoke typecheck by invoking this function including the expression as a parameter
export function scheduleExpression<T extends string>(
  expr: ScheduleExpression<T>,
): ScheduleExpression<T> {
  return expr;
}
