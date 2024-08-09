---
title: windows10限制wsl2内存占用过大
tags:
  - wsl2内存占用过大
categories:
  - Docker
permalink: /docker/1ia4ywxvot
date: 2022-03-06 17:50:15
sticky: 4
top: 4
---

# windows10 限制 wsl2 内存占用过大

### 配置文件

1、按下 Windows + R 键，输入 %UserProfile% 并运行进入用户文件夹,新建文件 .wslconfig，文件内容格式如下

```
[wsl2]
memory=1G # 限制最大使用内存
swap=1G # 限制最大使用虚拟内存
processors=1 # 限制最大使用cpu个数
localhostForwarding=true
```

2、cmd 中运行命令关闭当前的子系统

```
wsl --shutdown
```

3、重启 docker Desktop
