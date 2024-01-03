export const config = {
  menuData: [
    {
      title: '首页',
      index: '/home',
      icon: 'house',
      children: []
    },
    {
      title: '装备',
      icon: 'scissors',
      index: '/martial',
      children: [
        {
          title: '强化',
          index: '/martial/upgrade',
          icon: 'right',
          children: []
        },
        {
          title: '精炼',
          index: '/martial/refine',
          icon: 'd-arrow-right',
          children: []
        }
      ]
    },
    {
      title: '皮肤',
      icon: 'user',
      index: '/skin',
      children: []
    },
    {
      title: '举报',
      icon: 'phone-outline',
      index: '/report',
      children: []
    },
    {
      title: '召唤兽',
      icon: 'chicken',
      index: '/pet',
      children: [
        {
          title: '简介',
          index: '/pet/introduction',
          icon: 'tickets',
          children: []
        },
        {
          title: '特技',
          index: '/pet/stunt',
          icon: 'magic-stick',
          children: []
        },
        {
          title: '四象',
          index: '/pet/fourImages',
          icon: 'orange',
          children: []
        }
      ]
    },
    {
      title: '结界',
      icon: 'sunny',
      index: '/border',
      children: [
        {
          title: '简介',
          index: '/border/introduction',
          icon: 'tickets',
          children: [
            {
              title: '特技',
              index: '/border/introduction/stunt',
              icon: 'magic-stick',
              children: []
            },
            {
              title: '符文',
              index: '/border/introduction/rune',
              icon: 'place',
              children: []
            }
          ]
        },
        {
          title: '法阵',
          index: '/border/front',
          icon: 'refresh',
          children: []
        }
      ]
    }
  ]
}