import axios from "axios";
import { history } from "../index";

export const configs = {
  setStore: (name: string, values: any) => {
    localStorage.setItem(name, values);
  },
  getStore: (name: string) => {
    return localStorage.getItem(name);
  },
  setStoreJSON: (name: string, values: any) => {
    // biến thành chuỗi
    values = JSON.stringify(values);
    // lưu vào store
    localStorage.setItem(name, values);
  },
  getStoreJSON: (name: string) => {
    if (localStorage.getItem(name)) {
      let value: any = localStorage.getItem(name);
      let content = JSON.parse(value);
      return content;
    }
    return null;
  },
  setCookie: (value: string, days: number = 30, name: string) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  clearCookie: (name: string) => {
    setCookie("", -1, name);
  },
  clearLocalStorage: (name: string) => {
    localStorage.removeItem(name);
  },
  ACCESS_TOKEN: "accessToken",
  USER_LOGIN: "userLogin",
};

export const {
  ACCESS_TOKEN,
  USER_LOGIN,
  getCookie,
  setCookie,
  getStore,
  setStore,
  getStoreJSON,
  setStoreJSON,
  clearCookie,
  clearLocalStorage,
} = configs;

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA";

// Cấu hình interceptor ( Cấu hình cho các request và response )

export const http = axios.create({
  baseURL: `https://shop.cyberlearn.vn/api`,
  timeout: 120000,
});

// cấu hình request
http.interceptors.request.use(
  (configs) => {
    // cấu hình tất cả header add thêm thuộc tính Authorization
    configs.headers = {
      ...configs.headers,
      ["Authorization"]: `Bearer ${getStore(ACCESS_TOKEN)}`,
      ["TokenCybersoft"]: TOKEN_CYBERSOFT,
    };

    return configs;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * statuscode: mã kết quả trả về do backend qui định
 * 200(Success): kết quả trả về thành công
 * 201(created): tạo giá trị thành công trên server (thường dùng 200)
 * 400 (BadRequest): ko tồn tại đường dẫn
 * 404 (NotFound): ko tìm thấy dữ liệu
 * 401 (UnAuthorize): ko có quyền truy cập vào api
 * 403 (Forbidden): Token chưa đủ quyền truy cập
 * 500 (error in server): Lỗi xảy ra trên server (do frontend hoặc backend tuỳ tình huống)
 */

// cấu hình kết quả trả về
http.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (err) => {
    // const originalRequest = error.config;
    console.log(err.response.status);
    if (err.response.status === 404 || err.response.status === 404) {
      // history.push("/");
      window.location.href = "/";
      return Promise.reject(err);
    }
    if (err.response.status === 401 || err.response.status === 403) {
      alert("token ko hop le");
      // history.push("/login");
      window.location.href = "/login";

      return Promise.reject(err);
    }
  }
);
