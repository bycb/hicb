---
title: js字符串替换其中的某个字符
tags:
  - js
categories:
  - 前端
date: 2020-09-15 09:05:45
permalink: /js/tk4blghbxl
---

# js 字符串替换其中的某个字符

### 替换该字符串中的所有特定字符

```
    /**
     * 字符串中替换所有字符
     * @param {*} f
     * @param {*} e
     * var str='沉默呵，沉默！';
     * var newstr=str.replaceAll('沉默','爆发');
     * 结果：'爆发呵，爆发！'
     */
    String.prototype.replaceAll = function(f, e) { //吧f替换成e
        var reg = new RegExp(f, "g"); //创建正则RegExp对象
        return this.replace(reg, e);
    }
```
