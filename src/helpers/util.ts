export function friendlyDate(datsStr: string) {
  const dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
  const time = dateObj.getTime()
  const now = Date.now()
  const space = now - time
  let str: string

  switch (true) {
    case space < 60000:
      str = '刚刚'
      break
    case space < 1000*3600:
      str = Math.floor(space/60000) + '分钟前'
      break
    case space < 1000*3600*24:
      str = Math.floor(space/(1000*3600)) + '小时前'
      break
    default:
      str = Math.floor(space/(1000*3600*24)) + '天前'
  }
  return str
}