<template>
  <view class="shortcut-icon">
    <Car v-if="resolvedName === 'car'" class="icon-svg" :size="22" color="currentColor" :stroke-width="1.9" />
    <UserCheck
      v-else-if="resolvedName === 'guide'"
      class="icon-svg"
      :size="22"
      color="currentColor"
      :stroke-width="1.9"
    />
    <Map
      v-else-if="resolvedName === 'strategy'"
      class="icon-svg"
      :size="22"
      color="currentColor"
      :stroke-width="1.9"
    />
    <ClipboardList
      v-else-if="resolvedName === 'orders'"
      class="icon-svg"
      :size="22"
      color="currentColor"
      :stroke-width="1.9"
    />
    <Headphones
      v-else-if="resolvedName === 'service'"
      class="icon-svg"
      :size="22"
      color="currentColor"
      :stroke-width="1.9"
    />
    <Bot v-else class="icon-svg" :size="22" color="currentColor" :stroke-width="1.9" />
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

const supportedNames = ['car', 'guide', 'strategy', 'orders', 'service', 'ai']
const resolvedName = computed(() => (supportedNames.includes(props.name) ? props.name : 'ai'))
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
