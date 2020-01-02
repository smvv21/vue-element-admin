/**
 * 二次封装api，更专注处理业务，减少promise调用
 */
import request from '@/utils/request'

function req(method, url, data, func) {
  let reqData = data
  let callBack = func
  if (Object.prototype.toString.call(data) == '[object Function]') {
    reqData = {}
    callBack = data
  }

  if (!callBack) {
    callBack = () => {}
  }

  const reqObj = {
    method,
    url
  }

  // 通用参数.
  // local 语言
  Object.assign(reqData, {
    //
  })

  const name = method == 'get' ? 'params' : 'data'
  reqObj[name] = reqData

  return new Promise((resolve, reject) => {
    request(reqObj).then(async res => {
      __debug('::request===>', url, data)
      await callBack(res)
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export function $get(url, data, func) {
  return req('get', url, data, func)
}

export function $post(url, data, func) {
  return req('post', url, data, func)
}
