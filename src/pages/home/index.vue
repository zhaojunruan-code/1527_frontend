<template>
  <view class="page">
    <z-paging
      layout-only
      class="home-paging"
      :fixed="false"
      :show-scrollbar="false"
      :refresher-enabled="false"
      use-page-scroll
    >
      <template #top>
        <view class="header">
          <image class="header-bg-image" src="/static/images/home-top-bg.png" mode="scaleToFill" />
          <view class="header-content">
            <view class="header-safe-area" :style="{ height: `${safeAreaTop}px` }" />
            <view class="header-inner">
              <image class="header-logo" :src="projectLogo" mode="aspectFit" />
              <text class="header-title">潮游记</text>
            </view>
            <view class="search-bar">
              <view class="search-icon-wrap" @click="handleSearch">
                <AppIcon class="search-icon" name="search" size="18" color="#9ca3af" />
              </view>
              <input
                v-model.trim="searchText"
                class="search-input"
                type="text"
                placeholder="搜索服务、潮汕攻略..."
                confirm-type="search"
                @confirm="handleSearch"
              />
              <text v-if="searchText" class="search-clear" @click="clearSearch">清空</text>
            </view>
          </view>
        </view>
      </template>

      <view class="page-content">
        <view v-if="homeData.banner_list.length" class="content-block">
          <view class="banner-wrap">
            <swiper
              class="banner-swiper"
              :indicator-dots="true"
              indicator-active-color="#A60000"
              indicator-color="rgba(255,255,255,0.5)"
              autoplay
              circular
            >
              <swiper-item v-for="item in homeData.banner_list" :key="item.id">
                <image class="banner-img" :src="item.image" mode="aspectFill" />
              </swiper-item>
            </swiper>
          </view>
        </view>

        <view class="grid-section">
          <view v-for="item in gridItems" :key="item.label" class="grid-item" @click="item.action">
            <view class="grid-icon-wrap">
              <HomeShortcutIcon :name="item.iconName" />
            </view>
            <text class="grid-label">{{ item.label }}</text>
          </view>
        </view>

        <view class="content-block section-block">
          <view class="section-header">
            <view class="section-title-wrap">
              <text class="section-title">{{ serviceSectionTitle }}</text>
            </view>
            <view class="section-more-wrap" @click="goServiceList">
              <text class="section-more">更多</text>
              <wd-icon name="arrow-right" size="24rpx" color="#6b7280" />
            </view>
          </view>
          <scroll-view v-if="homeData.service_list.length" scroll-x class="service-scroll" show-scrollbar="false">
            <view class="service-scroll-inner">
              <view v-for="item in homeData.service_list" :key="item.id" class="service-card" @click="goServiceDetail(item)">
                <image class="service-img" :src="item.image" mode="aspectFill" />
                <view class="service-info">
                  <text class="service-title">{{ item.title }}</text>
                  <rich-text class="service-content" :nodes="item.content" />
                </view>
              </view>
            </view>
          </scroll-view>
          <view v-else class="empty-card">
            <text class="empty-text">{{ emptyServiceText }}</text>
          </view>
        </view>

        <view class="content-block section-block" style="padding-bottom: 40rpx;">
          <view class="section-header">
            <view class="section-title-wrap">
              <text class="section-title">{{ strategySectionTitle }}</text>
            </view>
            <view class="section-more-wrap" @click="goStrategyTab">
              <text class="section-more">更多</text>
              <wd-icon name="arrow-right" size="24rpx" color="#6b7280" />
            </view>
          </view>
          <view v-if="homeData.strategy_list.length" class="strategy-grid">
            <view v-for="item in homeData.strategy_list" :key="item.id" class="strategy-card" @click="goStrategyDetail(item)">
              <image class="strategy-img" :src="item.images_text?.[0] || ''" mode="aspectFill" />
              <view class="strategy-info">
                <text class="strategy-title">{{ item.title }}</text>
                <text class="strategy-time">{{ item.position }}</text>
              </view>
            </view>
          </view>
          <view v-else class="empty-card">
            <text class="empty-text">{{ emptyStrategyText }}</text>
          </view>
        </view>

        <view class="tabbar-spacer" />
      </view>
    </z-paging>

    <CustomTabbar />
  </view>
</template>

<script setup>
import { getTravelHome, getTravelServiceList, getTravelStrategyList } from "@/api/travel"
import AppIcon from "@/components/AppIcon.vue"
import CustomTabbar from "@/components/CustomTabbar/index.vue"
import HomeShortcutIcon from "@/components/HomeShortcutIcon.vue"
import { useNavStore } from "@/store/useNavStore"
import { useSiteConfigStore } from "@/store/useSiteConfigStore"
import { useTabbarStore } from "@/store/useTabbarStore"
import { DEFAULT_PROJECT_LOGO } from "@/utils/siteConfig"

const navStore = useNavStore()
const siteConfigStore = useSiteConfigStore()
const tabbarStore = useTabbarStore()

const safeAreaTop = ref(0)
const searchText = ref("")
const latestSearchId = ref(0)
const homeData = ref({
  banner_list: [],
  service_list: [],
  strategy_list: [],
})

const projectLogo = computed(() => siteConfigStore.logoUrl || DEFAULT_PROJECT_LOGO)
const trimmedKeyword = computed(() => searchText.value.trim())
const serviceSectionTitle = computed(() => trimmedKeyword.value ? "服务搜索结果" : "推荐服务")
const strategySectionTitle = computed(() => trimmedKeyword.value ? "攻略搜索结果" : "潮汕攻略")
const emptyServiceText = computed(() => trimmedKeyword.value ? "未找到相关服务" : "暂无服务数据")
const emptyStrategyText = computed(() => trimmedKeyword.value ? "未找到相关攻略" : "暂无攻略数据")

const normalizeListData = (response) => {
  if (Array.isArray(response?.data)) {
    return {
      list: response.data,
      total: response.data.length,
    }
  }

  return {
    list: Array.isArray(response?.data?.list) ? response.data.list : [],
    total: Number(response?.data?.total) || 0,
  }
}

const loadHome = async () => {
  const response = await getTravelHome()
  if (response.code === 200 && response.data) {
    homeData.value = {
      banner_list: Array.isArray(response.data.banner_list) ? response.data.banner_list : [],
      service_list: Array.isArray(response.data.service_list) ? response.data.service_list : [],
      strategy_list: Array.isArray(response.data.strategy_list) ? response.data.strategy_list : [],
    }
  }
}

const loadSearchResults = async (keyword) => {
  const requestId = Date.now()
  latestSearchId.value = requestId

  uni.showLoading({
    title: "搜索中...",
    mask: true,
  })

  try {
    const [serviceResponse, strategyResponse] = await Promise.all([
      getTravelServiceList({
        page: 1,
        rows: 50,
        keywords: keyword,
      }),
      getTravelStrategyList({
        page: 1,
        rows: 50,
        keywords: keyword,
      }),
    ])

    if (latestSearchId.value !== requestId) {
      return
    }

    const nextServiceData = serviceResponse.code === 200 ? normalizeListData(serviceResponse) : { list: [], total: 0 }
    const nextStrategyData = strategyResponse.code === 200 ? normalizeListData(strategyResponse) : { list: [], total: 0 }

    homeData.value = {
      ...homeData.value,
      service_list: nextServiceData.list,
      strategy_list: nextStrategyData.list,
    }
  } finally {
    if (latestSearchId.value === requestId) {
      uni.hideLoading()
    }
  }
}

const handleSearch = async () => {
  const keyword = trimmedKeyword.value
  if (!keyword) {
    await loadHome()
    return
  }

  await loadSearchResults(keyword)
}

const clearSearch = async () => {
  searchText.value = ""
  latestSearchId.value = 0
  await loadHome()
}

onMounted(async () => {
  const { statusBarHeight } = uni.getSystemInfoSync()
  safeAreaTop.value = statusBarHeight || 0
  tabbarStore.tabbarIndex = 0
  await Promise.allSettled([loadHome(), siteConfigStore.loadSiteConfig()])
})

const goMainTab = (id, path) => {
  tabbarStore.handleChangeTabbar({ id, path })
}

const gridItems = [
  { iconName: "car", label: "旅游包车", action: () => goMainTab(1, "/pages/service/index") },
  { iconName: "guide", label: "潮汕导游", action: () => goMainTab(1, "/pages/service/index") },
  { iconName: "strategy", label: "潮汕攻略", action: () => goMainTab(3, "/pages/strategy/index") },
  { iconName: "orders", label: "我的订单", action: () => goMainTab(4, "/pages/profile/index") },
  { iconName: "service", label: "在线客服", action: () => uni.navigateTo({ url: "/pages/chat/index" }) },
  { iconName: "ai", label: "智能助手", action: () => goMainTab(2, "/pages/ai/index") },
]

const goServiceList = () => {
  const keyword = trimmedKeyword.value
  const url = keyword
    ? `/pages/service-list/index?keywords=${encodeURIComponent(keyword)}`
    : "/pages/service-list/index"
  uni.navigateTo({ url })
}

const goServiceDetail = (item) => {
  navStore.setParams(item)
  uni.navigateTo({ url: `/pages/service-detail/index?id=${item.id}` })
}

const goStrategyTab = () => {
  const keyword = trimmedKeyword.value
  const path = keyword
    ? `/pages/strategy/index?keywords=${encodeURIComponent(keyword)}`
    : "/pages/strategy/index"
  goMainTab(3, path)
}

const goStrategyDetail = (item) => {
  uni.navigateTo({ url: `/pages/strategy-detail/index?id=${item.id}` })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.home-paging {
  height: 100vh;
  background: #f5f5f5;
}

.header {
  background: #a60000;
  min-height: 248rpx;
  border-radius: 0 0 32rpx 32rpx;
  position: relative;
  z-index: 40;
  box-shadow: 0 4rpx 16rpx rgba(166, 0, 0, 0.3);
  overflow: hidden;
}

.header-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.header-content {
  position: relative;
  z-index: 1;
  padding: 0 30rpx 30rpx;
}

.header-safe-area {
  width: 100%;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 10rpx;
  padding-top: 24rpx;
  margin-bottom: 24rpx;
}

.header-logo {
  width: 52rpx;
  height: 52rpx;
  flex-shrink: 0;
}

.header-title {
  font-family: Source Han Sans;
  font-size: 18px;
  font-weight: 500;
  color: #fed36d;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 100rpx;
  padding: 16rpx 24rpx;
  box-shadow: inset 0 2rpx 6rpx rgba(0, 0, 0, 0.06);
}

.search-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
}

.search-icon {
  width: 34rpx;
  height: 34rpx;
  display: block;
}

.search-input {
  flex: 1;
  margin-left: 12rpx;
  font-size: 28rpx;
  color: #1f2937;
  background: transparent;
}

.search-clear {
  flex-shrink: 0;
  margin-left: 16rpx;
  font-size: 24rpx;
  color: #9ca3af;
}

.page-content {
  padding-bottom: 24rpx;
}

.content-block {
  padding: 0 32rpx;
}

.section-block {
  margin-top: 48rpx;
}

.banner-wrap {
  width: 100%;
  margin-top: 32rpx;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

.banner-swiper {
  width: 100%;
  height: 320rpx;
}

.banner-img {
  width: 100%;
  height: 320rpx;
}

.grid-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40rpx 0;
  padding: 40rpx 30rpx;
  margin: 24rpx 30rpx 0;
  background: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.grid-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  background: rgba(166, 0, 0, 0.06);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.grid-label {
  font-size: 24rpx;
  color: #374151;
  font-weight: 500;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.section-title-wrap {
  border-left: 8rpx solid #a60000;
  padding-left: 16rpx;
}

.section-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #1f2937;
}

.section-more-wrap {
  display: flex;
  align-items: center;
}

.section-more {
  font-size: 24rpx;
  color: #6b7280;
}

.service-scroll {
  white-space: nowrap;
}

.service-scroll-inner {
  display: inline-flex;
  gap: 20rpx;
  padding-bottom: 16rpx;
}

.service-card {
  width: 280rpx;
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  border: 2rpx solid #f3f4f6;
  flex-shrink: 0;
  display: inline-block;
}

.service-card:active {
  transform: scale(0.95);
}

.service-img {
  width: 280rpx;
  height: 192rpx;
}

.service-info {
  padding: 16rpx;
}

.service-title {
  display: block;
  font-size: 26rpx;
  font-weight: bold;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.service-content {
  display: block;
  margin-top: 8rpx;
  font-size: 20rpx;
  color: #6b7280;
  line-height: 1.5;
}

.service-content :deep(p) {
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.strategy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.strategy-card {
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  border: 2rpx solid #f3f4f6;
}

.strategy-card:active {
  transform: scale(0.95);
}

.strategy-img {
  width: 100%;
  height: 0;
  padding-bottom: 75%;
}

.strategy-info {
  padding: 16rpx;
  height: 120rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.strategy-title {
  font-size: 24rpx;
  font-weight: bold;
  color: #1f2937;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
}

.strategy-time {
  font-size: 20rpx;
  color: #9ca3af;
  margin-top: 8rpx;
}

.empty-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180rpx;
  border-radius: 16rpx;
  background: #ffffff;
  border: 2rpx solid #f3f4f6;
}

.empty-text {
  font-size: 24rpx;
  color: #9ca3af;
}

.tabbar-spacer {
  height: 140rpx;
}
</style>
