# lottery-platform
### 介绍
一个使用vue-electron脚手架做的小小的客户端demo，使用indexedDB永久存储数据，一直都找不到本地存储的一些应用场景，感觉indexedDB，websql用于像electron跨平台的嵌浏览器内核的应用非常合适，因为这些数据具有永久性、加密性和事务性，比较安全可靠。（现在不是快到过年的，小伙伴可以利用这个项目疯狂tip老板年终奖[偷笑]）
### 本项目使用
管理人员还是抽奖人员的初始账号和密码都是**admin**，进入管理后，**修改admin账号后，admin的姓名作为账号，工号作为密码登录**，如果忘记密码，可以去*C:\Users\Administrator\AppData\Roaming\lottery-platform*删除*IndexedDB*文件夹里面的文件，之后的用户名和密码为初始值admin
```
yarn
yarn run dev //本地开发
yarn run win32 //打包32位window程序，win64-打包64位window程序,linux-打包linux程序 all-打包所有程序，yarn run build会根据你的系统进行打包
```
这是[32位的window程序](https://juststart-lic.github.io/lottery-platform/lottery-platform-Setup-0.0.1.exe)，有兴趣的可以下载玩玩，安装时可能会给杀毒软件拦截，添加信任即可。
### 项目效果图
样式有点丑，没有设计过。
##### 管理员登录
![管理员登录](https://juststart-lic.github.io/lottery-platform/2.png)
##### 人员管理
![人员管理](https://juststart-lic.github.io/lottery-platform/3.png)
##### 奖项设置
![奖项设置](https://juststart-lic.github.io/lottery-platform/4.png)
##### 往期回顾
![往期回顾](https://juststart-lic.github.io/lottery-platform/9.png)
##### 抽奖登录
![抽奖登录](https://juststart-lic.github.io/lottery-platform/7.png)
##### 抽奖
![抽奖](https://juststart-lic.github.io/lottery-platform/212.gif)
### 注意事项
- 这是使用electron-builder打包，打包时可能下载相对文件失败，到[淘宝镜像网站](https://npm.taobao.org/mirrors/electron/)下载相对应的下载不了的文件。
- 打包失败有时候可以删除build下的旧的打包文件，执行
```
    yarn build:clean
```
### 意义
本项目主要用于electron入门级别的，大神级别的请跳过（可以娱乐娱乐）。项目主要集中在渲染进程，主线程，如一些插件的使用几乎没有，入门级应该是够的，要更深入的要去官网多看看主线程，渲染进程的一些api，还有应用的一些插件。个人觉得，主线程充当桥梁的作用，通过渲染进程触发主线程中的功能，认清楚这一点，使用electron就非常简单了。
