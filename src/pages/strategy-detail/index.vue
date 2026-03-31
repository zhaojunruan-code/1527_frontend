<template>
  <view class="page">
    <!-- Image Swiper -->
    <view class="swiper-wrap">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <swiper class="swiper" :indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#ffffff" autoplay circular>
        <swiper-item v-for="(img, idx) in images" :key="idx">
          <image :src="img" mode="aspectFill" class="swiper-img" />
        </swiper-item>
      </swiper>
    </view>

    <!-- Content -->
    <view class="content">
      <view class="title-row">
        <text class="title">{{ detail.title || '攻略详情' }}</text>
        <view class="fav-btn" @click="isFavorite = !isFavorite">
          <text :class="['fav-icon', isFavorite ? 'fav-active' : '']">{{ isFavorite ? '❤' : '♡' }}</text>
          <text :class="['fav-text', isFavorite ? 'fav-active' : '']">{{ isFavorite ? '已收藏' : '收藏' }}</text>
        </view>
      </view>
      <text class="pub-time">发布时间: {{ detail.time || '2026-03-20' }}</text>

      <!-- Location -->
      <view class="location-card" @click="openMap">
        <view class="loc-icon-wrap">
          <text class="loc-icon">📍</text>
        </view>
        <view class="loc-info">
          <text class="loc-name">{{ locationName }}</text>
          <text class="loc-hint">点击查看地图及导航</text>
        </view>
      </view>

      <!-- Article -->
      <view class="article">
        <text class="article-p">
          潮汕地区，以其独特的文化和美食闻名遐迩。来到这里，你不仅能品尝到令人垂涎欲滴的牛肉火锅、卤鹅和各种粿品，还能感受到浓厚的历史底蕴。
        </text>
        <text class="article-p">
          如果是为了看英歌舞而来，建议提前查好演出时间表。英歌舞通常在逢年过节或者重大庆典时表演，气势磅礴，极具阳刚之气，被誉为"中华战舞"。现场观看的震撼力是视频里无法体会到的。
        </text>
        <text class="article-p">
          除了看表演，古城的Citywalk也是必不可少的。穿梭在牌坊街，两旁是古色古香的骑楼，耳边是悠扬的潮剧，仿佛穿越回了古代。记得去开元寺感受一下宁静，去广济桥看看"过河拆桥"的奇景。
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useNavStore } from '@/store/useNavStore'

const navStore = useNavStore()
const detail = ref({})
const isFavorite = ref(false)

const images = computed(() => [
  detail.value.img || 'https://picsum.photos/seed/st1/400/300',
  'https://picsum.photos/seed/st2/400/300',
  'https://picsum.photos/seed/st3/400/300'
])

const locationName = computed(() => {
  if (detail.value.title && detail.value.title.includes('英歌')) return '普宁市流沙广场'
  return '潮州古城牌坊街'
})

onLoad(() => {
  detail.value = navStore.params || {}
})

const goBack = () => uni.navigateBack()

const openMap = () => {
  navStore.setParams({ name: locationName.value, address: `广东省${locationName.value}附近` })
  uni.navigateTo({ url: '/pages/map/index' })
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
  background: rgba(0,0,0,0.3);
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
  font-size: 36rpx;
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
.article-p {
  font-size: 28rpx;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 24rpx;
  display: block;
}
</style>
