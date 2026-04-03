<template>
  <image
    class="app-icon"
    :src="iconSrc"
    mode="aspectFit"
    :style="iconStyle"
  />
</template>

<script setup>
import botRed from '@/static/icons/lucide/bot/a60000.png'
import botGray from '@/static/icons/lucide/bot/6b7280.png'
import briefcaseRed from '@/static/icons/lucide/briefcase-business/a60000.png'
import briefcaseGray from '@/static/icons/lucide/briefcase-business/6b7280.png'
import carRed from '@/static/icons/lucide/car/a60000.png'
import chevronRightGray from '@/static/icons/lucide/chevron-right/cccccc.png'
import circleCheckGreen from '@/static/icons/lucide/circle-check/2e7d32.png'
import circleXGray from '@/static/icons/lucide/circle-x/616161.png'
import clipboardListRed from '@/static/icons/lucide/clipboard-list/a60000.png'
import clockBlue from '@/static/icons/lucide/clock/1565c0.png'
import clockGray from '@/static/icons/lucide/clock/9ca3af.png'
import headphonesOrange from '@/static/icons/lucide/headphones/ff9800.png'
import headphonesRed from '@/static/icons/lucide/headphones/a60000.png'
import heartRose from '@/static/icons/lucide/heart/e91e63.png'
import houseRed from '@/static/icons/lucide/house/a60000.png'
import houseGray from '@/static/icons/lucide/house/6b7280.png'
import infoBlue from '@/static/icons/lucide/info/2196f3.png'
import mailGreen from '@/static/icons/lucide/mail/4caf50.png'
import mapPinRed from '@/static/icons/lucide/map-pin/a60000.png'
import mapPinGray from '@/static/icons/lucide/map-pin/9ca3af.png'
import mapRed from '@/static/icons/lucide/map/a60000.png'
import mapGray from '@/static/icons/lucide/map/6b7280.png'
import phoneRed from '@/static/icons/lucide/phone/a60000.png'
import refreshCcwPurple from '@/static/icons/lucide/refresh-ccw/7b1fa2.png'
import searchGray from '@/static/icons/lucide/search/9ca3af.png'
import settingsGray from '@/static/icons/lucide/settings/757575.png'
import userCheckRed from '@/static/icons/lucide/user-check/a60000.png'
import userRed from '@/static/icons/lucide/user/a60000.png'
import userGray from '@/static/icons/lucide/user/6b7280.png'
import walletGold from '@/static/icons/lucide/wallet/8a6a00.png'

const iconAssetMap = {
  'bot/6b7280': botGray,
  'bot/a60000': botRed,
  'briefcase-business/6b7280': briefcaseGray,
  'briefcase-business/a60000': briefcaseRed,
  'car/a60000': carRed,
  'chevron-right/cccccc': chevronRightGray,
  'circle-check/2e7d32': circleCheckGreen,
  'circle-x/616161': circleXGray,
  'clipboard-list/a60000': clipboardListRed,
  'clock/1565c0': clockBlue,
  'clock/9ca3af': clockGray,
  'headphones/a60000': headphonesRed,
  'headphones/ff9800': headphonesOrange,
  'heart/e91e63': heartRose,
  'house/6b7280': houseGray,
  'house/a60000': houseRed,
  'info/2196f3': infoBlue,
  'mail/4caf50': mailGreen,
  'map-pin/a60000': mapPinRed,
  'map-pin/9ca3af': mapPinGray,
  'map/6b7280': mapGray,
  'map/a60000': mapRed,
  'phone/a60000': phoneRed,
  'refresh-ccw/7b1fa2': refreshCcwPurple,
  'search/9ca3af': searchGray,
  'settings/757575': settingsGray,
  'user-check/a60000': userCheckRed,
  'user/6b7280': userGray,
  'user/a60000': userRed,
  'wallet/8a6a00': walletGold,
}

const iconFallbackMap = {
  bot: botGray,
  'briefcase-business': briefcaseGray,
  car: carRed,
  'chevron-right': chevronRightGray,
  'circle-check': circleCheckGreen,
  'circle-x': circleXGray,
  'clipboard-list': clipboardListRed,
  clock: clockGray,
  headphones: headphonesRed,
  heart: heartRose,
  house: houseGray,
  info: infoBlue,
  mail: mailGreen,
  map: mapGray,
  'map-pin': mapPinGray,
  phone: phoneRed,
  'refresh-ccw': refreshCcwPurple,
  search: searchGray,
  settings: settingsGray,
  user: userGray,
  'user-check': userCheckRed,
  wallet: walletGold,
}

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: String,
    default: '#000000',
  },
})

const normalizeName = (value) => String(value || '').trim().replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/_/g, '-').toLowerCase()
const normalizeColor = (value) => {
  const raw = String(value || '').trim().toLowerCase()
  if (raw === 'currentcolor' || raw === '') {
    return '6b7280'
  }
  return raw.replace('#', '')
}

const sizeValue = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
const iconSrc = computed(() => {
  const iconName = normalizeName(props.name)
  const iconColor = normalizeColor(props.color)

  return iconAssetMap[`${iconName}/${iconColor}`] || iconFallbackMap[iconName] || ''
})
const iconStyle = computed(() => ({
  width: sizeValue.value,
  height: sizeValue.value,
}))
</script>

<style scoped lang="scss">
.app-icon {
  display: block;
  flex-shrink: 0;
}
</style>
