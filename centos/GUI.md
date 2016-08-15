# CentOS 7安装Gnome GUI 图形界面
>1. 在命令行下输入下面的命令来安装 Gnome 包

>   在安装Gnome 包之前，我们需要先检查下安装源是否正常，因为我们要通过yum命令来安装gnome包， 而yum命令式通过yum 源来下载安装包的。

>    ```yum groupinstall "GNOME Desktop" "Graphical Administration Tools"```

>2. 更新系统的运行级别
> 如果你想在系统下次启动的时候自动进入图形界面，那么我们需要更改系统的运行级别，输入下面的命令来启用图形界面。

>   ```ln -sf /lib/systemd/system/runlevel5.target /etc/systemd/system/default.target```

>3. 重启系统
>   当系统再次启动的时候，就会默认进入图形界面。

>   [参考链接](http://www.centoscn.com/image-text/config/2015/0528/5552.html "CentOS 7安装Gnome GUI 图形界面")
