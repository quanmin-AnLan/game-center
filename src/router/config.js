export const routeMap = {
  LeagueOfLegends: '英雄联盟',
  MineCraft: '我的世界',
  PenguinFight: '全民大乐斗',
  Auth: '权限管理',
  UserCenter: '个人中心',
  DefaultError: '404'
}

export const routes = [
  {
    path: '/',
    component: () => import('../views/IndexHome.vue')
  },
  {
    path: '/LeagueOfLegends',
    component: () => import('../views/LeagueOfLegends/DefaultIndex.vue')
  },
  {
    path: '/MineCraft',
    component: () => import('../views/MineCraft/DefaultIndex.vue')
  },
  {
    path: '/PenguinFight',
    component: () => import('../views/PenguinFight/DefaultIndex.vue'),
    redirect: '/PenguinFight/home',
    children: [
      {
        path: '/PenguinFight/home',
        component: () => import('../views/PenguinFight/children/IndexHome.vue')
      },
      {
        path: '/PenguinFight/martial/upgrade',
        component: () => import('../views/PenguinFight/children/martial/MartialUpgrade.vue'),
      },
      {
        path: '/PenguinFight/martial/refine',
        component: () => import('../views/PenguinFight/children/martial/MartialRefine.vue'),
      },
      {
        path: '/PenguinFight/pet/introduction',
        component: () => import('../views/PenguinFight/children/pet/PetIntroduction.vue'),
      },
      {
        path: '/PenguinFight/pet/stunt',
        component: () => import('../views/PenguinFight/children/pet/PetStunt.vue'),
      },
      {
        path: '/PenguinFight/pet/fourImages',
        component: () => import('../views/PenguinFight/children/pet/PetFourImages.vue'),
      },
      {
        path: '/PenguinFight/border/front',
        component: () => import('../views/PenguinFight/children/border/BorderFront.vue'),
      },
      {
        path: '/PenguinFight/border/introduction',
        component: () => import('../views/PenguinFight/children/border/introduction/IndexHome.vue'),
        redirect: '/PenguinFight/border/introduction/stunt',
        children: [
          {
            path: '/PenguinFight/border/introduction/stunt',
            component: () => import('../views/PenguinFight/children/border/introduction/BorderIntroductionStunt.vue'),
          },
          {
            path: '/PenguinFight/border/introduction/rune',
            component: () => import('../views/PenguinFight/children/border/introduction/BorderIntroductionRune.vue'),
          },
        ]
      }
    ]
  },
  {
    path: '/Auth',
    component: () => import('../views/Auth/DefaultIndex.vue')
  },
  {
    path: '/UserCenter',
    component: () => import('../views/User/DefaultIndex.vue'),
    children: [
      {
        path: '/UserCenter/edit',
        component: () => import('../views/User/children/UserEdit.vue')
      },
      {
        path: '/UserCenter/show/:id',
        component: () => import('../views/User/children/UserShow.vue')
      }
    ]
  },
  {
    path: '/CxkGame',
    component: () => import('../views/CxkGame.vue'),
  },
  {
    path: '/DefaultError',
    component: () => import('../views/DefaultError.vue'),
  },
  {
    path: '*',
    redirect: '/DefaultError',
  },
]
