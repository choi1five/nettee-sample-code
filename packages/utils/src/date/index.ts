import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

type DateInput = string | number | Date | null | undefined;

export const DATE_FORMAT = {
  DEFAULT: 'YYYY-MM-DD',
  WITH_TIME: 'YYYY-MM-DD HH:mm',
  FULL: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm',
  TIME_WITH_SECONDS: 'HH:mm:ss',
  YEAR_MONTH: 'YYYY-MM',
  MONTH_DAY: 'MM-DD',
} as const;

// 기본 날짜 생성 (현재 시간대 기준)
export const createDate = (date?: DateInput) => {
  return dayjs(date).tz(dayjs.tz.guess());
};

// 현재 시간
export const now = () => {
  return dayjs().tz(dayjs.tz.guess());
};

// UTC -> 로컬 시간 변환
export const utcToLocal = (utcDate: DateInput) => {
  return dayjs.utc(utcDate).tz(dayjs.tz.guess());
};

// 로컬 시간 -> UTC 변환
export const localToUTC = (localDate: DateInput) => {
  return dayjs(localDate).tz(dayjs.tz.guess()).utc();
};

// 날짜 포맷팅
export const formatDate = (date: DateInput, formatStr: string = DATE_FORMAT.DEFAULT) => {
  return utcToLocal(date).format(formatStr);
};

// 날짜 비교
export const isSameDay = (date1: DateInput, date2: DateInput): boolean => {
  return utcToLocal(date1).isSame(utcToLocal(date2), 'day');
};

export const isBefore = (date1: DateInput, date2: DateInput): boolean => {
  return utcToLocal(date1).isBefore(utcToLocal(date2));
};

export const isAfter = (date1: DateInput, date2: DateInput): boolean => {
  return utcToLocal(date1).isAfter(utcToLocal(date2));
};

// 날짜 계산
export const addDays = (date: DateInput, days: number) => {
  return utcToLocal(date).add(days, 'day');
};

export const subtractDays = (date: DateInput, days: number) => {
  return utcToLocal(date).subtract(days, 'day');
};

// 기간 계산
export const getDaysDiff = (date1: DateInput, date2: DateInput): number => {
  return utcToLocal(date1).diff(utcToLocal(date2), 'day');
};

// 날짜 유효성 검사
export const isValid = (date: DateInput): boolean => {
  return dayjs(date).isValid();
};

// 시작일/종료일 처리
export const startOfDay = (date: DateInput) => {
  return utcToLocal(date).startOf('day');
};

export const endOfDay = (date: DateInput) => {
  return utcToLocal(date).endOf('day');
};

export const startOfMonth = (date: DateInput) => {
  return utcToLocal(date).startOf('month');
};

export const endOfMonth = (date: DateInput) => {
  return utcToLocal(date).endOf('month');
};

// 날짜 범위 내 포함 여부
export const isWithinRange = (date: DateInput, startDate: DateInput, endDate: DateInput): boolean => {
  const targetDate = utcToLocal(date);
  const start = utcToLocal(startDate);
  const end = utcToLocal(endDate);

  return targetDate.isBetween(start, end, 'day', '[]');
};

// 날짜 파싱 (특정 포맷의 문자열을 날짜로)
export const parseDate = (dateString: string, format: string) => {
  return dayjs(dateString, format).tz(dayjs.tz.guess());
};
