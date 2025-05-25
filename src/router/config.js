export const routeMap = {
  LeagueOfLegends: '英雄联盟',
  MineCraft: '我的世界',
  PenguinFight: '全民大乐斗',
  QQFight: 'Q宠大乐斗',
  Auth: '权限管理',
  UserCenter: '个人中心',
  DefaultError: '404'
}

export const routes = [
  {
    path: "/",
    component: () => import("../views/IndexHome.vue"),
  },
  {
    path: "/LeagueOfLegends",
    component: () => import("../views/LeagueOfLegends/DefaultIndex.vue"),
  },
  {
    path: "/MineCraft",
    component: () => import("../views/MineCraft/DefaultIndex.vue"),
  },
  {
    path: "/PenguinFight",
    component: () => import("../views/PenguinFight/DefaultIndex.vue"),
    redirect: "/PenguinFight/home",
    children: [
      {
        path: "/PenguinFight/home", // 首页
        component: () => import("../views/PenguinFight/children/IndexHome.vue"),
      },
      {
        path: "/PenguinFight/skin", // 皮肤
        component: () =>
          import("../views/PenguinFight/children/skin/IndexHome.vue"),
      },
      {
        path: "/PenguinFight/team", // 帮派
        component: () =>
          import("../views/PenguinFight/children/team/IndexHome.vue"),
      },
      {
        path: "/PenguinFight/combo", // 密卷
        component: () =>
          import("../views/PenguinFight/children/combo/IndexHome.vue"),
      },
      {
        path: "/PenguinFight/prestige", // 经脉
        component: () =>
          import("../views/PenguinFight/children/prestige/IndexHome.vue"),
      },
      {
        path: "/PenguinFight/divineWeapon", // 神兵
        component: () =>
          import("../views/PenguinFight/children/divineWeapon/IndexHome.vue"),
      },
      {
        path: "/PenguinFight/marry", // 游历
        component: () =>
          import("../views/PenguinFight/children/marry/IndexHome.vue"),
      },
      {
        path: "/PenguinFight/entourage", // 随从
        component: () =>
          import("../views/PenguinFight/children/entourage/IndexHome.vue"),
      },
      {
        path: "/PenguinFight/book", // 异闻录
        component: () =>
          import("../views/PenguinFight/children/book/IndexHome.vue"),
      },
      {
        path: "/PenguinFight/report", // 举报
        component: () =>
          import("../views/PenguinFight/children/report/DefaultIndex.vue"),
      },
      {
        path: "/PenguinFight/martial/upgrade", // 强化
        component: () =>
          import("../views/PenguinFight/children/martial/MartialUpgrade.vue"),
      },
      {
        path: "/PenguinFight/martial/refine", // 精炼
        component: () =>
          import("../views/PenguinFight/children/martial/MartialRefine.vue"),
      },
      {
        path: "/PenguinFight/pet/introduction", // 召唤兽简介
        component: () =>
          import("../views/PenguinFight/children/pet/PetIntroduction.vue"),
      },
      {
        path: "/PenguinFight/pet/stunt", // 召唤兽特技
        component: () =>
          import("../views/PenguinFight/children/pet/PetStunt.vue"),
      },
      {
        path: "/PenguinFight/pet/fourImages", // 四象
        component: () =>
          import("../views/PenguinFight/children/pet/PetFourImages.vue"),
      },
      {
        path: "/PenguinFight/border/front", // 法阵
        component: () =>
          import("../views/PenguinFight/children/border/BorderFront.vue"),
      },
      {
        path: "/PenguinFight/border/introduction",
        component: () =>
          import(
            "../views/PenguinFight/children/border/introduction/IndexHome.vue"
          ),
        redirect: "/PenguinFight/border/introduction/stunt",
        children: [
          {
            path: "/PenguinFight/border/introduction/stunt", // 结界特技
            component: () =>
              import(
                "../views/PenguinFight/children/border/introduction/BorderIntroductionStunt.vue"
              ),
          },
          {
            path: "/PenguinFight/border/introduction/rune", // 结界符文
            component: () =>
              import(
                "../views/PenguinFight/children/border/introduction/BorderIntroductionRune.vue"
              ),
          },
        ],
      },
      {
        path: "/PenguinFight/mine", // 矿山
        component: () =>
          import("../views/PenguinFight/children/mine/index.vue"),
      },
      {
        path: "/PenguinFight/hu", // 壶中
        component: () => import("../views/PenguinFight/children/hu/index.vue"),
        meta: {
          auth: 2,
        },
      },
    ],
  },
  {
    path: "/QQFight",
    component: () => import("../views/QQFight/DefaultIndex.vue"),
    redirect: "/QQFight/home",
    children: [
      {
        path: "/QQFight/home", // 首页
        component: () => import("../views/QQFight/children/IndexHome.vue"),
      },
    ],
  },
  {
    path: "/Auth",
    component: () => import("../views/Auth/DefaultIndex.vue"),
    meta: {
      auth: 6,
    },
  },
  {
    path: "/UserCenter",
    component: () => import("../views/User/DefaultIndex.vue"),
    children: [
      {
        path: "/UserCenter/edit",
        component: () => import("../views/User/children/UserEdit.vue"),
      },
      {
        path: "/UserCenter/show/:id",
        component: () => import("../views/User/children/UserShow.vue"),
      },
    ],
  },
  {
    path: "/Tools",
    component: () => import("../views/Tools/DefaultIndex.vue"),
    children: [
      {
        path: "/Tools/lol",
        component: () => import("../views/Tools/children/LOLTools.vue"),
      },
      {
        path: "/Tools/tft",
        component: () => import("../views/Tools/children/TFTTools.vue"),
      },
    ],
  },
  {
    path: "/Monitor",
    component: () => import("../views/Monitor/index.vue"),
    children: [
      {
        path: "/Monitor/tool",
        component: () => import("../views/Monitor/children/tool.vue"),
      },
    ],
    meta: {
      auth: 6,
    },
  },
  {
    path: "/CxkGame",
    component: () => import("../views/CxkGame.vue"),
  },
  {
    path: "/DefaultError",
    component: () => import("../views/DefaultError.vue"),
  },
  {
    path: "*",
    redirect: "/DefaultError",
  },
];
