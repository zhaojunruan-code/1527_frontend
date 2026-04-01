<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <view class="header-safe-area" :style="{ height: `${safeAreaTop}px` }" />
      <text class="header-title">潮汕百事通 AI</text>
    </view>

    <!-- Chat area -->
    <scroll-view
      class="chat-area"
      scroll-y
      :scroll-into-view="scrollToId"
      scroll-with-animation
    >
      <view class="chat-list">
        <view
          v-for="(msg, idx) in messages"
          :key="idx"
          :id="'msg-' + idx"
          class="msg-row"
          :class="msg.role === 'user' ? 'msg-row-right' : 'msg-row-left'"
        >
          <!-- AI avatar -->
          <view v-if="msg.role === 'ai'" class="avatar-wrap">
            <view class="avatar-ai">
              <text class="avatar-text">AI</text>
            </view>
          </view>

          <!-- Bubble -->
          <view
            class="bubble"
            :class="msg.role === 'user' ? 'bubble-user' : 'bubble-ai'"
          >
            <text class="bubble-text">{{ msg.content }}</text>
          </view>

          <!-- User avatar -->
          <view v-if="msg.role === 'user'" class="avatar-wrap">
            <view class="avatar-user">
              <text class="avatar-text">我</text>
            </view>
          </view>
        </view>

        <!-- Loading dots -->
        <view v-if="loading" class="msg-row msg-row-left">
          <view class="avatar-wrap">
            <view class="avatar-ai">
              <text class="avatar-text">AI</text>
            </view>
          </view>
          <view class="bubble bubble-ai">
            <view class="loading-dots">
              <view class="dot dot1" />
              <view class="dot dot2" />
              <view class="dot dot3" />
            </view>
          </view>
        </view>

        <view id="msg-bottom" style="height: 20rpx" />
      </view>
    </scroll-view>

    <!-- Quick questions -->
    <view v-if="messages.length <= 1" class="quick-questions">
      <view
        class="quick-btn"
        v-for="(q, idx) in quickQuestions"
        :key="idx"
        @click="sendMessage(q)"
      >
        <text class="quick-text">{{ q }}</text>
      </view>
    </view>

    <!-- Input area -->
    <view class="input-area">
      <view class="input-wrap">
        <input
          class="msg-input"
          type="text"
          placeholder="输入你的问题..."
          v-model="inputText"
          confirm-type="send"
          @confirm="sendMessage(inputText)"
        />
        <view class="send-btn" @click="sendMessage(inputText)">
          <text class="send-text">发送</text>
        </view>
      </view>
    </view>

    <!-- Bottom spacing for tabbar -->
    <view style="height: 120rpx" />
    <CustomTabbar />
  </view>
</template>

<script setup>
import CustomTabbar from '@/components/CustomTabbar/index.vue'
import { useTabbarStore } from '@/store/useTabbarStore'

const tabbarStore = useTabbarStore()
const safeAreaTop = ref(0)

onMounted(() => {
  const { statusBarHeight } = uni.getSystemInfoSync()
  safeAreaTop.value = statusBarHeight || 0
  tabbarStore.tabbarIndex = 2
})

const messages = ref([
  {
    role: 'ai',
    content: '胶己人，你好！我是潮汕智能助手。关于潮汕旅游、美食、英歌舞文化，或者行程规划，都可以问我哦！',
  },
])

const inputText = ref('')
const loading = ref(false)
const scrollToId = ref('')

const quickQuestions = [
  '普宁英歌舞哪里看？',
  '潮州三天两夜怎么玩？',
  '推荐正宗的牛肉火锅',
  '南澳岛需要买门票吗？',
]

const scrollToBottom = () => {
  nextTick(() => {
    scrollToId.value = ''
    nextTick(() => {
      scrollToId.value = 'msg-bottom'
    })
  })
}

const mockAIResponse = (question) => {
  const responses = {
    '普宁英歌舞哪里看？':
      '普宁英歌舞最佳观赏时间是每年春节期间（正月初一到元宵），普宁市区各街道都有英歌队巡游表演。推荐去普宁流沙市区的主要街道观看，那里的英歌队规模最大、表演最精彩。平时也可以去普宁英歌舞传承基地参观，提前预约可以观看排练。',
    '潮州三天两夜怎么玩？':
      '推荐行程：\nDay1：广济桥→韩文公祠→牌坊街（午餐尝肠粉、蚝烙）→开元寺→晚上逛牌坊街夜市\nDay2：龙湖古寨→凤凰山（品单丛茶）→凤凰古村落\nDay3：甲第巷→西湖公园→采购手信（腐乳饼、老药桔）\n住宿推荐牌坊街附近的民宿，交通便利，美食集中。',
    '推荐正宗的牛肉火锅':
      '汕头牛肉火锅必吃推荐：\n1. 八合里海记牛肉店 - 老字号，牛肉丸Q弹\n2. 福合埕牛肉丸 - 手打牛肉丸的代表\n3. 官塘兄弟牛肉 - 本地人最爱，新鲜现切\n\n点餐技巧：吊龙、匙柄、五花趾是必点部位，涮8秒左右口感最佳。沙茶酱是灵魂蘸料！',
    '南澳岛需要买门票吗？':
      '南澳岛上岛不需要门票，过南澳大桥也是免费的。岛上部分景点需要门票：\n- 青澳湾海滨浴场：免费\n- 南澳岛总兵府：20元\n- 金银岛：免费\n- 风电场观景台：免费\n\n建议自驾或包车环岛，岛上公共交通不太方便。环岛一圈约3小时，记得尝尝海鲜大排档！',
  }

  return (
    responses[question] ||
    `关于"${question}"，这是一个很好的问题！潮汕地区历史悠久、文化丰富，建议您可以通过以下方式了解更多：\n1. 查看我们的攻略频道获取详细介绍\n2. 预约当地导游进行深度体验\n3. 联系客服获取个性化行程规划\n\n还有其他想了解的吗？`
  )
}

const sendMessage = (text) => {
  const content = typeof text === 'string' ? text.trim() : ''
  if (!content || loading.value) return

  messages.value.push({ role: 'user', content })
  inputText.value = ''
  loading.value = true
  scrollToBottom()

  setTimeout(() => {
    const reply = mockAIResponse(content)
    messages.value.push({ role: 'ai', content: reply })
    loading.value = false
    scrollToBottom()
  }, 1000)
}
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.header {
  background: #a60000;
  padding-bottom: 24rpx;
  text-align: center;
}

.header-safe-area {
  width: 100%;
}

.header-title {
  display: block;
  color: #ffffff;
  font-size: 34rpx;
  font-weight: bold;
  padding-top: 24rpx;
}

.chat-area {
  flex: 1;
  padding: 20rpx;
  box-sizing: border-box;
}

.chat-list {
  display: flex;
  flex-direction: column;
}

.msg-row {
  display: flex;
  margin-bottom: 24rpx;
  align-items: flex-start;
}

.msg-row-left {
  flex-direction: row;
}

.msg-row-right {
  flex-direction: row-reverse;
}

.avatar-wrap {
  flex-shrink: 0;
  margin: 0 16rpx;
}

.avatar-ai {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  background: #a60000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-user {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  background: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  color: #ffffff;
  font-size: 26rpx;
  font-weight: bold;
}

.bubble {
  max-width: 65%;
  padding: 20rpx 28rpx;
  border-radius: 20rpx;
  word-break: break-all;
}

.bubble-ai {
  background: #ffffff;
  border-top-left-radius: 4rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.bubble-user {
  background: #a60000;
  border-top-right-radius: 4rpx;
}

.bubble-ai .bubble-text {
  color: #333333;
  font-size: 28rpx;
  line-height: 1.6;
  white-space: pre-wrap;
}

.bubble-user .bubble-text {
  color: #ffffff;
  font-size: 28rpx;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* Loading dots animation */
.loading-dots {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 8rpx 0;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #a60000;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot1 {
  animation-delay: -0.32s;
}

.dot2 {
  animation-delay: -0.16s;
}

.dot3 {
  animation-delay: 0s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Quick questions */
.quick-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  padding: 0 24rpx 20rpx;
}

.quick-btn {
  background: #ffffff;
  border: 2rpx solid #a60000;
  border-radius: 30rpx;
  padding: 14rpx 28rpx;
}

.quick-text {
  font-size: 26rpx;
  color: #a60000;
}

/* Input area */
.input-area {
  padding: 16rpx 24rpx;
  background: #ffffff;
  border-top: 1rpx solid #eeeeee;
  padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
}

.input-wrap {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.msg-input {
  flex: 1;
  background: #f5f5f5;
  border-radius: 36rpx;
  padding: 18rpx 28rpx;
  font-size: 28rpx;
}

.send-btn {
  background: #a60000;
  border-radius: 36rpx;
  padding: 18rpx 36rpx;
  flex-shrink: 0;
}

.send-text {
  color: #ffffff;
  font-size: 28rpx;
  font-weight: bold;
}
</style>
