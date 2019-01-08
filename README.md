# ECMAScript-X版俄罗斯方块

## 本地编译操作
```
    // 初次编译时，需要安装依赖
    npm install
    // 开发环境，编译、启动项目
    npm run dev    
    // 生产环境，编译、打包项目
    npm run build  
```

## 目录介绍
```
    src
    |--- control
         |--- button.js 按钮类
         |--- index.js 控制板主流程
    |--- engine
         |--- animation.js 动画
         |--- builder.js 方块形状生成器
         |--- db.js 数据库
         |--- shape.js 方块形状类
         |--- timer.js 定时器
         |--- index.js 引擎主流程
    |--- html
         |--- template.html html模板文件
    |--- screen
         |--- block.js 方块类
         |--- digit.js 数字类
         |--- digitsequnce.js 数字序列类
         |--- index.js 屏幕主流程
         |--- matrix.js 方块矩阵
         |--- state.js 状态
    |--- bootstrap.js 引导程序
    |--- canvas.js 画布类
    |--- config.js 配置文件
    |--- gamepanel.js 游戏面板    
    |--- util.js 功能模块  
```