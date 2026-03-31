import { defineStore } from "pinia";

export const useTabbarStore = defineStore(
  "tabbar",
  {
    state: () => {
      return {
        tabbarIndex: 0
      };
    },
    actions: {
      normalizePath(path) {
        return String(path || "").replace(/^\//, "");
      },
      async handleChangeTabbar(item) {
        this.tabbarIndex = item.id;

        if (item.centerItem) {
          return uni.navigateTo({ url: item.path });
        }

        const currentPage = getCurrentPages().at(-1);
        if (currentPage && this.normalizePath(currentPage.route) === this.normalizePath(item.path)) {
          return;
        }

        return uni.reLaunch({
          url: item.path,
        });
      }
    }
  }
);
