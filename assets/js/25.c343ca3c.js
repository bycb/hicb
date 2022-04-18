(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{544:function(n,e,t){"use strict";t.r(e);var s=t(8),r=Object(s.a)({},(function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h3",{attrs:{id:"系统相关"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#系统相关"}},[n._v("#")]),n._v(" 系统相关")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("关机 shutdown -h now\n\n重启 shutdown -r now  或 reboot\n\n内存占用：free -m\n      或： top\n\n重启网络：service network restart\n")])])]),t("h3",{attrs:{id:"图形界面切换"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#图形界面切换"}},[n._v("#")]),n._v(" 图形界面切换")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("#切换到dos界面\ninit 3\n#切换到图形界面\ninit 5\n#查看当前开机启动模式,graphical.target代表开机时启动图形化界面,multi-user.target代表开机时启动dos界面\nsystemctl get-default\n#设置开机启动图形界面\nsystemctl set-default graphical.target \n#开机启动dos界面\nsystemctl set-default multi-user.target \n")])])]),t("h3",{attrs:{id:"文件与目录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#文件与目录"}},[n._v("#")]),n._v(" 文件与目录")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("- cat:查看文件内容\n- ls：显示文件或目录信息\n- mkdir：当前目录下创建一个空目录\n- rmdir：要求目录为空\n- touch：生成一个空文件或更改文件的时间\n- cp：复制文件或目录\n- mv：移动文件或目录、文件或目录改名\n- rm：删除文件或目录\n- ln：建立链接文件\n- find：查找文件\n\n例子：将目录A重命名为B\n\nmv A B\n\n例子：将/a目录移动到/b下，并重命名为c\n\nmv /a /b/c\n")])])]),t("h3",{attrs:{id:"shell文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#shell文件"}},[n._v("#")]),n._v(" shell文件")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("#格式\n#!/bin/bash\n\n\n#自定义sh脚本安装服务：\n#路径如下：/usr/lib/systemd/system\n#内容如下\n[Unit]\nDescription=my Service\n\n[Service]\nType=simple\nExecStart=/bin/bash /root/my/run.sh\nExecReload=\nExecStop=/bin/bash /root/my/run.sh\n\n[Install]\nWantedBy=multi-user.target\n\n#重新加载服务\nsystemctl daemon-reload\n")])])]),t("h3",{attrs:{id:"服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#服务"}},[n._v("#")]),n._v(" 服务")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("systemctl常见命令:\n\nsystemctl is-enabled servicename.service #查询服务是否开机启动\n\nsystemctl enable *.service #开机运行服务\n\nsystemctl disable *.service #取消开机运行\n\nsystemctl start *.service #启动服务\n\nsystemctl stop *.service #停止服务\n\nsystemctl restart *.service #重启服务\n\nsystemctl reload *.service #重新加载服务配置文件\n\nsystemctl status *.service #查询服务运行状态\n\nsystemctl --failed #显示启动失败的服务\n")])])]),t("h3",{attrs:{id:"更换内核"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#更换内核"}},[n._v("#")]),n._v(" 更换内核")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('参考链接：https://elrepo.org/linux/kernel/el7/x86_64/RPMS/\nhttps://buildlogs.centos.org/c7.1810.u.x86_64/kernel/20190514212200/3.10.0-957.12.2.el7.x86_64/\nhttp://mirror.centos.org/centos/7/updates/x86_64/Packages/\nhttp://mirror.centos.org/centos/6/updates/x86_64/Packages/\n\n内核选择\nkernel-lt（lt=long-term）长期有效\nkernel-ml（ml=mainline）主流版本\n\n从链接里找到对应的内核版本下载\n1.uname -r 查看内核版本\n2.rpm -qa | grep kernel 查看rpm包\n3.grub2-editenv list 查看当前默认内核\n4.yum remove kernel-3.10.0-957.21.3.el7.x86_64 删除旧内核，本次没有用上\n5.wget https://elrepo.org/linux/kernel/el7/x86_64/RPMS/kernel-ml-5.16.16-1.el7.elrepo.x86_64.rpm 下载内核\n6.rpm -ivh kernel-ml-5.16.16-1.el7.elrepo.x86_64.rpm --force --nodeps安装内核\n6.grub2-editenv list 查看当前默认内核\n7.grub2-set-default \'CentOS Linux (3.10.0-957.27.2.el7.x86_64) 7 (Core)\' 修改为最新的内核启动\n8.reboot 重启\n9.uname -r\n\n\n#centos8内核更换升级\n\n#1导入ELRepo仓库的公共密钥：\nrpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org\n#安装ELRepo仓库的yum源：\nyum install https://www.elrepo.org/elrepo-release-8.el8.elrepo.noarch.rpm\n#2可用的系统内核安装包：\nyum --disablerepo="*" --enablerepo="elrepo-kernel" list available\n#3安装最新版内核\nyum --enablerepo=elrepo-kernel install kernel-ml\n#4设置以新的内核启动 ，0 表示最新安装的内核，设置为 0 表示以新版本内核启动：以后不需要第5步，直接使用这条指定不同数字设置不同内核版本启动。\ngrub2-set-default 0\n#5生成grub配置文件并重启系统\ngrub2-mkconfig -o /boot/grub2/grub.cfg\nreboot\n#6验证新内核\nuname -r\n')])])]),t("h3",{attrs:{id:"网卡"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#网卡"}},[n._v("#")]),n._v(" 网卡")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('#双网卡绑定，路径：/etc/sysconfig/network-scripts/ 现有网卡1：配置_1 网卡2：enp2s0，在已有的网卡配置文件中增加最后两行即可\n\n#主文件配置ifcfg-bond0内容\nDEVICE=bond0\nBOOTPROTO=static\nNAME=bond0\nTYPE=bond\nONBOOT=yes\nNETMASK=255.255.255.0\nIPADDR=192.168.100.33\nGATEWAY=192.168.100.1\nUSERCTL=no\nBONDING_MASTER=yes\nBONDING_OPTS="miimon=200 mode=1"\n\n#网卡一配置\nTYPE=Ethernet\nPROXY_METHOD=none\nBROWSER_ONLY=no\nBOOTPROTO=none\nIPADDR=192.168.100.32\nPREFIX=24\nGATEWAY=192.168.100.1\nDNS1=192.168.100.1\nDEFROUTE=yes\nIPV4_FAILURE_FATAL=no\nIPV6INIT=yes\nIPV6_AUTOCONF=yes\nIPV6_DEFROUTE=yes\nIPV6_FAILURE_FATAL=no\nIPV6_ADDR_GEN_MODE=stable-privacy\nNAME="配置 1"\nUUID=e35bcc3c-0588-40c3-b778-2777e4aebf58\nONBOOT=yes\n#只需要增加下面两行即可\nMASTER=bond0\nSLAVE=yes\n\n#网卡2配置\nTYPE=Ethernet\nPROXY_METHOD=none\nBROWSER_ONLY=no\nBOOTPROTO=none\nDEFROUTE=yes\nIPV4_FAILURE_FATAL=no\nIPV6INIT=yes\nIPV6_AUTOCONF=yes\nIPV6_DEFROUTE=yes\nIPV6_FAILURE_FATAL=no\nNAME=enp2s0\nUUID=b50a6145-864b-4d84-99fc-fa86438cf8ca\nDEVICE=enp2s0\nONBOOT=yes\nIPADDR=192.168.100.22\nPREFIX=24\nGATEWAY=192.168.100.1\nDNS1=192.168.100.1\n#只需要增加下面两行即可\nMASTER=bond0\nSLAVE=yes\n\n#重启网卡\nsystemctl restart NetworkManager.service\n或者\nnmcli networking off\nnmcli networking on\n')])])]),t("copyright")],1)}),[],!1,null,null,null);e.default=r.exports}}]);