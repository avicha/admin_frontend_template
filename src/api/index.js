let _beforeFetchHandler = () => {}
let _afterFetchHandler = () => {}
let _errorFetchHandler = ({
  code,
  message
}) => {}

const API = {
  defineBeboreFetchHandler(fn) {
    _beforeFetchHandler = fn
  },
  defineAfterFetchHandler(fn) {
    _afterFetchHandler = fn
  },
  defineErrorFetchHandler(fn) {
    _errorFetchHandler = fn
  },
  restful(name, prefix, methods = ['get', 'list', 'create', 'update', 'delete', 'restore']) {
    const apis = {}
    const API_PREFIX = `${process.env.API_HOST}${prefix}`
    for (const method of methods) {
      switch (method.toLowerCase()) {
        case 'get':
          apis[`get${name}`] = (id) => {
            return API.get(`${API_PREFIX}/${id}`)
          }
          break
        case 'list':
          apis[`list${name}`] = (options) => {
            return API.get(`${API_PREFIX}`, options)
          }
          break
        case 'create':
          apis[`create${name}`] = (object) => {
            return API.postJson(`${API_PREFIX}`, object)
          }
          break
        case 'update':
          apis[`update${name}`] = (object) => {
            return API.put(`${API_PREFIX}/${object.id}`, object)
          }
          break
        case 'delete':
          apis[`delete${name}`] = (id) => {
            return API.delete(`${API_PREFIX}/${id}`)
          }
          break
        case 'restore':
          apis[`restore${name}`] = (id) => {
            return API.put(`${API_PREFIX}/${id}/restore`)
          }
          break
      }
    }
    return apis
  },
  fetch(...args) {
    _beforeFetchHandler()
    return new Promise((resolve, reject) => {
      fetch.apply(window, args).then(res => {
        _afterFetchHandler()
        return res.json()
      }).then(json => {
        if (/^2\d{2}/.test(json.code)) {
          resolve(json.data)
        } else {
          let errorResp
          if (json && json.code) {
            errorResp = {
              code: json.code,
              message: json.message
            }
          } else {
            errorResp = {
              code: 500,
              message: JSON.stringify(json)
            }
          }
          _errorFetchHandler(errorResp)
          reject(errorResp)
        }
      }).catch(e => {
        let errorResp = {
          code: 500,
          message: '网络出了点小错误，请稍后再试'
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