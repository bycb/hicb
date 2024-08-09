---
title: mysql8忘记密码后重置root密码
date: 2020-09-22 16:24:56
tags:
  - mysql
categories:
  - 数据库
permalink: /sql/01aue07pw5
sticky: 1
top: 1
---

# mysql8 忘记密码后重置 root 密码

所有 cmd 命令行都要以管理员身份运行，并切换至 mysql 安装文件\bin 目录下。

### 关闭服务进入安全模式。

在 cmd 命令行中输入以下命令,停止 mysql 服务。

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090908349.png)

```
net stop mysql
```

服务停止后输入下列命令进入安全模式。本窗口不要关闭！不要关闭！重新打开一个新的 cmd 窗口，在新窗口中输入 mysql 就可以进入。

```
mysqld --console --skip-grant-tables --shared-memory
```

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090906469.png)

依次执行下列命令进行密码修改.

```
use mysql;
flush privileges;
alter user 'root'@'localhost' IDENTIFIED BY '123456';
```

### 更改密码

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090906392.png)

关闭以上两个 cmd 窗口，重新打开一个新 dos 窗口。启动 mysql 服务.

```
net start mysql
```

执行以下命令,输入刚才设置的密码进行登录。可以登录成功。

```
mysql -u 'root' -p
```

此时使用 Navicat 进行登录仍然不能登录，则需要以下操作：

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
```
