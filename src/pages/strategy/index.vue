<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <text class="header-title">游玩攻略</text>
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          type="text"
          placeholder="搜索攻略、景点、美食..."
          placeholder-style="color: #999"
          :value="searchText"
          @input="searchText = $event.detail.value"
        />
      </view>
    </view>

    <!-- Strategy Grid -->
    <view class="grid">
      <view
        class="card"
        v-for="item in strategies"
        :key="item.id"
        @click="goDetail(item)"
      >
        <image class="card-img" :src="item.img" mode="aspectFill" />
        <view class="card-body">
          <text class="card-title">{{ item.title }}</text>
          <text class="card-time">{{ item.time }}</text>
        </view>
      </view>
    </view>

    <!-- Bottom spacing for tabbar -->
    <view style="height: 120rpx" />

    <CustomTabbar />
  </view>
</template>

<script setup>
import { useNavStore } from '@/store/useNavStore'

const navStore = useNavStore()

const searchText = ref('')

const strategies = [
  {
    id: 1,
    title: '2026潮汕英歌舞观看指南：时间与地点全揭秘',
    time: '2026-03-20',
    author: '潮汕文旅局',
    views: '1.2w',
    img: 'https://picsum.photos/seed/yingge1/400/300',
  },
  {
    id: 2,
    title: '潮汕牛肉火锅哪家强？本地人吐血推荐',
    time: '2026-03-18',
    author: '吃货小分队',
    views: '8500',
    img: 'https://picsum.photos/seed/beef1/400/300',
  },
  {
    id: 3,
    title: '南澳岛两日游保姆级攻略，看最美日落',
    time: '2026-03-15',
    author: '旅行达人阿星',
    views: '2.1w',
    img: 'https://picsum.photos/seed/nanao1/400/300',
  },
  {
    id: 4,
    title: '潮州古城Citywalk路线，穿越千年时光',
    time: '2026-03-10',
    author: '古建爱好者',
    views: '5400',
    img: 'https://picsum.photos/seed/chaozhou1/400/300',
  },
  {
    id: 5,
    title: '揭阳进贤门夜景打卡，周边小吃一网打尽',
    time: '2026-03-05',
    author: '揭阳土著',
    views: '3200',
    img: 'https://picsum.photos/seed/jieyang1/400/300',
  },
]

const goDetail = (item) => {
  navStore.setParams(item)
  uni.navigateTo({ url: '/pages/strategy-detail/index' })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: #a60000;
  padding-top: env(safe-area-inset-top);
  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-bottom: 24rpx;
  position: sticky;
  top: 0;
  z-index: 40;
}

.header-title {
  display: block;
  color: #ffffff;
  font-size: 38rpx;
  font-weight: bold;
  text-align: center;
  padding-top: 24rpx;
  padding-bottom: 20rpx;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 100rpx;
  padding: 0 24rpx;
  height: 72rpx;
}

.search-icon {
  font-size: 28rpx;
  margin-right: 12rpx;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #333333;
  height: 72rpx;
  line-height: 72rpx;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx;
  gap: 16rpx;
}

.card {
  width: calc(50% - 8rpx);
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  border: 1rpx solid #f0f0f0;
}

.card-img {
  width: 100%;
  height: 0;
  padding-bottom: 75%;
}

.card-body {
  padding: 16rpx 20rpx;
  height: 120rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 26rpx;
  font-weight: bold;
  color: #333333;
  line-height: 1.4;
}

.card-time {
  font-size: 22rpx;
  color: #999999;
  margin-top: 8rpx;
}
</style>
