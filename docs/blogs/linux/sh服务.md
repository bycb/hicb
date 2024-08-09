---
title: centos中sh文件安装成服务
tags:
  - linux
categories:
  - Linux
permalink: /linux/ep2m2t7p6z
date: 2022-03-12 10:37:35
---

# centos 中 sh 文件安装成服务

### 创建 sh 文件

文件目录：/root/my

#### 启动 run.sh

```
#!/bin/sh
cd /root/my
proxy client -P 123.123.123.123:30001 -T tcp -C proxy.crt -K proxy.key --k default
```

#### 停止 stop.sh

```
#!/bin/sh
//查找xxx进程并杀死
pgrep xxx | xargs kill -s 9
```

### 验证 sh

```
./run.sh
./stop.sh

//权限不够
chmod 777 run.sh
```

### 创建 service 文件

```
cd /usr/lib/systemd/system/

vi my.service

//内容如下
[Unit]
Description=my Service

[Service]
Type=simple
ExecStart=/bin/bash /root/my/run.sh
ExecReload=
ExecStop=/bin/bash /root/my/run.sh

[Install]
WantedBy=multi-user.target
```

### 刷新

```
systemctl daemon-reload

```

### 启动停止

```
//启动
systemctl start my.service
//停止
systemctl stop my.service
```

### 查询进程

```

 ps aux
```
