---
tags:
  - Docker
  - k8s
categories:
  - Kubernetes
permalink: /docker/i1ig609yg7
date: 2022-03-12 17:50:15
---

# 使用 kubeadm 搭建 kubernetes 集群

### 准备工作

1、为了方便使用虚拟机。系统版本:CentOS-7-x86_64-DVD-2009.最少 3 台。配置要求：2 核 3G。

2、对系统环境进行配置，以下命令 3 台机器都需要执行。

4、保证 3 台机器属于同一局域网，并且可以访问公网。节点名称对应 ipr 如下：

master 节点：192.168.18.132 node1:192.168.18.133 node2:192.168.18.134

#### 关闭防火墙

关闭防火墙禁用开机自启。

```
systemctl stop firewalld
systemctl disable firewalld
```

#### 关闭 selinux

关闭 selinux,一种永久关闭，一种临时关闭。我执行永久关闭

```
#永久
sed -i 's/enforcing/disabled/' /etc/selinux/config
#临时
setenforce 0
```

#### 关闭 swap

```
free -g #查看
swapoff -a #临时关闭
vim /etc/fstab #永久关闭需重启
```

#### 更改主机名

一台 master,两台 node 分别为 node1 和 node2。并且给 master 节点增加 hosts（只给 master）

```
#更改master节点名称
hostnamectl set-hostname k8s-master
#重新加载使其生效
bash

#在master节点添加hosts（只给master）
vi /etc/hosts
#内容如下，ip与节点名对应
192.168.18.132 k8s-master
192.168.18.133 k8s-node1
192.168.18.134 k8s-node2

#更改node1节点名称
hostnamectl set-hostname k8s-node1
#重新加载使其生效
bash

#更改node2节点名称
hostnamectl set-hostname k8s-node2
#重新加载使其生效
bash
```

#### 将桥接的 iPv4 流量传递到 iptable 的链

```
vi /etc/sysctl.d/k8s.config

#内容如下
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1

# 加载配置文件
sysctl --system
```

#### 时间同步

```
yum install ntpdate -y
ntpdate time.windows.com
```

#### 安装 docker 并启动

安装步骤不在多说，参考 docker 相关文章

https://hicb.gitee.io/docker/nraed93tov

```
sudo service docker restart
```

#### 配置阿里云源

```
cat <<EOF > /etc/yum.repos.d/kubernetes.repo

#内容如下
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

#### 安装 kubeadm,kubelet 和 kubectl

```
yum install -y kubelet-1.19.0 kubeadm-1.19.0 kubectl-1.19.0

#由于官网未开放同步方式, 可能会有索引gpg检查失败的情况, 这时请用
yum install -y --nogpgcheck kubelet kubeadm kubectl
#开机启动
systemctl enable kubelet
```

至此，所需环境准备完成，下一步搭建 master 节点

### master 节点初始化

apiserver-advertise-address 主节点的 ip 地址

image-repository 镜像地址

kubernetes-version 版本应与 kubeadm 版本一致

pod-network-cidr 部署网络时会用到

```
kubeadm init \
--apiserver-advertise-address=192.168.18.132 \
--image-repository registry.aliyuncs.com/google_containers \
--kubernetes-version v1.23.4 \
--service-cidr=10.96.0.0/12 \
--pod-network-cidr=10.244.0.0/16 \
--ignore-preflight-errors=all
```

#### 问题及解决方案：

```
The HTTP call equal to 'curl -sSL http://localhost:10248/healthz' failed with error: Get "http://localhost:10248/healthz": dial tcp [::1]:10248: connect: connection refused.
```

原因是之前我的 Docker 是用 yum 安装的，docker 的 cgroup 驱动程序默认设置为 systemd。默认情况下 Kubernetes cgroup 为 system，我们需要更改 Docker cgroup 驱动

解决方法：

```
vim /etc/docker/daemon.json
#内容如下
{
  "exec-opts": ["native.cgroupdriver=systemd"]
}
#重启docker并且kubeadm重置后再次执行init
systemctl restart docker
kubeadm reset
```

#### 配置文件拷贝

在初始化完成后，会提示需要拷贝配置文件到默认路径下，至此可以进行集群管理了。

```
 mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 部署网络

下载 yaml 文件

```
wget https://docs.projectcalico.org/manifests/calico.yaml
```

更改其中的 CALICO_IPV4POOL_CIDR 变量值,更改为 init 时的 pod-network-cidr 变量的值 10.244.0.0/16，更改完成后

```
kubectl apply -f calico.yaml
```

#### 问题及解决

如果下载失败，则需要手动拉取。查看所需镜像

```
cat calico.yaml |grep image

#手动拉取
docker pull calico/cni:v3.22.1
docker pull calico/pod2daemon-flexvol:v3.22.1
docker pull calico/node:v3.22.1
docker pull calico/kube-controllers:v3.22.1
```

### 加入节点

在 node1 和 node2 节点中执行以下命令。

```
sudo yum install -y
kubeadm join 192.168.18.132:6443 --token yl4z8b.rufwz67v4f58fx3f \
	--discovery-token-ca-cert-hash sha256:5ad823d0773b1e437711e4a929aaa2e9390899b8d6a2c1b634f4c7e9f44dd123
```

查看节点

```
kubectl get pods -n kube-system
```

日志

```
//kubelet日志
journalctl -u kubelet > a
```

### 部署 dashboard

下载 yaml 文件,增加 type:NodeProt 属性

```
wget https://raw.fastgit.org//kubernetes/dashboard/v2.5.0/aio/deploy/recommended.yaml
```

运行

```
kubectl apply -f recommended.yaml
```

查看端口

```
kubectl get pods,svc -n kubernetes-dashboard
```

创建用户

```
kubectl create serviceaccount dashboard-admin -n kube-system
```

用户授权

```
kubectl create clusterrolebinding dashboard-admin --clusterrole=cluster-admin --serviceaccount=kube-system:dashboard-admin
```

获取 token

```
kubectl describe secrets -n kube-system $(kubectl -n kube-system get secret | awk '/dashboard-admin/{print$1}')
```

重启

```
kubectl replace --force -f recommended.yaml
#查看dashboard运行在那台机器上面
kubectl get pods -n kube-system -o wide

```
