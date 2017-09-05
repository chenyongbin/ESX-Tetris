# ES-X版俄罗斯方块

> 本地编译操作

    // 初次编译时，需要安装全局gulp
    npm install -g gulp
    // 安装依赖文件
    npm install
    // 编译并打包文件
    gulp build

> 目录介绍

    src
    |--- var
         |--- doms,js 各模块DOM对象
         |--- constants.js 各配置常量
    |--- action.js 操作模块
    |--- announcement.js 公告模块
    |--- grid.js 网格模块
    |--- engine.js 引擎模块
    |--- block.js 方块类
    |--- blockBuilder.js 方块生成器
    |--- bootstrap.js 引导程序
    |--- util.js 实用模块

> 浏览器支持

    Chrome 60+, Edge 40+, IE9+, Safrari