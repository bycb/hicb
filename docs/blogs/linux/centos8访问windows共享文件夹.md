---
title: centos访问windows共享文件夹
tags:
  - linux
categories:
  - Linux
permalink: /linux/lexikdjyyp
date: 2021-08-12 10:37:35
---

# centos 访问 windows 共享文件夹

### 需求

A 机是 windows 系统主机 ip:192.168.2.102.

主机中有共享文件夹 share

访问账号：test

密码：test

B 机是 centos8 系统，主机 ip192.168.2.110

现在要在 B 机中访问 A 机的共享文件夹中的文件。

### 方式 1

挂载共享文件夹

1、将共享文件夹挂载到/mnt/MyShare 目录下。首先创建改文件夹。

2、使用以下命令挂载

```
$ mount -t cifs -o username="test",password="test" //192.168.2.102/share /mnt/MyShare
```
