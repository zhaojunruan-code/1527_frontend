import { request } from "@/http"

const formHeader = {
  "content-type": "application/x-www-form-urlencoded",
}

export function getTravelDebugToken(params) {
  return request({
    url: "/api/index/getToken",
    method: "GET",
    data: params,
  })
}

export function getTravelCheck() {
  return request({
    url: "/api/travel/check",
    method: "GET",
  })
}

export function getTravelHome() {
  return request({
    url: "/api/travel/home",
    method: "GET",
  })
}

export function getTravelServiceList(params = {}) {
  return request({
    url: "/api/travel/serviceList",
    method: "GET",
    data: params,
  })
}

export function getTravelStrategyList(params = {}) {
  return request({
    url: "/api/travel/strategyList",
    method: "GET",
    data: params,
  })
}

export function getTravelStrategyDetail(params) {
  return request({
    url: "/api/travel/strategyDetail",
    method: "GET",
    data: params,
  })
}

export function postTravelCollectToggle(data) {
  return request({
    url: "/api/travel/collectToggle",
    method: "POST",
    data,
    header: formHeader,
  })
}

export function getTravelCollectList(params = {}) {
  return request({
    url: "/api/travel/collectList",
    method: "GET",
    data: params,
  })
}

export function getTravelDestinationList() {
  return request({
    url: "/api/travel/destinationList",
    method: "GET",
  })
}

export function getTravelVehicleList() {
  return request({
    url: "/api/travel/vehicleList",
    method: "GET",
  })
}

export function getTravelGuideList() {
  return request({
    url: "/api/travel/guideList",
    method: "GET",
  })
}

export function getTravelGuideDetail(params) {
  return request({
    url: "/api/travel/guideDetail",
    method: "GET",
    data: params,
  })
}

export function getTravelRichtextDetail(params) {
  return request({
    url: "/api/travel/richtextDetail",
    method: "GET",
    data: params,
  })
}

export function postTravelCreateCharter(data) {
  return request({
    url: "/api/travel/createCharter",
    method: "POST",
    data,
    header: formHeader,
  })
}

export function postTravelCreateBooking(data) {
  return request({
    url: "/api/travel/createBooking",
    method: "POST",
    data,
    header: formHeader,
  })
}

export function getTravelOrderList(params = {}) {
  return request({
    url: "/api/travel/orderList",
    method: "GET",
    data: params,
  })
}

export function getTravelOrderDetail(params) {
  return request({
    url: "/api/travel/orderDetail",
    method: "GET",
    data: params,
  })
}

export function postTravelCancelOrder(data) {
  return request({
    url: "/api/travel/cancelOrder",
    method: "POST",
    data,
    header: formHeader,
  })
}

export function postTravelPayOrder(data) {
  return request({
    url: "/api/travel/payOrder",
    method: "POST",
    data,
    header: formHeader,
  })
}

export function postTravelRefundOrder(data) {
  return request({
    url: "/api/travel/refundOrder",
    method: "POST",
    data,
    header: formHeader,
  })
}
