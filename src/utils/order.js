const ORDER_STATUS_TEXT_MAP = Object.freeze({
  pending_payment: "待支付",
  pending_service: "待服务",
  completed: "已完成",
  cancelled: "已取消",
  refund: "退款/售后",
})

const RAW_STATUS_MAP = Object.freeze({
  pending: "pending_payment",
  unpaid: "pending_payment",
  waitpay: "pending_payment",
  to_pay: "pending_payment",
  topay: "pending_payment",
  paid: "pending_service",
  confirmed: "pending_service",
  scheduled: "pending_service",
  service: "pending_service",
  serving: "pending_service",
  in_service: "pending_service",
  waitservice: "pending_service",
  pending_service: "pending_service",
  completed: "completed",
  complete: "completed",
  finished: "completed",
  finish: "completed",
  done: "completed",
  success: "completed",
  cancelled: "cancelled",
  canceled: "cancelled",
  cancel: "cancelled",
  closed: "cancelled",
  close: "cancelled",
  refund: "refund",
  refunded: "refund",
  refunding: "refund",
  aftersale: "refund",
  after_sale: "refund",
})

const TYPE_MAP = Object.freeze({
  1: "charter",
  2: "guide",
  charter: "charter",
  guide: "guide",
})

const normalizeText = (value) => String(value || "").trim()

const formatAmount = (value) => {
  const amount = Number.parseFloat(value)
  if (!Number.isFinite(amount)) {
    return "0"
  }

  return amount.toFixed(2).replace(/\.00$/, "")
}

const getFallbackTitle = (type, detail = {}) => {
  if (type === "guide") {
    return `${normalizeText(detail.guide_name) || "导游"}预约`
  }

  return [normalizeText(detail.destination_name), normalizeText(detail.vehicle_name), "包车预约"]
    .filter(Boolean)
    .join("-")
}

const buildServiceDateText = (record = {}, detail = {}) => {
  const serviceTimeText = normalizeText(detail.servicetime_text) || normalizeText(record.servicetime_text)
  const timeslot = normalizeText(detail.timeslot)

  if (!timeslot) {
    return serviceTimeText
  }

  const serviceDay = serviceTimeText.split(" ")[0] || serviceTimeText
  return [serviceDay, timeslot].filter(Boolean).join(" ")
}

export const getTravelOrderStatusText = (status) => {
  return ORDER_STATUS_TEXT_MAP[normalizeText(status)] || ""
}

export const normalizeTravelOrderStatus = (status, statusText = "") => {
  if (typeof status === "object" && status !== null) {
    statusText = status.status_text || ""
    status = status.status
  }

  const normalizedStatus = normalizeText(status).toLowerCase()
  const normalizedStatusText = normalizeText(statusText)

  if (ORDER_STATUS_TEXT_MAP[normalizedStatus]) {
    return normalizedStatus
  }

  if (RAW_STATUS_MAP[normalizedStatus]) {
    return RAW_STATUS_MAP[normalizedStatus]
  }

  if (normalizedStatusText.includes("待支付")) {
    return "pending_payment"
  }

  if (normalizedStatusText.includes("待服务")) {
    return "pending_service"
  }

  if (normalizedStatusText.includes("完成")) {
    return "completed"
  }

  if (normalizedStatusText.includes("取消")) {
    return "cancelled"
  }

  if (normalizedStatusText.includes("退款") || normalizedStatusText.includes("售后")) {
    return "refund"
  }

  return normalizedStatus
}

export const normalizeTravelOrderType = (type, typeText = "") => {
  const normalizedType = normalizeText(type).toLowerCase()
  if (TYPE_MAP[normalizedType]) {
    return TYPE_MAP[normalizedType]
  }

  const normalizedTypeText = normalizeText(typeText)
  if (normalizedTypeText.includes("导游")) {
    return "guide"
  }

  return "charter"
}

export const extractTravelOrderList = (response) => {
  if (Array.isArray(response?.data)) {
    return response.data
  }

  if (Array.isArray(response?.data?.list)) {
    return response.data.list
  }

  return []
}

export const getTravelOrderTotal = (response, fallback = 0) => {
  const total = Number(response?.data?.total)
  return Number.isFinite(total) ? total : fallback
}

export const normalizeTravelOrder = (record = {}) => {
  const detail = record?.detail || {}
  const type = normalizeTravelOrderType(record.type, record.type_text)
  const status = normalizeTravelOrderStatus(record.status, record.status_text)
  const statusText = normalizeText(record.status_text) || getTravelOrderStatusText(status)
  const booktypeText = normalizeText(detail.booktype_text)
  const guideName = normalizeText(detail.guide_name)
  const vehicle = normalizeText(detail.vehicle_name)
  const destination = normalizeText(detail.destination_name)

  return {
    id: normalizeText(record.out_trade_no) || normalizeText(record.id),
    recordId: record.id ?? "",
    outTradeNo: normalizeText(record.out_trade_no),
    businessId: record.business_id ?? "",
    rawStatus: normalizeText(record.status),
    status,
    statusText,
    type,
    typeText: normalizeText(record.type_text) || (type === "guide" ? "导游预约" : "包车预约"),
    title: normalizeText(record.title) || getFallbackTitle(type, detail),
    price: Number.parseFloat(record.pay_fee ?? record.price ?? detail.total_price) || 0,
    priceText: formatAmount(record.pay_fee ?? record.price ?? detail.total_price),
    date: buildServiceDateText(record, detail),
    serviceTimeText: normalizeText(detail.servicetime_text) || normalizeText(record.servicetime_text),
    orderTime: normalizeText(record.createtime_text) || normalizeText(detail.createtime_text),
    payTime: normalizeText(record.paytime_text),
    transactionId: normalizeText(record.transaction_id),
    paymentJson: normalizeText(record.payment_json),
    guideName,
    guideImg: normalizeText(detail.guide_avatar) || normalizeText(detail.guide_img),
    booktype: normalizeText(detail.booktype),
    booktypeText,
    timeslot: normalizeText(detail.timeslot),
    vehicle,
    destination,
    area: normalizeText(record.area),
    address: normalizeText(record.address),
    serviceSummary: type === "guide"
      ? [guideName, booktypeText].filter(Boolean).join(" · ")
      : [vehicle, destination].filter(Boolean).join(" · "),
    contactName: normalizeText(record.name),
    contactPhone: normalizeText(record.phone),
    remark: normalizeText(record.remark),
    detail,
    raw: record,
  }
}
