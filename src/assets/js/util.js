// 倒计时方法
export function leftTimer (end, start) {
  let timeArr = []
  let leftTime = end - start // 计算剩余的毫秒数
  let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
  let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
  let minutes = parseInt(leftTime / 1000 / 60 % 60, 10) // 计算剩余的分钟
  let seconds = parseInt(leftTime / 1000 % 60, 10) // 计算剩余的秒数
  days = checkTime(days)
  hours = checkTime(hours)
  minutes = checkTime(minutes)
  seconds = checkTime(seconds)
  timeArr.push(days, hours, minutes, seconds)
  return timeArr
}

function checkTime (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

// 业务中通过小数点截取整数和小数
export function interception (num) {
  if (String(num).indexOf('.')) {
    return (num.split('.'))
  } else {
    num.toFixed(4)
    return (num.split('.'))
  }
}
