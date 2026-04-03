<template>
  <view class="page">
    <view class="swiper-wrap">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <swiper class="swiper" :indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#ffffff" autoplay circular>
        <swiper-item v-for="(img, idx) in detail.images ? JSON.parse(detail.images) : []" :key="idx">
          <image :src="img" mode="aspectFill" class="swiper-img" />
        </swiper-item>
      </swiper>
    </view>

    <view class="content">
      <view class="title-row">
        <text class="title">{{ detail.title || "攻略详情" }}</text>
        <view class="fav-btn" @click="toggleCollect">
          <text :class="['fav-icon', detail.is_collect === 1 ? 'fav-active' : '']">{{ detail.is_collect === 1 ? "♥" : "♡" }}</text>
          <text :class="['fav-text', detail.is_collect === 1 ? 'fav-active' : '']">{{ detail.is_collect === 1 ? "已收藏" : "收藏" }}</text>
        </view>
      </view>
      <text class="pub-time">发布时间: {{ detail.createtime_text || "-" }}</text>

      <view class="location-card" @click="openMap">
        <view class="loc-icon-wrap">
          <AppIcon class="loc-icon" name="map-pin" size="40rpx" color="#a60000" />
        </view>
        <view class="loc-info">
          <text class="loc-name">{{ detail.position || "-" }}</text>
          <text class="loc-hint">点击查看地图及导航</text>
        </view>
      </view>

      <view class="article">
        <rich-text class="article-richtext" :nodes="detail.content || ''" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { getTravelStrategyDetail, postTravelCollectToggle } from "@/api/travel"
import AppIcon from "@/components/AppIcon.vue"
import { useNavStore } from "@/store/useNavStore"
import { useUserStore } from "@/store/useUserStore"

const navStore = useNavStore()
const userStore = useUserStore()
const detail = ref({})
const strategyId = ref("")

const loadDetail = async () => {
  if (!strategyId.value) {
    return
  }

  const response = await getTravelStrategyDetail({ id: strategyId.value })
  if (response.code === 200 && response.data) {
    detail.value = response.data
  }
}

onLoad(async (options) => {
  strategyId.value = options?.id || navStore.params?.id || ""

  if (strategyId.value) {
    await loadDetail()
    return
  }

  detail.value = navStore.params || {}
})

const goBack = () => uni.navigateBack()

const toggleCollect = async () => {
  if (!detail.value.id) {
    return
  }

  if (!userStore.isLogin) {
    uni.navigateTo({
      url: `/pages/login/index?redirect=${encodeURIComponent(`/pages/strategy-detail/index?id=${detail.value.id}`)}`,
    })
    return
  }

  const response = await postTravelCollectToggle({
    strategy_id: detail.value.id,
  })

  if (response.code === 200) {
    uni.showToast({
      title: response.msg || "操作成功",
      icon: "none",
    })
    await loadDetail()
    return
  }

  uni.showToast({
    title: response.msg || "操作失败",
    icon: "none",
  })
}

const openMap = () => {
  navStore.setParams({
    name: detail.value.position,
    address: detail.value.position,
    latitude: Number(detail.value.latitude || 0),
    longitude: Number(detail.value.longitude || 0),
  })
  uni.navigateTo({ url: "/pages/map/index" })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #fff;
  padding-bottom: 40rpx;
}

.swiper-wrap {
  position: relative;
  height: 500rpx;
}

.back-btn {
  position: absolute;
  top: 80rpx;
  left: 30rpx;
  z-index: 10;
  width: 64rpx;
  height: 64rpx;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  color: #fff;
  font-size: 36rpx;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-img {
  width: 100%;
  height: 100%;
}

.content {
  padding: 30rpx;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20rpx;
}

.title {
  font-size: 38rpx;
  font-weight: bold;
  color: #1f2937;
  flex: 1;
}

.fav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding-top: 8rpx;
}

.fav-icon {
  font-size: 44rpx;
  color: #9ca3af;
}

.fav-text {
  font-size: 20rpx;
  color: #9ca3af;
}

.fav-active {
  color: #ef4444 !important;
}

.pub-time {
  font-size: 26rpx;
  color: #6b7280;
  margin-top: 16rpx;
  display: block;
}

.location-card {
  display: flex;
  align-items: center;
  background: #f9fafb;
  padding: 24rpx;
  border-radius: 20rpx;
  margin-top: 30rpx;
  border: 1rpx solid #f3f4f6;
}

.loc-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  background: #fef2f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.loc-icon {
  display: block;
}

.loc-info {
  flex: 1;
}

.loc-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #1f2937;
  display: block;
}

.loc-hint {
  font-size: 24rpx;
  color: #6b7280;
  margin-top: 6rpx;
  display: block;
}

.article {
  margin-top: 40rpx;
}

.article-richtext {
  display: block;
  font-size: 28rpx;
  color: #4b5563;
  line-height: 1.8;
}

.article-richtext :deep(p) {
  display: block;
  margin-bottom: 24rpx;
}
</style>
