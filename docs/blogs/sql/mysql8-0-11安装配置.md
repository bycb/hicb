---
title: mysql8.0.11安装配置
copyright: true
tags:
  - mysql
categories:
  - 数据库
permalink: /sql/2735a2e6
date: 2019-10-28 13:24:03
---

# mysql8.0.11 安装配置

### 下载

1、MySQL8.0 For Windows zip 包下载地址：https://dev.mysql.com/downloads/file/?id=476233，进入页面后可以不登录。后点击底部“No thanks, just start my download.”即可开始下载。

2、百度网盘
下载链接：https://pan.baidu.com/s/1noY_syZJMdMotE2dfQeorA
提取码：kk8n
复制这段内容后打开百度网盘手机 App，操作更方便哦

### 安装

#### 解压安装包

将压缩包解压到安装目录,目录如下：

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090906237.jpg)

#### 配置环境变量

将解压文件夹下的 bin 路径添加到变量值中，前后以 ; 开头结尾。

#### 初始化 my.ini 文件

```
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
# 切记此处一定要用双斜杠\\，单斜杠我这里会出错，不过看别人的教程，有的是单斜杠。自己尝试吧
basedir=D:\\mysql-8.0.11-winx64
# 设置mysql数据库的数据的存放目录
# 此处同上
datadir=D:\\mysql-8.0.11-winx64\\Data
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
# 服务端使用的字符集默认为UTF8
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8
```

#### 安装

以管理员身份运行 cmd 并且切换至 bin 目录下
执行以下代码,执行完成后会打印初始密码：

```
mysqld --initialize --console
```

注意！执行输出结果里面有一段： [Note][my-010454] [Server] A temporary password is generated for root@localhost: rI5rvf5x5G,E 其中 root@localhost:后面的“rI5rvf5x5G,E”就是初始密码（不含首位空格）。在没有更改密码前，需要记住这个密码，后续登录需要用到。

要是你手贱，关快了，或者没记住，那也没事，删掉初始化的 datadir 目录，再执行一遍初始化命令，又会重新生成的。当然，也可以使用安全工具，强制改密码，用什么方法，自己随意。

参考：https://dev.mysql.com/doc/refman/8.0/en/data-directory-initialization-mysqld.html

#### 服务

在 MySQL 安装目录的 bin 目录下执行命令：

```
mysqld --install [服务名]
```

后面的服务名可以不写，默认的名字为 mysql。当然，如果你的电脑上需要安装多个 MySQL 服务，就可以用不同的名字区分了，比如 mysql5 和 mysql8。

安装完成之后，就可以通过命令 net start mysql 启动 MySQL 的服务了。通过命令 net stop mysql 停止服务。通过命令 sc delete MySQL/mysqld -remove 卸载 MySQL 服务

#### 更改密码

在 MySQL 安装目录的 bin 目录下执行命令：

```
mysql -u root -p
```

这时候会提示输入密码，记住了上面第 3.1 步安装时的密码，填入即可登录成功，进入 MySQL 命令模式。
在 MySQL 中执行命令：

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';

修改密码，注意命令尾的；一定要有，这是 mysql 的语法
到此，安装部署就完成了
