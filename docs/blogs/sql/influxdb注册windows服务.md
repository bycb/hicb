---
title: influxdb注册为windows服务
tags:
  - influxdb
categories:
  - 数据库
permalink: /sql/z2ohisnjfo
date: 2019-11-31 09:16:01
---

# influxdb 注册为 windows 服务

### 下载 nssm

[下载地址](http://www.nssm.cc/download)
根据系统选择 32 位 64 位
![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090904966.png)

### 安装

以下是我 influxdb 目录
![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090904667.png)
运行如下命令

```
nssm install influxdbServer
```

配置 nssm,点击 install service
![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090904329.png)
![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090905141.png)

### 完成

系统服务中可以看到 influxdbServer,根据需要启动
![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090905971.png)
