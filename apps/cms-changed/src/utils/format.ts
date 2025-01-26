import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(utc: string, format: string = 'YYYY-MM-DD HH-mm-ss') {
  // 东八区，在零时区基础上增加8小时
  const resultTime = dayjs.utc(utc).utcOffset(8).format(format)
  return resultTime
}
