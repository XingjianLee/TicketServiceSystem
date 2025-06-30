# Skyward Voyager Booking 飞机订票系统

## 项目简介

Skyward Voyager Booking 是一个现代化的飞机订票系统，支持航班搜索、智能推荐、在线选座、订单管理、个人信息维护、消息通知等功能。界面美观，体验流畅，适合企业级应用和二次开发。

## 技术栈

- **React 18** + **TypeScript**
- **Vite** 极速开发与构建
- **Tailwind CSS** + **shadcn/ui** 组件库
- **React Router v6** 多页面路由
- **@tanstack/react-query** 数据管理
- **Radix UI** 交互基础
- 现代响应式设计，支持暗色/亮色主题

## 主要功能

- 多页面路由（主页、航班搜索、订单、通知、个人中心、登录注册等）
- 智能航班搜索与推荐
- 在线选座（仅限起飞前，支持消息提醒）
- 订单管理与支付流程
- 个人信息与会员系统
- 全局消息通知、弹窗、动画
- 响应式适配与暗色模式

## 目录结构

```
skyward-voyager-booking/
├── public/                # 静态资源
├── src/
│   ├── components/        # 业务组件（如UserAuth, FlightSearch, Dashboard等）
│   │   └── ui/            # 通用UI组件（Button, Card, Tabs等）
│   ├── pages/             # 页面（Index.tsx主入口, NotFound.tsx等）
│   ├── hooks/             # 自定义hooks
│   ├── lib/               # 工具库
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── package.json           # 依赖与脚本
├── tailwind.config.ts     # Tailwind配置
├── tsconfig.json          # TypeScript配置
├── vite.config.ts         # Vite配置
└── README.md              # 项目说明
```

## 快速开始

1. **克隆项目**
   ```sh
   git clone <YOUR_GIT_URL>
   cd skyward-voyager-booking
   ```
2. **安装依赖**
   ```sh
   npm install
   ```
3. **本地开发**

   ```sh
   npm run dev
   ```

   访问 http://localhost:8080

4. **构建生产包**

   ```sh
   npm run build
   ```

5. **预览生产包**
   ```sh
   npm run preview
   ```

## 主要页面

- `/` 主页（品牌展示、航班入口）
- `/search` 航班搜索与推荐
- `/orders` 我的订单管理
- `/notices` 最新通知与消息提醒
- `/profile` 个人信息与会员中心
- `/auth` 登录/注册
- `/dashboard` 登录后仪表盘

## 特色说明

- 仅在航班起飞前可选座，选座入口在 Dashboard 和通知页
- 所有页面支持暗色/亮色主题自动切换
- 顶部导航栏全局固定，内容区自动适配
- 代码结构清晰，便于二次开发和团队协作

## 许可证

本项目默认未附带 LICENSE，如需开源请自行添加。

---

如有问题或建议，欢迎提 Issue 或 PR！
