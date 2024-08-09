---
tags:
  - Docker安装
categories:
  - Docker
permalink: /docker/nraed93tov
date: 2021-11-12 17:50:15
---

# centos8 安装 docker

### 设置仓库

```
$ yum install -y yum-utils device-mapper-persistent-data lvm2
```

设置源地址

```
//官网
$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

```
//阿里云
$ sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

### 安装 Docker Engine-Community

```
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

本步骤如果报错，原因 centos8 默认使用 podman 代替 docker：

```
Error:
Problem 1: problem with installed package podman-2.2.1-7.module_el8.3.0+699+d61d9c41.x86_64
```

上述错误执行以下命令：

```
$ yum erase podman buildah
$ yum install docker-ce docker-ce-cli containerd.io
```

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090858411.png)

### 验证

```
$ docker -v
```

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090900269.png)

### 自启

```
sudo systemctl enable docker
```

### docker compose

```
//运行以下命令以下载 Docker Compose 的当前稳定版本：
sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
//将可执行权限应用于二进制文件：
sudo chmod +x /usr/local/bin/docker-compose
//创建软链：
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
//测试
docker-compose --version


//执行以下命令来运行.yml文件
docker-compose up
//后台运行.yml文件
docker-compose up -d
```

### 问题

错误现象

Camnot comect to the Docker daemn at unix:/1 八 ar/run/docker .sock.Is the docker daemom rumning?

解决方式：对 docker 进行重启

```
守护进程重启   sudo systemctl daemon-reload
重启docker服务   systemctl restart  docker
```
