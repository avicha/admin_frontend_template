//这个文件是用来转换处理数据的

/**
 * 把字符串往左补齐0至len位
 * @param {string} str 字符串
 * @param {number} len 至少位数
 * @return {string} 左补齐0后字符串
 * demo： formatter.padZero(1, 3) 结果为'001'
 **/
const padZero = (str, len) => {
  str = str.toString()
  while (str.length < len) {
    str = '0' + str
  }
  return str
}
/**
 * 把字符串转换成为时间对象
 * @param {string} str 时间字符串
 * @param {string} format 字符串格式
 * @return {date} 时间对象
 * demo1： formatter.toDate('2018-08-12 16:40:44.123', 'yyyy-MM-dd HH:mm:ss.SSS')
 * demo2： formatter.toDate('20180812', 'yyyyMMdd')
 **/
const toDate = (str, format) => {
  let fields = []
  let dateObj = {}
  let resDate = new Date()
  let regexStr = format.replace(/(\.)|(\/)|(\?)|(\s+)/g, (field) => {
    switch (field) {
      case '.':
        return '\\.'
      case '/':
        return '\\/'
      case '?':
        return '\\?'
      default:
        return `\\s{${field.length}}`
    }
  }).replace(/(yyyy)|(MM)|(dd)|(HH)|(mm)|(ss)|(SSS)/g, (field) => {
    switch (field) {
      case 'yyyy':
        fields.push('year')
        break
      case 'MM':
        fields.push('month')
        break
      case 'M':
        fields.push('month')
        break
      case 'dd':
        fields.push('day')
        break
      case 'd':
        fields.push('day')
        break
      case 'HH':
        fields.push('hour')
        break
      case 'H':
        fields.push('hour')
        break
      case 'mm':
        fields.push('minute')
        break
      case 'm':
        fields.push('minute')
        break
      case 'ss':
        fields.push('second')
        break
      case 's':
        fields.push('second')
        break
      case 'SSS':
        fields.push('millisecond')
        break
    }
    return `(\\d{${field.length}})`
  })
  let regex = new RegExp(regexStr)
  if (regex.test(str)) {
    let res = str.match(regex)
    let resArr = res.slice(1)
    resArr.forEach((val, index) => {
      dateObj[fields[index]] = Number(val)
    })
    if (dateObj.year && dateObj.month && dateObj.day) {
      resDate.setYear(dateObj.year)
      resDate.setMonth(dateObj.month - 1)
      resDate.setDate(dateObj.day)
      if (~str.indexOf('Z')) {
        resDate.setUTCHours(dateObj.hour || 0)
      } else {
        resDate.setHours(dateObj.hour || 0)
      }
      resDate.setMinutes(dateObj.minute || 0)
      resDate.setSeconds(dateObj.second || 0)
      resDate.setMilliseconds(dateObj.millisecond || 0)
      return resDate
    } else {
      return new Date(NaN)
    }
  } else {
    return new Date(NaN)
  }
}
/**
 * 把时间对象转换成为字符串
 * @param {date} dateObj 时间对象
 * @param {string} format 字符串格式
 * @return {string} 时间格式化字符串
 * demo1： formatter.formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSSZ')
 * demo2： formatter.formatDate(new Date(), 'yyyy-M-d')
 **/
const formatDate = (dateObj, format) => {
  let dateStr = format.replace(/(yyyy)|(MM)|(M)|(dd)|(d)|(HH)|(H)|(mm)|(m)|(ss)|(s)|(SSS)/g, (field) => {
    switch (field) {
      case 'yyyy':
        return 1900 + dateObj.getYear()
      case 'MM':
        return padZero(dateObj.getMonth() + 1, 2)
      case 'M':
        return dateObj.getMonth() + 1
      case 'dd':
        return padZero(dateObj.getDate(), 2)
      case 'd':
        return dateObj.getDate()
      case 'HH':
        return padZero(dateObj.getHours(), 2)
      case 'H':
        return dateObj.getHours()
      case 'mm':
        return padZero(dateObj.getMinutes(), 2)
      case 'm':
        return dateObj.getMinutes()
      case 'ss':
        return padZero(dateObj.getSeconds(), 2)
      case 's':
        return dateObj.getSeconds()
      case 'SSS':
        return dateObj.getMilliseconds()
    }
  })
  return dateStr
}
const unescapeHtml = (html) => {
  let temp = document.createElement('div')
  temp.innerHTML = html
  return temp.innerText
}
export {
  padZero,
  toDate,
  formatDate,
  unescapeHtml
}