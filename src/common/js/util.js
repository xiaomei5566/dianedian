/*
 * 解析URL参数
 * @example ?id=12345&a=b
 * @return obj{id:12345,a:b}
 * */
export function urlParse() {
  /*获取URL*/
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  /*match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。*/
  let arr = url.match(reg)
  /*['?id=12345','&a=b']*/
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      /*decodeURIComponent解析URI*/
      let key = decodeURIComponent(tempArr[0])
      let value = decodeURIComponent(tempArr[1])
      obj[key] = value
    })
  }
  return obj
}
