import { request } from "@/http"

/**
 * 微信手机号登录
 */
export function getWechatMobile(params) {
  return request({
    url: "api/index/getWechatMobile",
    method: "GET",
    data: params,
  })
}

/**
 * 微信登陆, 静默登录
 */
/**
 * 微信登陆, 静默登录
 */
export function wechatLogin(params) {
  return request({
    url: "api/index/wechatLogin",
    method: "GET",
    data: params
  });
}
/**
 * 获取并绑定手机号
 * @param params
 * @returns {Promise<*>}
 */
export function wechatMobileBind(params) {
  return request({
    url: "/auth/bindMobile",
    method: "POST",
    data: params,
  })
}

/**
 * 获取字典设置
 */
export function getSimpleDictDataList() {
  return request({
    url: "dict/get",
    method: "post",
  })
}


export const onGetUserInfo = () => {
  return request({
    url: "/system/user/profile",
    method: "get",
  })
}

export const getUserInfo = () => {
  return request({
    url: "/api/user/userinfo",
    method: "get",
  })
}

export const getSiteConfig = () => {
  return request({
    url: "/api/common/siteConfig",
    method: "get",
  })
}

export const getAIGreetingList = () => {
  return request({
    url: "/api/common/aiGreetingList",
    method: "get",
  })
}

export const postEditUserInfo = (data) => {
  return request({
    url: "/api/user/editinfo",
    method: "post",
    data,
  })
}
