<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <text class="back-icon" @click="goBack">←</text>
      <text class="header-title">在线客服</text>
      <view class="header-spacer" />
    </view>

    <!-- Chat messages -->
    <scroll-view scroll-y class="chat-area" :scroll-into-view="scrollTarget">
      <view class="messages">
        <view
          v-for="msg in messages"
          :key="msg.id"
          :class="['msg-row', msg.type === 'user' ? 'msg-right' : 'msg-left']"
        >
          <view :class="['msg-bubble', msg.type === 'user' ? 'bubble-user' : 'bubble-system']">
            <text class="msg-text">{{ msg.text }}</text>
            <text :class="['msg-time', msg.type === 'user' ? 'time-user' : 'time-system']">{{ msg.time }}</text>
          </view>
        </view>
        <view :id="'msg-bottom'" />
      </view>
    </scroll-view>

    <!-- Input -->
    <view class="input-bar">
      <input
        type="text"
        v-model="inputText"
        placeholder="请输入您的问题..."
        class="chat-input"
        confirm-type="send"
        @confirm="handleSend"
      />
      <view class="send-btn" @click="handleSend">
        <text class="send-icon">➤</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const messages = ref([
  { id: 1, type: 'system', text: '欢迎来到潮汕英歌行在线客服，请问有什么可以帮您？', time: '10:00' }
])
const inputText = ref('')
const scrollTarget = ref('')

const getCurrentTime = () => {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

const scrollToBottom = () => {
  nextTick(() => {
    scrollTarget.value = ''
    setTimeout(() => { scrollTarget.value = 'msg-bottom' }, 50)
  })
}

const handleSend = () => {
  const text = inputText.value.trim()
  if (!text) return

  messages.value.push({
    id: Date.now(),
    type: 'user',
    text,
    time: getCurrentTime()
  })
  inputText.value = ''
  scrollToBottom()

  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      type: 'system',
      text: '客服代表已收到您的消息，正在为您处理，请稍候...',
      time: getCurrentTime()
    })
    scrollToBottom()
  }, 1000)
}

const goBack = () => uni.navigateBack()
</script>

<style scoped lang="scss">
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
}
.header {
  display: flex;
  align-items: center;
  padding: 80rpx 30rpx 24rpx;
  background: #fff;
  border-bottom: 1rpx solid #f3f4f6;
  flex-shrink: 0;
}
.back-icon {
  font-size: 40rpx;
  color: #1f2937;
  width: 60rpx;
}
.header-title {
  flex: 1;
  text-align: center;
  font-size: 34rpx;
  font-weight: bold;
  color: #1f2937;
}
.header-spacer { width: 60rpx; }
.chat-area {
  flex: 1;
  overflow: hidden;
}
.messages {
  padding: 24rpx;
}
.msg-row {
  display: flex;
  margin-bottom: 24rpx;
}
.msg-right {
  justify-content: flex-end;
}
.msg-left {
  justify-content: flex-start;
}
.msg-bubble {
  max-width: 75%;
  padding: 24rpx;
  border-radius: 28rpx;
}
.bubble-user {
  background: #A60000;
  border-top-right-radius: 6rpx;
}
.bubble-system {
  background: #fff;
  border: 1rpx solid #f3f4f6;
  border-top-left-radius: 6rpx;
}
.msg-text {
  font-size: 28rpx;
  line-height: 1.5;
}
.bubble-user .msg-text {
  color: #fff;
}
.bubble-system .msg-text {
  color: #1f2937;
}
.msg-time {
  font-size: 20rpx;
  margin-top: 8rpx;
  text-align: right;
  display: block;
}
.time-user {
  color: rgba(255,255,255,0.7);
}
.time-system {
  color: #9ca3af;
}
.input-bar {
  display: flex;
  align-items: center;
  padding: 16rpx 24rpx;
  background: #fff;
  border-top: 1rpx solid #f3f4f6;
  flex-shrink: 0;
  padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
}
.chat-input {
  flex: 1;
  background: #f3f4f6;
  border-radius: 999rpx;
  padding: 18rpx 28rpx;
  font-size: 28rpx;
}
.send-btn {
  width: 72rpx;
  height: 72rpx;
  background: #A60000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16rpx;
  flex-shrink: 0;
}
.send-icon {
  color: #fff;
  font-size: 30rpx;
}
</style>
