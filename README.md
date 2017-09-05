# ES-X版俄罗斯方块

> 本地编译操作

    // 安装依赖文件
    npm install
    // 编译并打包文件
    gulp build

> 目录介绍

    src
    |--- var
         |--- globalDOM,js 游戏机DOM对象
         |--- actionDOM.js 操作面板DOM对象
         |--- announcementDOM.js 公告面板DOM对象
         |--- gridDOM.js 网格DOM对象
         |--- actionEnumeration.js 操作枚举类型
         |--- gridConfig.js 网格配置项
         |--- tetris.js 全局数据
    |--- action.js 操作模块
    |--- announcement.js 公告模块
    |--- grid.js 网格模块
    |--- engine.js 引擎模块
    |--- block.js 方块类
    |--- blockBuilder.js 方块生成器
    |--- bootstrap.js 引导程序
    |--- common.js 通用方法类
    |--- blockBuilder.js 方块生成器

> 浏览器支持

    Chrome 60+, Edge 40+, IE9+