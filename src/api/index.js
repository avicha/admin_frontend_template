// import 'whatwg-fetch'
// import 'formdata-polyfill'

let _beforeFetchHandler = () => {}
let _afterFetchHandler = () => {}
let _errorFetchHandler = ({
  errcode,
  errmsg
}) => {}

const API = {
  defineBeboreFetchHandler(fn) {
    _before_fetch_handler = fn
  },
  defineAfterFetchHandler(fn) {
    _after_fetch_handler = fn
  },
  defineErrorFetchHandler(fn) {
    _errorFetchHandler = fn
  },
  fetch(...args) {
    _beforeFetchHandler()
    return new Promise((resolve, reject) => {
      fetch.apply(window, args).then(res => {
        _afterFetchHandler()
        return res.json()
      }).then(json => {
        if (!json.errcode) {
          resolve(json)
        } else {
          let errorResp
          if (json && json.errcode) {
            errorResp = {
              errcode: json.errcode,
              errmsg: json.errmsg
            }
          } else {
            errorResp = {
              errcode: 500,
              errmsg: JSON.stringify(json)
            }
          }
          _errorFetchHandler(errorResp)
          reject(errorResp)
        }
      }).catch(e => {
        let errorResp = {
          errcode: 500,
          errmsg: '网络出了点小错误，请稍后再试'
        }
        _errorFetchHandler(errorResp)
        reject(errorResp)
      })
    })
  },
  serialize(obj, prefix) {
    let str = []
    for (let p in obj) {
      let value = obj[p]
      if (obj.hasOwnProperty(p) && value !== null && value !== undefined) {
        let k = prefix ? `${prefix}[${p}]` : p
        str.push(typeof value == 'object' ? API.serialize(value, k) : encodeURIComponent(k) + "=" + encodeURIComponent(value))
      }
    }
    return str.join("&")
  },
  get(url, query = {}, opts = {}) {
    return this.fetch(`${url}?${this.serialize(query)}`, {
      headers: {
        'token': localStorage.getItem('token') || ''
      },
      ...opts
    })
  },
  delete(url, query = {}, opts = {}) {
    return this.fetch(`${url}?${this.serialize(query)}`, {
      method: 'DELETE',
      headers: {
        'token': localStorage.getItem('token') || ''
      },
      ...opts
    })
  },
  post(url, form = {}, opts = {}) {
    return this.fetch(url, {
      method: 'POST',
      body: this.serialize(form),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'token': localStorage.getItem('token')
      },
      ...opts
    })
  },
  postJson(url, form = {}, opts = {}) {
    return this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': localStorage.getItem('token') || ''
      },
      ...opts
    })
  },
  postFormData(url, form = {}, opts = {}) {
    let data = new FormData()
    for (let key in form) {
      if (form[key] != null) {
        data.append(key, form[key])
      }
    }
    return this.fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'token': localStorage.getItem('token') || ''
      },
      ...opts
    })
  },
  put(url, form = {}, opts = {}) {
    return this.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': localStorage.getItem('token') || ''
      },
      ...opts
    })
  }
}
export default API