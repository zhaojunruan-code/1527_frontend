import { useUserStore } from "@/store/useUserStore"
import { objectToQueryParams, useNavigate } from "@/hooks/useNavigate"

const showErrorToast = (message = "请求错误") => {
  uni.showToast({
    icon: "none",
    title: message,
  })
}

export const http = (options) =>
  new Promise((resolve, reject) => {
    const userStore = useUserStore()

    uni.request({
      ...options,
      dataType: "json",
      // #ifndef MP-WEIXIN
      responseType: "json",
      // #endif
      success(res) {
        const { statusCode, data } = res
        if (data?.code === 401) {
          userStore.clearUserInfo()
          useNavigate("/pages/login/index")
          reject(data)
        } else if (statusCode >= 200 && statusCode < 300) {
          resolve(data)
        } else if (statusCode === 401) {
          userStore.clearUserInfo()
          useNavigate("/pages/login/index")
          reject(res)
        } else {
          if (!options.hideErrorToast) {
            showErrorToast(data?.msg || "请求错误")
          }
          reject(res)
        }
      },
      fail(err) {
        showErrorToast("网络错误，换个网络试试")
        reject(err)
      },
    })
  })

export const httpGet = (url, data = {}, options = {}) => http({ ...options, url, data, method: "GET" })

export const httpPost = (url, data, options = {}) => http({ ...options, url, data, method: "POST" })

export const httpPut = (url, data, options = {}) => http({ ...options, url, data, method: "PUT" })

export const httpDelete = (url, data = {}, options = {}) => {
  const queryParams = objectToQueryParams(data)
  const finalUrl = queryParams ? `${url}?${queryParams}` : url
  return http({ ...options, url: finalUrl, method: "DELETE" })
}

export const request = (option) => {
  const { method = "GET", url: requestUrl, data, ...rest } = option
  let url = requestUrl

  if (!url.startsWith("/")) {
    url = "/" + url
  }
  url = url.replace(/\/+/g, "/")

  switch (method.toLowerCase()) {
    case "get":
      return httpGet(url, data, rest)
    case "post":
      return httpPost(url, data, rest)
    case "put":
      return httpPut(url, data, rest)
    case "delete":
      return httpDelete(url, data, rest)
    default:
      throw new Error(`不支持的请求方法: ${method}`)
  }
}
