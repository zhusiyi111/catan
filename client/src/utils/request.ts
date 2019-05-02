import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { prefix, domain } from "../config/interface";
import { getPlayerId } from "../models/player/helper";
interface SuccessResult<T> {
  success: true;
  data: T;
}

interface FailResult {
  success: false;
  msg: string;
}

type ApiResult<T> = SuccessResult<T> | FailResult;

interface ApiResultPromise<T> extends Promise<ApiResult<T>> {}

interface CustomerOptions extends AxiosRequestConfig {
  urlParams?: Array<string>;
}

const urlPlaceholder = /\{\}/g;
const configHelper = (options: CustomerOptions): AxiosRequestConfig => {
  let { url = "" } = options;
  const { urlParams } = options;
  if (Array.isArray(urlParams)) {
    let count = 0;
    url = url.replace(urlPlaceholder, () => {
      const replacement = urlParams[count];
      count += 1;
      return replacement;
    });
    delete options.urlParams;
    options.url = url;
  }
  return options;
};

const request: AxiosInstance = axios.create({
  withCredentials: true,
  timeout: 10000,
  // responseType: "json",
  baseURL: `http://${domain}${prefix}`,
  validateStatus: (status: number) =>
    (status >= 200 && status < 300) || status === 304
  // headers: {
  //   "Content-Type": "application/json;charset=UTF-8"
  // }
});

// add uid
request.interceptors.request.use(req => {
  const { params } = req;
  const matchId = localStorage.getItem("matchId");
  if (!matchId) {
    console.error("没有matchId");
    return req;
  }
  const playerId = getPlayerId();
  if (playerId === undefined) {
    console.error("没有playerId");
    return req;
  }
  if (params === undefined) {
    req.params = {
      matchId,
      playerId
    };
  } else {
    req.params = { ...params, ...{ matchId } };
  }
  return req;
});

request.interceptors.request.use(req => {
  const { method, data } = req;
  if (method === "post") {
    req.data = data;
  }
  return req;
});

request.interceptors.response.use(res => {
  const { data } = res;
  if (data && data.success === false) {
    console.warn(data.msg);
  }
  return res;
});

request.interceptors.response.use(res => res.data);

const wrapRequest = <T>(config: AxiosRequestConfig): Promise<ApiResult<T>> => {
  return request(configHelper(config)) as any;
};
export default wrapRequest;

export const get = <T>(url: string, params?: any): ApiResultPromise<T> =>
  wrapRequest({ url, params, method: "get" }) as ApiResultPromise<T>;

export const post = <T>(url: string, data?: any): ApiResultPromise<T> =>
  wrapRequest({ url, data, method: "post" }) as ApiResultPromise<T>;
