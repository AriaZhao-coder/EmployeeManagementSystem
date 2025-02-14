<h1>员工管理系统</h1>

<h2>一个基于 React 的综合性员工管理系统，具有考勤跟踪、部门管理和分析仪表板等功能。</h2>

<div align="center">
  <img src="src/assets/img/dashboard.jpg" width="500" alt="主页面">
</div>


<h3>✨功能特点</h3>

<h4>一、用户认证<h4>
<div >
账号密码登录和短信验证码登录<br/>
密码找回功能<br/>
用户注册系统
</div>

<div align="center">
<img src="src/assets/img/login.jpg" width="500" alt="登录界面截图">
</div>

<h4>二、数据分析仪表板</h4>
<div>
员工人口统计可视化<br/>
年龄分布图表<br/>
部门人员分布<br/>
资深员工跟踪
</div>

<h4>三、部门管理</h4>
<div>
层级部门结构<br/>
部门树形展示<br/>
部门增删改查操作
</div>

<h4>四、员工管理</h4>
<div>
全面的员工信息管理<br/>
员工筛选和搜索<br/>
头像上传功能
员工绩效考核
</div>

<h4>五、考勤系统</h4>
<div>
考勤记录与跟踪<br/>
违规监控和报告<br/>
考勤统计可视化
</div>

<h4>👋🏻其他功能</h4>
<div>
薪资管理<br/>
奖惩记录<br/>
职级管理
</div>


<h3>项目目录</h3>
```text
src/
├── api/                 # API 接口模块
├── assets/             # 静态资源
├── components/         # 可复用组件
├── layouts/            # 布局组件
├── models/            # 数据模型
├── pages/             # 页面组件
│   ├── dashboard/     # 分析仪表板
│   ├── department/    # 部门管理
│   ├── staff/         # 员工管理
│   └── users/         # 用户认证
└── utils/             # 工具函数
```


<h3>🤖技术栈</h3>
基于 @umijs/max V4 版本<br/>
React 18<br/>
TypeScript 5.0+<br/>
ECharts 可视化图表<br/>
Axios 网络请求<br/>
Day.js 时间处理<br/>


<h3>快速开始</h3>
1. 环境准备
Node.js (18.0.0 或以上)<br/>
npm 或 yarn<br/>
推荐使用 VSCode 编辑器
2. 安装和启动
克隆项目
```bash
git clone [仓库地址]
cd [项目文件夹]
```
安装依赖
```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```
项目启动
```bash
# 开发环境启动（以下命令效果相同）
npm start
# 或
npm run dev
# 或
yarn dev
```
项目构建
```bash
# 生产环境构建
npm run build
# 或
yarn build
```


<h3>开发说明</h3>
```markdown
本项目使用 UmiJS Max 脚手架，首次安装依赖后会自动执行 max setup
开发服务器默认运行在 http://localhost:8000
项目使用 TypeScript，请确保代码符合类型定义
图表可视化使用 ECharts，支持各类数据图表展示
组织架构树使用 react-org-tree 组件实现
```


<h3>注意事项</h3>
```markdown
确保 Node.js 版本符合要求
如遇到依赖安装问题，可尝试删除 node_modules 后重新安装
开发时注意保持良好的 TypeScript 类型定义
提交代码前请确保已完成必要的代码检查
```


<h3>配置说明</h3>
项目使用 TypeScript 配置，详见 tsconfig.json。自定义类型定义在 typings.d.ts 中。


<h3>API 接口说明</h3>
API 模块在 src/api 目录下：
```bash
adminApi.js - 管理员操作
attendanceApi.js - 考勤管理
departmentApi.js - 部门操作
staffApi.js - 员工管理
userApi.js - 用户认证与管理
```


<h3>参与贡献</h3>
Fork 本仓库</br>
创建特性分支 (git checkout -b feature/AmazingFeature)</br>
提交更改 (git commit -m '添加一些特性')</br>
推送到分支 (git push origin feature/AmazingFeature)</br>
提交 Pull Request</br>


