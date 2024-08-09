---
tags:
  - Docker
categories:
  - Docker
permalink: /docker/n4wi63yaxq
date: 2021-09-18 14:50:15
---

# DockerPortainer 汉化

## 下载

链接：https://pan.baidu.com/s/1jzZnRArGCYCnP80Ezo8Agw
提取码：ci5c
将其解压并放置到根目录，我的目录：/public/

## 拉取镜像

```
docker pull portainer/portainer
```

## 创建卷

```
docker volume create portainer_data
```

## 启动容器

```
docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data -v /public:/public portainer/portainer
```

## 效果

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090901000.png)
