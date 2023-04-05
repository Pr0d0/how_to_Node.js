const { odd, even } = require('./var'); // require함수 안에 불러올 모듈의 경로.

function checkOddOrEven(num) {
  if (num % 2) { // 홀수이면
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven;