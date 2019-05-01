const sexMapper = (value) => {
  switch (String(value)) {
    case '1':
      return '男'
    case '2':
      return '女'
    default:
      return '未知'
  }
}
export {
  sexMapper
}