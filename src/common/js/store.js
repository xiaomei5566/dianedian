export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    /*JSON.parse() 方法用于将一个 JSON 字符串转换为对象。*/
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  /*JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。*/
  window.localStorage.__seller__ = JSON.stringify(seller)
  /*localStorage.clear();清空*/
}

export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__
  if(!seller){
    return def
  }
  seller = JSON.parse(seller)[id]
  if(!seller){
    return def
  }
  let ret = seller[key]
  return ret || def
}

