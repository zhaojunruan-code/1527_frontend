import { defineStore } from "pinia"
import { getTravelDebugToken } from "@/api/travel"

const getInitialUserInfo = () => ({
  user_id: "",
  nickname: "",
  avatar: "",
  phone: "",
  openid: "",
  role: "patient",
  token: "",
})

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: getInitialUserInfo(),
    token: "",
  }),

  getters: {
    isLogin: (state) => !!state.token,
    getToken: (state) => state.token,
    userRole: (state) => state.userInfo.role || "patient",
    isDoctor: (state) => state.userInfo.role === "doctor",
    isPatient: (state) => state.userInfo.role === "patient",
  },

  actions: {
    async onLogin(params = { user_id: 1 }) {
      const response = await getTravelDebugToken(params)

      if (response.code === 200) {
        this.setToken(response.data)
        this.setUserInfo({
          user_id: params.user_id,
        })
      }

      return response
    },
    setToken(value) {
      this.token = value || ""
      this.userInfo = {
        ...this.userInfo,
        token: value || "",
      }
    },
    setUserInfo(value = {}) {
      this.userInfo = {
        ...this.userInfo,
        ...value,
      }
    },
    clearUserInfo() {
      this.userInfo = getInitialUserInfo()
      this.token = ""
    },
    setUserRole(role) {
      this.userInfo.role = role
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: {
          getItem: (key) => {
            return uni.getStorageSync(key)
          },
          setItem: (key, value) => {
            uni.setStorageSync(key, value)
          },
        },
      },
    ],
  },
})
