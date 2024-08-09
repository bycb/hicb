---
title: 多浏览器标签共享sessionStorage
tags:
  - js
  - sessionStorage
categories:
  - 前端
permalink: /js/f2qz4kz7i6
date: 2020-11-12 10:37:35
---

# 多浏览器标签共享 sessionStorage

```
function getSessionData() {
  let sessionKeys = Object.keys(sessionStorage)
  let data = {}
  for (let i = 0; i < sessionKeys.length; i++) {
    //可以对key 进行分析从而决定是否要删除sessionStorage 里的缓存
    data[sessionKeys[i]] = sessionStorage.getItem(sessionKeys[i])
  }
  return JSON.stringify(data)
}

function setSessionData(d) {
  let data = JSON.parse(d)
  let dataKeys = Object.keys(data)
  for (let i = 0; i < dataKeys.length; i++) {
    sessionStorage.setItem(dataKeys[i], data[dataKeys[i]])
  }
}

//1.  触发标志位改变事件
window.localStorage.setItem('sessionStorageFlag', Date.now().toString())
window.addEventListener('storage', function (event) {
  if (!event.newValue) {
    return
  }
  // 2. 监听标志位改变事件
  if (event.key === 'sessionStorageFlag') {
    // 3. 触发传递信息的改变事件
    localStorage.setItem('storeSessionData', getSessionData())
    console.log(
        sessionStorage.getItem('sys-token')
    )
    localStorage.removeItem('storeSessionData')
  } else if (event.key === 'storeSessionData') {
    // 4. 监听 传递信息 的改变事件
    setSessionData(event.newValue)
    console.log(
        sessionStorage.getItem('sys-token')
    )
  }
})

```
