const rawUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const normalizedUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
export const BASE_URL = normalizedUrl + "/api/v1";

console.log("[API DEBUG] Admin Backend URL is:", BASE_URL);


export const ADD_SERVICE = BASE_URL + "/add"
export const LIST_SERVICE = BASE_URL + "/list"
export const ORDER_URI = BASE_URL + "/orderlist"
export const DELETE_SERVICE = BASE_URL + "/remove"
export const UPDATE_STATUS = BASE_URL + "/status"
