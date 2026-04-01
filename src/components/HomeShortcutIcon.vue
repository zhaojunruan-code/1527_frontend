<template>
  <view class="shortcut-icon">
    <AppIcon class="icon-svg" :name="iconName" size="44rpx" color="#a60000" />
  </view>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const supportedNames = ['car', 'guide', 'strategy', 'orders', 'service', 'ai']
const iconMap = {
  car: 'car',
  guide: 'user-check',
  strategy: 'map',
  orders: 'clipboard-list',
  service: 'headphones',
  ai: 'bot',
}

const resolvedName = computed(() => (supportedNames.includes(props.name) ? props.name : 'ai'))
const iconName = computed(() => iconMap[resolvedName.value])
</script>

<style scoped lang="scss">
.shortcut-icon {
  width: 44rpx;
  height: 44rpx;
}

.icon-svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
