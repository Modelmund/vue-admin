/**
 * 过滤特殊字符
 * @param {*} str
 * @returns
 */
export function stripScript(str) {
  let pattern = new RegExp(
    "[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“’。，、？]"
  );
  let rs = "";
  for (let i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 邮箱格式验证
 * @param {*} value 
 * @returns 
 */
export function validateEmail(value){
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value) ? true : false;
}

/**
 * 密码格式验证
 * @param {*} value 
 * @returns 
 */
export function validatePass(value){
    const reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value) ? true : false;
}

/**
 * 验证码格式验证
 * @param {*} value 
 * @returns 
 */
export function validateCode(value){
    const reg = /^[a-zA-Z0-9]{6}$/;
    return !reg.test(value) ? true : false;
}