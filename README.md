# ES-X版俄罗斯方块

> 本地编译操作

    // 初次编译时，需要安装依赖
    npm install
    // 开发环境，编译、启动项目
    npm run dev    
    // 生产环境，编译、打包项目
    npm run build

> 目录介绍

    src
    |--- var
         |--- containers.js 各模块DOM容器对象
         |--- config.js 各配置常量
    |--- bootstrap.js 引导程模块
    |--- engine.js 引擎模块
    |--- gamepad.js 游戏手柄模块
    |--- grid.js 网格模块
    |--- notice.js 通知模块        