function checkEmail(email) {
  // 对电子邮件的验证

  var myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

  if (!myreg.test(email)) {
    return false;
  } else {
    return true;
  }
}

console.log(checkEmail('111@163.com'));
