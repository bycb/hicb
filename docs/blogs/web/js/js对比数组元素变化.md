---
title: js对比数组元素变化
tags:
  - 数组
categories:
  - 前端
date: 2019-09-25 09:19:16
permalink: /js/jqht9ujhb2
---

# js 对比数组元素变化

### 问题描述

对比两个数组中元素的变化，返回变化元素的下标

### 代码

```
 /**
  * 判断两个数组
  * 发生改变的元素下标
  * @return 下标数组
  * @param {} q 新数组
  * @param {} c 原数组
  */
 Arr = {}
 Arr.judgeDifferent = function(q,c){
	 var p=[];
	 var maxlen = Math.max(q.length,c.length);
	 var minlen = Math.min(q.length,c.length);
	 for(var i=0; i<maxlen;i++){
	     if(minlen < i){
	 		p.push(i);
	     }else{
	         if(q[i]!=c[i]){
	 			p.push(i);
	         }
	     }
	 }
	 return p;
 }
```
