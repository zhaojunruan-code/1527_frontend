<template>
  <view class="page">
    <wd-navbar fixed placeholder title="个人资料编辑" left-arrow safeAreaInsetTop @click-left="goBack" />

    <view class="body">
      <view class="avatar-card" @click="handleChooseAvatar">
        <view class="avatar-wrap">
          <image :src="avatarPreview" class="avatar-img" mode="aspectFill" />
          
        </view>
        <text class="avatar-hint">{{ uploading ? "头像上传中..." : "点击更换头像" }}</text>
      </view>

      <view class="form-card">
        <view class="form-item">
          <text class="form-label">昵称</text>
          <input v-model.trim="form.nickname" type="text" class="form-input" placeholder="请输入昵称" maxlength="20" />
        </view>

        <view class="form-item">
          <text class="form-label">用户名</text>
          <input v-model.trim="form.username" type="text" class="form-input" placeholder="请输入用户名" maxlength="20" />
        </view>

        <view class="form-item">
          <text class="form-label">手机号</text>
          <text class="form-value">{{ form.mobile || "暂未绑定手机号" }}</text>
        </view>

        <view class="form-item form-item-bio no-border">
          <text class="form-label">个人简介</text>
          <textarea
            v-model.trim="form.bio"
            class="form-textarea"
            placeholder="介绍一下自己吧"
            maxlength="120"
            auto-height
          />
        </view>
      </view>

      <view class="save-btn" :class="{ 'save-btn-disabled': saving || uploading }" @click="handleSave">
        <text class="save-text">{{ saving ? "保存中..." : "保存修改" }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { getUserInfo, postEditUserInfo } from '@/api/common'
import { useUserStore } from '@/store/useUserStore'

const cameraIconSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'/%3E%3Ccircle cx='12' cy='13' r='3'/%3E%3C/svg%3E"
const defaultAvatar = 'https://picsum.photos/seed/user123/100/100'
const uploadUrl = import.meta.env.VITE_UPLOAD_BASEURL || '/api/index/upload'
const userStore = useUserStore()

const createEmptyForm = () => ({
  username: '',
  nickname: '',
  avatar: '',
  bio: '',
  mobile: '',
  token: '',
})

const form = ref(createEmptyForm())
const initialForm = ref(createEmptyForm())
const avatarPreview = ref(defaultAvatar)
const saving = ref(false)
const uploading = ref(false)

const resolveAssetUrl = (value) => {
  const asset = String(value || '').trim()
  if (!asset) {
    return defaultAvatar
  }

  if (/^(https?:)?\/\//.test(asset) || asset.startsWith('data:')) {
    return asset
  }

  const baseUrl = String(import.meta.env.VITE_SERVER_BASEURL || '').replace(/\/+$/, '')
  if (!baseUrl) {
    return asset
  }

  return `${baseUrl}/${asset.replace(/^\/+/, '')}`
}

const normalizeUserInfo = (value = {}) => ({
  ...value,
  phone: value.phone || value.mobile || '',
  mobile: value.mobile || value.phone || '',
  bio: value.bio || '',
})

const applyUserInfo = (value = {}) => {
  const normalizedUserInfo = normalizeUserInfo(value)

  form.value = {
    ...form.value,
    username: normalizedUserInfo.username || '',
    nickname: normalizedUserInfo.nickname || '',
    avatar: normalizedUserInfo.avatar || '',
    bio: normalizedUserInfo.bio || '',
    mobile: normalizedUserInfo.mobile || '',
    token: normalizedUserInfo.token || '',
  }

  initialForm.value = {
    ...form.value,
  }

  avatarPreview.value = resolveAssetUrl(normalizedUserInfo.avatar)

  userStore.setUserInfo(normalizedUserInfo)
  if (normalizedUserInfo.token) {
    userStore.setToken(normalizedUserInfo.token)
  }
}

const loadUserProfile = async () => {
  const response = await getUserInfo()
  const rawUserInfo = response.data?.userinfo || response.data

  if (response.code === 200 && rawUserInfo) {
    applyUserInfo(rawUserInfo)
  }
}

const buildPayload = () => {
  const payload = {}
  const fields = ['username', 'nickname', 'avatar', 'bio']

  fields.forEach((field) => {
    const currentValue = String(form.value[field] || '')
    const initialValue = String(initialForm.value[field] || '')

    if (currentValue !== initialValue) {
      payload[field] = currentValue
    }
  })

  return payload
}

const handleChooseAvatar = async () => {
  if (uploading.value) {
    return
  }

  try {
    const chooseResult = await uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    })

    const filePath = chooseResult.tempFilePaths?.[0]
    if (!filePath) {
      return
    }

    uploading.value = true
    uni.showLoading({
      title: '上传中',
      mask: true,
    })

    const uploadResult = await uni.uploadFile({
      url: uploadUrl,
      filePath,
      name: 'file',
    })

    const uploadData = JSON.parse(uploadResult.data || '{}')
    const avatarUrl = uploadData?.data?.url || ''
    const avatarFullUrl = uploadData?.data?.fullurl || avatarUrl

    if (!avatarUrl) {
      uni.showToast({ title: uploadData?.msg || '上传失败', icon: 'none' })
      return
    }

    form.value.avatar = avatarUrl
    avatarPreview.value = avatarFullUrl || resolveAssetUrl(avatarUrl)
  } catch (error) {
    if (error?.errMsg?.includes('cancel')) {
      return
    }

    uni.showToast({ title: error?.message || '上传失败', icon: 'none' })
  } finally {
    uploading.value = false
    uni.hideLoading()
  }
}

const goBack = () => uni.navigateBack()

const handleSave = async () => {
  if (saving.value || uploading.value) {
    return
  }

  const payload = buildPayload()
  if (!Object.keys(payload).length) {
    uni.showToast({ title: '未检测到修改', icon: 'none' })
    return
  }

  saving.value = true
  uni.showLoading({
    title: '保存中',
    mask: true,
  })

  try {
    const response = await postEditUserInfo(payload)
    const rawUserInfo = response.data?.userinfo

    if (response.code === 200 && rawUserInfo) {
      applyUserInfo(rawUserInfo)
      uni.showToast({ title: response.msg || '保存成功', icon: 'success' })
      setTimeout(() => {
        uni.navigateBack()
      }, 800)
      return
    }

    uni.showToast({ title: response.msg || '保存失败', icon: 'none' })
  } catch (error) {
    uni.showToast({ title: error?.message || '保存失败', icon: 'none' })
  } finally {
    saving.value = false
    uni.hideLoading()
  }
}

onLoad(async () => {
  await loadUserProfile()
})
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f9fafb;
}

.body {
  padding: 24rpx;
}

.avatar-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 48rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1rpx solid #f3f4f6;
  margin-bottom: 24rpx;
}

.avatar-wrap {
  position: relative;
  width: 160rpx;
  height: 160rpx;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.camera-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 52rpx;
  height: 52rpx;
  background: #a60000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4rpx solid #fff;
  box-sizing: border-box;
}

.camera-icon {
  width: 24rpx;
  height: 24rpx;
  display: block;
}

.avatar-hint {
  font-size: 24rpx;
  color: #9ca3af;
  margin-top: 16rpx;
}

.form-card {
  background: #fff;
  border-radius: 20rpx;
  border: 1rpx solid #f3f4f6;
  overflow: hidden;
  margin-bottom: 40rpx;
}

.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  padding: 28rpx 30rpx;
  border-bottom: 1rpx solid #f9fafb;
}

.form-item-bio {
  align-items: flex-start;
}

.no-border {
  border-bottom: none;
}

.form-label {
  width: 160rpx;
  flex-shrink: 0;
  font-size: 28rpx;
  color: #374151;
  line-height: 1.6;
}

.form-input {
  flex: 1;
  text-align: right;
  font-size: 28rpx;
  color: #1f2937;
}

.form-value {
  flex: 1;
  text-align: right;
  font-size: 28rpx;
  color: #6b7280;
}

.form-textarea {
  flex: 1;
  min-height: 140rpx;
  text-align: right;
  font-size: 28rpx;
  color: #1f2937;
  line-height: 1.6;
}

.save-btn {
  background: #a60000;
  border-radius: 999rpx;
  padding: 24rpx;
  text-align: center;
}

.save-btn-disabled {
  background: #d1d5db;
}

.save-text {
  color: #fff;
  font-size: 30rpx;
  font-weight: 500;
}
</style>
