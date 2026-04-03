export const DEFAULT_PROJECT_LOGO = "/static/images/app-logo.png"
export const DEFAULT_CONTACT_US = "400-123-4567"
export const DEFAULT_CONTACT_PHONE = "4001234567"
export const DEFAULT_CONTACT_SERVICE_TIME = "09:00 - 22:00"

const normalizeText = (value) => String(value || "").trim()

export const resolveSiteAssetUrl = (value, fallback = "") => {
  const asset = normalizeText(value)
  if (!asset) {
    return fallback
  }

  if (/^(https?:)?\/\//.test(asset) || asset.startsWith("data:")) {
    return asset
  }

  const baseUrl = normalizeText(import.meta.env.VITE_SERVER_BASEURL).replace(/\/+$/, "")
  if (!baseUrl) {
    return asset
  }

  return `${baseUrl}/${asset.replace(/^\/+/, "")}`
}

export const extractContactPhone = (value) => {
  return normalizeText(value).replace(/[^\d]/g, "")
}

export const formatContactUs = (value, fallback = "") => {
  const contactText = normalizeText(value)
  if (!contactText) {
    return fallback
  }

  const digits = extractContactPhone(contactText)
  if (digits.length === 10 && digits.startsWith("400")) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  }

  if (digits.length === 8) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`
  }

  return contactText
}
