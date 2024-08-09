---
title: stringRedisTemplate模糊匹配删除
tags:
  - redis
categories:
  - Java
permalink: /java/o7cx6dlnlu
date: 2021-12-05 09:16:01
---

# stringRedisTemplate 模糊匹配删除

```
	/**
	 * 删除
	 */
	public void removeAll(String key){
		Set<String> keys = stringRedisTemplate.keys(key + "*");
		stringRedisTemplate.delete(keys);
	}
```
