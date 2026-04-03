import { defineStore } from "pinia"
import { getSiteConfig } from "@/api/common"
import { extractContactPhone, formatContactUs, resolveSiteAssetUrl } from "@/utils/siteConfig"

const getInitialSiteConfig = () => ({
  logo: "",
  contact_us: "",
})

let loadingPromise = null

export const useSiteConfigStore = defineStore("siteConfig", {
  state: () => ({
    siteConfig: getInitialSiteConfig(),
    loaded: false,
  }),

  getters: {
    logo: (state) => String(state.siteConfig.logo || "").trim(),
    logoUrl() {
      return resolveSiteAssetUrl(this.logo)
    },
    contactUs: (state) => String(state.siteConfig.contact_us || "").trim(),
    contactDisplay() {
      return formatContactUs(this.contactUs)
    },
    contactPhone() {
      return extractContactPhone(this.contactUs)
    },
  },

  actions: {
    setSiteConfig(value = {}) {
      this.siteConfig = {
        ...getInitialSiteConfig(),
        ...value,
      }
      this.loaded = true
    },

    async loadSiteConfig(force = false) {
      if (this.loaded && !force) {
        return this.siteConfig
      }

      if (loadingPromise && !force) {
        await loadingPromise
        return this.siteConfig
      }

      loadingPromise = (async () => {
        try {
          const response = await getSiteConfig()
          if (response.code === 200 && response.data) {
            this.setSiteConfig(response.data)
          }
        } catch (error) {
          return this.siteConfig
        } finally {
          loadingPromise = null
        }

        return this.siteConfig
      })()

      return loadingPromise
    },
  },
})
