<template>
  <view class="page">
    <view class="swiper-wrap">
      <swiper
        class="swiper"
        :indicator-dots="true"
        indicator-active-color="#A60000"
        indicator-color="rgba(255,255,255,0.5)"
        autoplay
        circular
      >
        <swiper-item v-for="(img, idx) in swiperImages" :key="idx">
          <image class="swiper-img" :src="img" mode="aspectFill" />
        </swiper-item>
      </swiper>

      <view class="back-btn" @click="goBack">
        <text class="back-arrow">←</text>
      </view>
    </view>

    <view class="content">
      <text class="title">{{ params.title || "服务详情" }}</text>
      <text class="date">发布时间：{{ params.createtime_text || "-" }}</text>

      <view class="section">
        <text class="section-title">服务介绍</text>
        <rich-text class="desc" :nodes="params.content || ''" />
      </view>

      <view class="section">
        <text class="section-title">服务状态</text>
        <text class="status-text">{{ params.status || "-" }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { getTravelServiceList } from "@/api/travel"
import { useNavStore } from "@/store/useNavStore"

const navStore = useNavStore()
const params = ref({})
const swiperImages = ref([])
const serviceId = ref("")

const setSwiperImages = () => {
  swiperImages.value = params.value.image ? [params.value.image] : []
}

const loadDetail = async () => {
  if (!serviceId.value) {
    return
  }

  const response = await getTravelServiceList()
  if (response.code === 200 && response.data?.list) {
    const current = response.data.list.find((item) => String(item.id) === String(serviceId.value))
    if (current) {
      params.value = current
      setSwiperImages()
    }
  }
}

onLoad(async (options) => {
  serviceId.value = options?.id || navStore.params?.id || ""
  params.value = navStore.params || {}
  setSwiperImages()

  if (!params.value.id && serviceId.value) {
    await loadDetail()
  }
})

const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.swiper-wrap {
  position: relative;
  width: 100%;
  height: 500rpx;
}

.swiper {
  width: 100%;
  height: 500rpx;
}

.swiper-img {
  width: 100%;
  height: 500rpx;
}

.back-btn {
  position: absolute;
  top: 90rpx;
  left: 30rpx;
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.back-arrow {
  color: #ffffff;
  font-size: 36rpx;
  font-weight: bold;
}

.content {
  padding: 30rpx;
  background: #ffffff;
  border-radius: 24rpx 24rpx 0 0;
  margin-top: -24rpx;
  position: relative;
  z-index: 5;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #1a1a1a;
}

.date {
  display: block;
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #9ca3af;
}

.section {
  margin-top: 36rpx;
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20rpx;
}

.desc {
  display: block;
  font-size: 28rpx;
  color: #666666;
  line-height: 1.8;
}

.desc :deep(p) {
  margin: 0 0 16rpx;
}

.status-text {
  display: block;
  font-size: 28rpx;
  color: #1f2937;
  line-height: 1.8;
}
</style>
