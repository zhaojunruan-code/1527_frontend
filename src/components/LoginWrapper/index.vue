<template>
  <view class="login-btn" @click="handleOpenLogin">
    <slot></slot>
  </view>

  <wd-popup
    v-if="loginShow"
    v-model="loginShow"
    position="bottom"
    :closable="true"
    :z-index="100000000"
    :safe-area-inset-bottom="false"
  >
    <view class="login-box">
      <view class="auth_content">
        <view class="auth_top">
          <view class="ptitle">
            <text>获取您的</text>
            <text v-if="type === 1">昵称、头像</text>
            <text v-else>手机号</text>
          </view>
          <view class="txt">
            <text>获取用户</text>
            <text v-if="type === 1">昵称、头像</text>
            <text v-else>手机号</text>
            <text>信息，用于完善资料，提供更好的体验</text>
          </view>
        </view>

        <view v-if="type === 1">
          <view class="auth_ul">
            <view class="auth_li">
              <view class="tit">头像</view>
              <view class="rit">
                <button
                  class="avatar-wrapper"
                  open-type="chooseAvatar"
                  @chooseavatar="onChooseAvatar"
                >
                  <image :src="form.avatar_fullurl" class="avatar"></image>
                </button>
              </view>
            </view>

            <view class="auth_li">
              <view class="tit">昵称</view>
              <view class="rit">
                <input
                  :value="form.nick_name"
                  class="weui-input"
                  placeholder="请输入昵称"
                  type="nickname"
                  @blur="onNickName"
                />
              </view>
            </view>
          </view>
          <view class="confirm_btn" @tap.stop="wxGetUserProfile">确定</view>
        </view>

        <button
          v-if="type === 2"
          class="confirm_btn"
          open-type="getPhoneNumber"
          @getphonenumber="onGetPhoneNumber"
        >
          {{ silentLoginLoading ? "登录准备中..." : "手机号授权登录" }}
        </button>
      </view>
    </view>
  </wd-popup>
</template>

<script setup>
import { onMounted } from "vue"
import { getWechatMobile, wechatLogin } from "@/api/common"
import { useTabbarStore } from "@/store/useTabbarStore"
import { useUserStore } from "@/store/useUserStore"

defineOptions({ name: "LoginWrapper" })

const props = defineProps({
  agreement: { type: [Boolean, String], default: false },
  loginType: { type: Number, default: 1 },
  redirectUrl: { type: String, default: "" },
  autoSilentLogin: { type: Boolean, default: false },
  autoOpenPhoneAuth: { type: Boolean, default: false },
})

const { agreement, loginType, redirectUrl, autoSilentLogin, autoOpenPhoneAuth } = toRefs(props)
const type = ref(loginType.value)
const loginShow = ref(false)
const silentLoginLoading = ref(false)
const form = ref({
  avatar_url: "",
  avatar_fullurl: "",
  nick_name: "",
  phone: "",
  code: "",
})
const uploadUrl = import.meta.env.VITE_UPLOAD_BASEURL || "/api/index/upload"
const tabbarStore = useTabbarStore()
const userStore = useUserStore()

const getMiniProgramAppId = () => {
  // #ifdef MP-WEIXIN
  try {
    const accountInfo = uni.getAccountInfoSync?.()
    return accountInfo?.miniProgram?.appId || ""
  } catch (error) {
    return ""
  }
  // #endif

  // #ifndef MP-WEIXIN
  return ""
  // #endif
}

const ensureValidWechatAppId = (showToast = true) => {
  // #ifdef MP-WEIXIN
  const appId = getMiniProgramAppId()
  if (!appId || appId === "touristappid") {
    if (showToast) {
      uni.showToast({
        title: "当前是 touristappid，需用真实小程序 appid 运行微信登录",
        icon: "none",
        duration: 3000,
      })
    }
    return false
  }
  // #endif

  return true
}

const goAfterLogin = async () => {
  tabbarStore.tabbarIndex = 0
  await uni.reLaunch({ url: redirectUrl.value || "/pages/home/index" })
}

const ensureSilentLogin = async (showInvalidAppIdToast = true) => {
  if (silentLoginLoading.value) {
    return false
  }

  if (!ensureValidWechatAppId(showInvalidAppIdToast)) {
    return false
  }

  if (userStore.getToken) {
    return true
  }

  silentLoginLoading.value = true
  uni.showLoading({
    title: "登录准备中",
    mask: true,
  })

  try {
    const { code } = await uni.login()
    form.value.code = code

    const response = await wechatLogin({ code })
    if (response.code === 200) {
      userStore.setToken(response.data?.token || response.data?.access_token)
      userStore.setUserInfo(response.data || {})
      return true
    }

    uni.showToast({
      title: response.msg || "静默登录失败",
      icon: "none",
    })
    return false
  } catch (error) {
    uni.showToast({
      title: error?.message || "静默登录失败",
      icon: "none",
    })
    return false
  } finally {
    silentLoginLoading.value = false
    uni.hideLoading()
  }
}

const handleOpenLogin = async () => {
  if (!agreement.value) {
    uni.showToast({ title: "请先同意用户协议", icon: "none" })
    return
  }

  if (type.value === 2) {
    const success = await ensureSilentLogin()
    if (!success) {
      return
    }
  }

  loginShow.value = true
}

const onChooseAvatar = async (e) => {
  uni.uploadFile({
    url: uploadUrl,
    filePath: e.detail.avatarUrl,
    name: "file",
    success: (response) => {
      const r = JSON.parse(response.data)
      form.value.avatar_url = r.data.url
      form.value.avatar_fullurl = r.data.fullurl
    },
    fail: (error) => {
      console.log("error: ", error)
    },
  })
}

const onNickName = (e) => {
  form.value.nick_name = e.detail.value
}

const onGetPhoneNumber = async (e) => {
  if (!agreement.value) {
    return uni.showToast({ title: "请先授权登录", icon: "error" })
  }

  if (e.detail.errMsg !== "getPhoneNumber:ok") return

  const silentLoginSuccess = await ensureSilentLogin()
  if (!silentLoginSuccess) {
    return
  }

  try {
    const { code } = await uni.login()
    const response = await getWechatMobile({
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      code,
    })

    if (response.code === 200) {
      userStore.setToken(response.data?.token || response.data?.access_token)
      userStore.setUserInfo(response.data || {})
      loginShow.value = false
      await goAfterLogin()
      return
    }

    uni.showToast({
      title: response.msg || "登录失败",
      icon: "none",
    })
  } catch (error) {
    console.error(error)
    uni.showToast({
      title: error?.message || "登录失败",
      icon: "none",
    })
  }
}

const wxGetUserProfile = async () => {
  if (!agreement.value) {
    return uni.showToast({ title: "请先授权登录", icon: "error" })
  }
  if (!form.value.nick_name) {
    return uni.showToast({ title: "请输入昵称", icon: "error" })
  }

  try {
    const { code } = await uni.login()
    form.value.code = code

    const response = await wechatLogin({
      code,
      nick_name: decodeURIComponent(form.value.nick_name),
      avatar_url: decodeURIComponent(form.value.avatar_url),
    })

    if (response.code === 200) {
      userStore.setToken(response.data?.token || response.data?.access_token)
      userStore.setUserInfo(response.data || {})
      type.value = 2
      return
    }

    await uni.showToast({ title: response.msg, icon: "error" })
  } catch (error) {
    await uni.showToast({ title: error.message, icon: "error" })
  }
}

onMounted(async () => {
  if (!autoSilentLogin.value || type.value !== 2) {
    return
  }

  const success = await ensureSilentLogin(false)
  if (success && autoOpenPhoneAuth.value) {
    loginShow.value = true
  }
})
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  padding: 0;

  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: #dadada;
  }
}

.login-box {
  width: 100%;

  &.show {
    bottom: 0;

    .mask {
      display: block;
    }
  }

  .mask {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    display: none;
    z-index: 98;
  }

  .auth_content {
    padding: 32rpx;
    position: relative;
    z-index: 99;
    background: #fff;
    border-radius: 16rpx 16rpx 0 0;

    .auth_top {
      .ptitle {
        font-size: 30rpx;
        font-weight: bold;
        margin-bottom: 24rpx;
      }

      .txt {
        font-size: 26rpx;
        color: #999;
      }

      .close {
        position: absolute;
        right: 0;
        top: 0;
        width: 26rpx;
        height: 26rpx;
      }
    }

    .auth_ul {
      margin-top: 16rpx;

      .auth_li {
        display: flex;
        align-items: center;
        border-top: 1px solid #f5f5f5;
        padding: 24rpx 0;

        &:last-child {
          border-bottom: 1px solid #f5f5f5;
        }

        .tit {
          width: 140rpx;
          font-size: 30rpx;
        }

        .rit {
          input {
            font-size: 28rpx;
            width: 100%;
          }

          button {
            width: 100%;
            background: #fff;
          }

          button:after {
            border: none;
          }
        }
      }
    }

    .confirm_btn {
      width: 420rpx;
      margin: 46rpx auto 0;
      background: #39b54a;
      color: #fff;
      border-radius: 8rpx;
      height: 94rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30rpx;
    }
  }
}
</style>
