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
    |--- css
         |--- style.css 样式
    |--- engine
         |--- builder.js 方块生成器
         |--- db.js 数据库
         |--- timer.js 定时器
         |--- index.js 引擎逻辑区
    |--- bootstrap.js 引导程模块    
    |--- gamepad.js 游戏手柄模块
    |--- grid.js 网格模块
    |--- notice.js 通知模块
    |--- config.js 配置
    |--- containers.js 各显示内容的容器对象
    |--- template.html html模板文件