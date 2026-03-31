<template>
  <view class="tabbar-icon" :class="{ 'tabbar-icon-active': active }">
    <component
      :is="iconComponent"
      class="icon-svg"
      :size="22"
      color="currentColor"
      :stroke-width="1.9"
    />
  </view>
</template>

<script setup>
import { Bot, BriefcaseBusiness, House, Map, User } from '@lucide/vue'

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

const iconMap = {
  home: House,
  service: BriefcaseBusiness,
  ai: Bot,
  strategy: Map,
  profile: User,
}

const iconComponent = computed(() => iconMap[props.name] || User)
</script>

<style scoped lang="scss">
.tabbar-icon {
  width: 44rpx;
  height: 44rpx;
  color: #6b7280;
  transform: scale(1);
  transition: transform 0.18s ease, color 0.18s ease;
}

.tabbar-icon-active {
  color: #a60000;
  transform: scale(1.1);
}

.icon-svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
