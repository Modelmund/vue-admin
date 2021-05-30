import service from "@/utils/request";
/**
 * 获取验证码
 */
export function getSms(data){
    service.request({
        method: 'POST',
        url: '/getSms/',
        data
    })
}
/**
 * 获取用户信息
 */

/**
 * 获取用户角色
 */

/**
 * 用户登录
 */

/**
 * 用户退出
 */

/**
 * 用户注册
 */