---
title: 内网使用IP地址访问redis
tags:
  - redis
categories:
  - 数据库
permalink: /js/cua81izckt
date: 2020-10-09 10:37:35
---

# 内网使用 IP 地址访问 redis

### 需求

测试环境中 A 机器(192.168.3.5)装有 redis。B 机器(192.168.3.102)需要访问 A 机的 redis.

### 解决

解决方案：找到 redis.windows.conf 配置文件

1. 将 protected-mode 参数改为 no。
2. 注释掉 bind 127.0.0.1
3. 重启 redis 服务

在别人那可以。但是在我的机器上居然不靠谱了，redis 服务居然无法启动。

继续折腾后发现第二步注释掉的代码更改为 bind 0.0.0.0 即可完美解决。
