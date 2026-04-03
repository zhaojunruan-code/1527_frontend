<template>
  <view class="page">
    <view class="header">
      <wd-navbar fixed placeholder title="我的收藏" left-arrow safeAreaInsetTop @click-left="goBack" />
      <view class="search-wrap">
        <text class="search-icon">🔍</text>
        <input v-model.trim="searchText" type="text" placeholder="搜索收藏的攻略..." class="search-input" />
      </view>
    </view>

    <view class="grid">
      <view v-for="item in favorites" :key="item.id" class="card" @click="viewDetail(item)">
        <image :src="item.img" class="card-img" mode="aspectFill" />
        <view class="card-info">
          <text class="card-title">{{ item.title }}</text>
          <text class="card-time">{{ item.time }}</text>
        </view>
      </view>

      <view v-if="!favorites.length" class="empty-state">
        <text class="empty-text">{{ searchText ? "未找到相关收藏" : "暂无收藏内容" }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getTravelCollectList } from '@/api/travel'
import { useNavStore } from '@/store/useNavStore'

const navStore = useNavStore()
const searchText = ref('')
const favorites = ref([])
const fallbackImage = 'https://picsum.photos/seed/favorite-default/400/300'
let searchTimer = null
let latestRequestId = 0

const parseImageList = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean)
  }

  if (typeof value !== 'string' || !value.trim()) {
    return []
  }

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter(Boolean) : []
  } catch (error) {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
}

const formatCollectTime = (value) => {
  if (!value && value !== 0) {
    return '-'
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number') {
    const date = new Date(String(value).length === 10 ? value * 1000 : value)
    if (Number.isNaN(date.getTime())) {
      return '-'
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return '-'
}

const normalizeFavoriteItem = (item) => {
  const strategy = item.strategy || {}
  const imageList = [
    ...parseImageList(strategy.images),
    ...parseImageList(strategy.images_text),
    ...parseImageList(strategy.bannerimages_list),
    ...parseImageList(strategy.bannerimages),
    ...parseImageList(item.images),
    ...parseImageList(item.images_text),
  ]

  return {
    ...strategy,
    collectId: item.id,
    strategyId: item.strategy_id || strategy.id || '',
    img: strategy.image || imageList[0] || fallbackImage,
    time: formatCollectTime(item.createtime_text || strategy.createtime_text || strategy.publishtime_text || item.createtime || strategy.createtime || strategy.publishtime),
  }
}

const loadFavorites = async () => {
  const requestId = ++latestRequestId
  const response = await getTravelCollectList({
    page: 1,
    rows: 100,
    search: searchText.value.trim(),
  })

  if (response.code !== 200) {
    return
  }

  if (requestId !== latestRequestId) {
    return
  }

  const list = Array.isArray(response.data)
    ? response.data
    : Array.isArray(response.data?.list)
      ? response.data.list
      : []

  favorites.value = list.map(normalizeFavoriteItem)
}

onShow(async () => {
  await loadFavorites()
})

watch(searchText, () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    loadFavorites()
  }, 300)
})

onUnload(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
    searchTimer = null
  }
})

const goBack = () => uni.navigateBack()

const viewDetail = (item) => {
  const strategyId = item.strategyId || item.id
  navStore.setParams(item)
  uni.navigateTo({ url: `/pages/strategy-detail/index?id=${strategyId}` })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f9fafb;
}

.header {
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1rpx solid #f3f4f6;
}

.search-wrap {
  display: flex;
  align-items: center;
  margin: 0 30rpx 20rpx;
  background: #f3f4f6;
  border-radius: 999rpx;
  padding: 16rpx 24rpx;
}

.search-icon {
  font-size: 28rpx;
  margin-right: 12rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  background: transparent;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  padding: 24rpx;
}

.card {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  border: 1rpx solid #f3f4f6;
}

.card-img {
  width: 100%;
  height: 0;
  padding-bottom: 75%;
}

.card-info {
  padding: 16rpx;
  height: 120rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 24rpx;
  font-weight: bold;
  color: #1f2937;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-time {
  font-size: 20rpx;
  color: #9ca3af;
  margin-top: 8rpx;
}

.empty-state {
  grid-column: 1 / -1;
  padding: 200rpx 0;
  text-align: center;
}

.empty-text {
  font-size: 28rpx;
  color: #9ca3af;
}
</style>
