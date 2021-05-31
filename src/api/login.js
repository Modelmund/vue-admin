import service from "@/utils/request";
/**
 * 获取验证码
 */
export function getSms(data) {
  return service.request({
    method: "POST",
    url: "/getSms/",
    data,
  });
}
/**
 * 获取用户角色
 */
export function getUserRole() {
  return service.request({
    method: "post",
    url: "/userRole/ ",
  });
}
/**
 * 用户登录
 */
export function login(data) {
  return service.request({
    method: "POST",
    url: "/login/",
    data,
  });
}
/**
 * 用户退出
 */

/**
 * 用户注册
 */
export function register(data) {
  return service.request({
    method: "POST",
    url: "/register/",
    data,
  });
}
