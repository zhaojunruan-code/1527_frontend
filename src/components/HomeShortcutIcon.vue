<template>
  <view class="shortcut-icon">
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
import { Bot, Car, ClipboardList, Headphones, Map, UserCheck } from '@lucide/vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const iconMap = {
  car: Car,
  guide: UserCheck,
  strategy: Map,
  orders: ClipboardList,
  service: Headphones,
  ai: Bot,
}

const iconComponent = computed(() => iconMap[props.name] || Bot)
</script>

<style scoped lang="scss">
.shortcut-icon {
  width: 44rpx;
  height: 44rpx;
  color: #a60000;
}

.icon-svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
