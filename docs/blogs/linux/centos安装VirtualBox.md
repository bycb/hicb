---
title: centos安装VirtualBox
tags:
  - linux
categories:
  - Linux
permalink: /linux/a2r4yh2aaz
date: 2023-03-10 14:37:35
sticky: 3
top: 3
---

# centos 安装 VirtualBox

### centos 安装虚拟机 virtualbox

1、官网地址https://www.virtualbox.org/

### 安装 VirtualBox

```
# dnf 添加 virtualbox源
sudo dnf config-manager --add-repo=https://download.virtualbox.org/virtualbox/rpm/el/virtualbox.repo
# 查看当前有哪些virtualbox版本
sudo yum search VirtualBox
#以下是返回
Oracle Linux / RHEL / CentOS-8 / x86_64 - VirtualBox 160  B/s | 181  B     00:01
Oracle Linux / RHEL / CentOS-8 / x86_64 - VirtualBox 751  B/s | 1.7 kB     00:02
导入 GPG 公钥 0x98AB5139:
 Userid: "Oracle Corporation (VirtualBox archive signing key) <info@virtualbox.org>"
 指纹: 7B0F AB3A 13B9 0743 5925 D9C9 5442 2A4B 98AB 5139
 来自: https://www.virtualbox.org/download/oracle_vbox.asc
确定吗？[y/N]： y
Oracle Linux / RHEL / CentOS-8 / x86_64 - VirtualBox  82 kB/s | 254 kB     00:03
上次元数据过期检查：0:00:01 前，执行于 2023年03月09日 星期四 14时41分29秒。
=========================================================================================== 名称 和 概况 匹配：VirtualBox ============================================================================================
VirtualBox-5.2.x86_64 : Oracle VM VirtualBox
VirtualBox-6.0.x86_64 : Oracle VM VirtualBox
VirtualBox-6.1.x86_64 : Oracle VM VirtualBox
VirtualBox-7.0.x86_64 : Oracle VM VirtualBox
# 这里我安装virtualbox-6.1
sudo yum -y install VirtualBox-6.1
# 在安装过程中，系统将提示您导入存储库GPG密钥。输入y并点击Enter。(6.1并没有该步骤)
# 想安装更高版本只需改动后面的数字。至此安装成功
```

### 安装 VirtualBox 扩展功能包

VirtualBox Extension Pack 为虚机机中的系统（来宾计算机）提供了一些有用的功能，例如虚拟 USB 2.0 和 3.0 设备，对 RDP 的支持，图像加密等等。当我们想远程打印，打印机的 USB 连接服务器，想让虚拟机中的 Windows 读到打印机，这个扩展必须有啊。
你可以从上面的官网地址点击下载，也可以用下方 wget 命令下载。

```
# 6.1的最高版是6.1.42，下载这个版本的扩展
wget https://download.virtualbox.org/virtualbox/6.1.42/Oracle_VM_VirtualBox_Extension_Pack-6.1.42.vbox-extpack

# 安装
sudo VBoxManage extpack install Oracle_VM_VirtualBox_Extension_Pack-6.1.42.vbox-extpack

# 遇到下面的情况，按y回车
Do you agree to these license terms and conditions (y/n)?

#安装成功
0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%
Successfully installed "Oracle VM VirtualBox Extension Pack".

```

### 启动 VirtualBox

方法一：命令

```
VirtualBox
```

方法二：图形界面

点击 活动（Activities）-> Oracle VM VirtualBox

### 复制 iso 镜像安装系统

将 iso 镜像文件传到 Linux 中开始安装。
新建虚拟机。

虚拟机名称建议写成 Windows10_64，这样底下的版本会对出现对应选项，不然都是 32bit。

windows 的话内存不要小于 4GB。

新系统用新磁盘，磁盘格式默认即可

一定要选固定大小，这样即使中病毒了也不会挤占 linux，而且固定大小的磁盘性能好，不消耗 CPU 性能去做动态分配。

磁盘大小根据自己实际情况哈，Windows10 系统盘尽量不要小于 40GB。我直接来 100G。

创建好后启动虚拟机，选择你下载的 win10 iso 镜像文件，点启动。直到安装成功。

如果提示 AMD-V is disabled in the BIOS (or by the host OS) (VERR_SVM_DISABLED).
重启机器进入 bios，将 SVM 功能打开就没问题了。

装好后屏幕有点小，调成 1600x1200 就行了

### 安装 gcc

提示信息：Please install the gcc make perl packages from your distribution.

```
yum install gcc perl make
```

### 安装 kernel header 文件

提示信息：Please install the Linux kernel "header" files matching the current kernelfor adding new hardware support to the system.The distribution packages containing the headers are probably:kernel-devel kernel-devel-4.18.0-448el8 .x8664

```
#检查当前内核版本
uname -r
#4.18.0-448.el8.x86_64
#查看当前yum仓库中的kernel-devel的版本是否和内核版本一致。如果一致，直接yum install kernel-devel
yum list | grep kernel-devel
#执行命令行，确保看到消息：vboxdrv.sh: Building VirtualBox kernel modules.
rcvboxdrv setup
```

### 虚拟机设置自启

```
#编辑文件写入下列内容
vi /etc/default/virtualbox
#内容：
VBOXAUTOSTART_DB=/etc/vbox
VBOXAUTOSTART_CONFIG=/etc/vbox/vboxauto.conf
#配置启动用户，编辑文件
vi /etc/vbox/vboxauto.conf
#内容（注：将 root 替换成你实际的用户，这个用户加入了vboxusers组，用来操作 VBoxManage 的用户）：
default_policy = deny
root= {
allow = true
}
#修改 vbox 目录权限
usermod -a -G vboxusers $USER
chgrp vboxusers /etc/vbox
chmod 1775 /etc/vbox
#设置dbpath属性
$ VBoxManage setproperty autostartdbpath /etc/vbox
$ VBoxManage list systemproperties
···
···
Autostart database path:        /etc/vbox
#指定虚拟机自动启动
VBoxManage modifyvm windows7 --autostart-enabled on --autostop-type acpishutdown
# ls /etc/vbox可以看到生成了以用户名开始的两个文件
root.start  root.stop
#重启 vboxauto 服务
systemctl restart vboxautostart-service.service
systemctl enable vboxautostart-service.service
好了，重启主机，虚拟机已经自动运行了
```

### 卸载

```
yum remove VirtualBox-7.0
```

### SELinux 问题

```
# SELinux 工作模式可以在/etc/selinux/config中设置。以下是三种模式
enforcing  //强制模式。违反 SELinux 规则的行为将被阻止并记录到日志中
permissive  //宽容模式。违反 SELinux 规则的行为只会记录到日志中。一般为调试用
disabled  //关闭 SELinux
#以下是文件内容

# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
SELINUX=disabled
# SELINUXTYPE= can take one of these three values:
#     targeted - Targeted processes are protected,
#     minimum - Modification of targeted policy. Only selected processes are protected.
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted
```
