<template>
  <view class="tabbar-icon" :class="{ 'tabbar-icon-active': active }">
    <AppIcon class="icon-svg" :name="iconName" size="44rpx" :color="iconColor" />
  </view>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const supportedNames = ['home', 'service', 'ai', 'strategy', 'profile']
const iconMap = {
  home: 'house',
  service: 'briefcase-business',
  ai: 'bot',
  strategy: 'map',
  profile: 'user',
}

const resolvedName = computed(() => (supportedNames.includes(props.name) ? props.name : 'profile'))
const iconName = computed(() => iconMap[resolvedName.value])
const iconColor = computed(() => (props.active ? '#a60000' : '#6b7280'))
</script>

<style scoped lang="scss">
.tabbar-icon {
  width: 44rpx;
  height: 44rpx;
  transform: scale(1);
  transition: transform 0.18s ease;
}

.tabbar-icon-active {
  transform: scale(1.1);
}

.icon-svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
