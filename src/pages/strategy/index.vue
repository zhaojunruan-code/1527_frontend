<template>
  <view class="page">
    <z-paging
      layout-only
      class="strategy-paging"
      :fixed="false"
      :show-scrollbar="false"
      :refresher-enabled="false"
      use-page-scroll
    >
      <template #top>
        <view class="header">
          <view class="header-safe-area" :style="{ height: `${safeAreaTop}px` }" />
          <text class="header-title">游玩攻略</text>
          <view class="search-bar">
            <AppIcon class="search-icon" name="search" size="18" color="#9ca3af" />
            <input
              v-model="searchText"
              class="search-input"
              type="text"
              placeholder="搜索攻略、景点、美食..."
              confirm-type="search"
            />
          </view>
        </view>
      </template>

      <view class="page-content">
        <view class="grid">
          <view
            v-for="item in filteredStrategies"
            :key="item.id"
            class="card"
            @click="goDetail(item)"
          >
            <image class="card-img" :src="item.img" mode="aspectFill" />
            <view class="card-body">
              <text class="card-title">{{ item.title }}</text>
              <text class="card-time">{{ item.time }}</text>
            </view>
          </view>

          <view v-if="filteredStrategies.length === 0" class="empty-state">
            <text class="empty-text">未找到相关攻略</text>
          </view>
        </view>

        <view class="tabbar-spacer" />
      </view>
    </z-paging>

    <CustomTabbar />
  </view>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import CustomTabbar from '@/components/CustomTabbar/index.vue'
import { useNavStore } from '@/store/useNavStore'
import { useTabbarStore } from '@/store/useTabbarStore'

const navStore = useNavStore()
const tabbarStore = useTabbarStore()
const safeAreaTop = ref(0)

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

onMounted(() => {
  const { statusBarHeight } = uni.getSystemInfoSync()
  safeAreaTop.value = statusBarHeight || 0
  tabbarStore.tabbarIndex = 3
})

const filteredStrategies = computed(() => {
  const keyword = searchText.value.trim().toLowerCase()
  if (!keyword) {
    return strategies
  }

  return strategies.filter((item) => {
    return `${item.title} ${item.author}`.toLowerCase().includes(keyword)
  })
})

const goDetail = (item) => {
  navStore.setParams(item)
  uni.navigateTo({ url: '/pages/strategy-detail/index' })
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.strategy-paging {
  height: 100vh;
  background: #f5f5f5;
}

.header {
  background: #a60000;
  padding: 0 30rpx 28rpx;
  border-radius: 0 0 32rpx 32rpx;
  box-shadow: 0 6rpx 18rpx rgba(166, 0, 0, 0.25);
}

.header-safe-area {
  width: 100%;
}

.header-title {
  display: block;
  padding-top: 24rpx;
  padding-bottom: 22rpx;
  color: #ffffff;
  font-size: 38rpx;
  font-weight: 700;
  text-align: center;
}

.search-bar {
  display: flex;
  align-items: center;
  height: 76rpx;
  padding: 0 24rpx;
  border-radius: 999rpx;
  background: #ffffff;
  color: #9ca3af;
  box-shadow: inset 0 2rpx 6rpx rgba(15, 23, 42, 0.05);
}

.search-icon {
  width: 34rpx;
  height: 34rpx;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  margin-left: 12rpx;
  font-size: 26rpx;
  color: #1f2937;
  background: transparent;
}

.page-content {
  padding: 28rpx 24rpx 0;
  box-sizing: border-box;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.card {
  width: calc(50% - 10rpx);
  overflow: hidden;
  border-radius: 14rpx;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4rpx 14rpx rgba(15, 23, 42, 0.04);
  box-sizing: border-box;
}

.card-img {
  width: 100%;
  height: 210rpx;
  display: block;
}

.card-body {
  padding: 16rpx 16rpx 18rpx;
  box-sizing: border-box;
}

.card-title {
  display: -webkit-box;
  overflow: hidden;
  color: #111827;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 1.35;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-time {
  display: block;
  margin-top: 10rpx;
  color: #9ca3af;
  font-size: 20rpx;
}

.empty-state {
  width: 100%;
  min-height: 240rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24rpx;
  background: #ffffff;
}

.empty-text {
  color: #9ca3af;
  font-size: 26rpx;
}

.tabbar-spacer {
  height: 140rpx;
}
</style>
