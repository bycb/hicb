---
title: flvjs代码构建
tags:
  - flvjs
categories:
  - 前端
permalink: /js/1ebee110
date: 2019-09-19 13:02:04
sticky: 2
top: 2
---

# flvjs 代码构建

### 源码下载

[Github 地址：https://github.com/bilibili/flv.js](https://github.com/bilibili/flv.js)

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090912908.png)

网盘：
链接：https://pan.baidu.com/s/1TNLiD64USj6MR6F-GGKLHQ
提取码：f78q

### 开始

#### 1、环境

构建代码需要 npm.安装 node 环境，在此不再重复。
以 win10 为例
以管理员省份运行 cmd,并切换路径至源码目录

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090912993.png)
![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090912889.png)

#### 2、执行以下命令

```
npm install
```

文件下会多出一个目录，如图

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090913344.png)

##### 问题及解决

如果该步骤会出错，如下图：

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090913691.png)

下一步：

```
npm audit fix
```

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090913206.png)

下一步：

```
npm audit fix --force
```

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090914267.png)

#### 3、安装 gulp

命令：

```
npm install -g gulp
```

安装成功如图：

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090914250.png)

#### 4、build js 文件

命令：执行成功后可以在 dist 目录下看到相应.js

```
gulp release
```

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090914530.png)
![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090914200.png)

##### 问题及解决

如果报错：

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090915662.png)

执行以下命令查看 gulp 版本：

```
gulp -v
```

发现版本不一致,在这我们将版本统一到 3.9.1：

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090915086.png)

执行以下命令：

```
npm i -g gulp@3.9.1
```

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090915358.png)

将开发环境中的 4.0.2 版本降级到 3.9.1。如遇下图问题直接忽略即可。再次查看版本，可以看到版本一致，再次构建 js

```
npm install --save-dev gulp@3.9.1
```

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090915810.png)
![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090915370.png)
