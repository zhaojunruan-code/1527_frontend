import { defineStore } from "pinia"

export const useNavStore = defineStore("nav", {
  state: () => ({
    params: {},
  }),
  actions: {
    setParams(data) {
      this.params = data || {}
    },
    clearParams() {
      this.params = {}
    },
  },
})
