<template>
  <!-- 此处为首页的菜单,全局的路由标签栏是否可见 -->
  <section class="al-module-list" v-if="$store.state.routeTabVisible">
    <div class="shadow" @click="close" v-if="$route.path !== '/'"></div>
    <ul class="module-list">
      <li
        v-for="(item, index) in washModuleList"
        :key="item.route"
        @mouseover="selectStyle(index)"
        @mouseout="outStyle(index)"
        :class="[
          'module-list-item',
          {
            'active-module-list-item': index === activeIndex,
          },
        ]"
        @click="goTo(item.route)"
      >
        <template>
          <div class="img-wrap">
            <div class="img-box">
              <el-image
                :src="$fn.toWebp(item.logo)"
                :alt="item.name"
                fit="fill"
              />
            </div>
          </div>
          <p
            :class="[
              'module-list-item-txt',
              {
                'active-module-list-item-txt': index === activeIndex,
              },
              {
                'disable-module-list-item-txt':
                  item.route === $store.state.asyncRouteReady,
              },
            ]"
          >
            {{ item.name }}
          </p>
        </template>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "AlModuleList",
  data() {
    return {
      activeIndex: -1, // 判断hover的模块
      moduleListArr: [
        {
          name: "英雄联盟",
          logo: "http://img.anlan.xyz/game/lol.webp",
          route: "LeagueOfLegends",
        },
        {
          name: "我的世界",
          logo: "http://img.anlan.xyz/game/mc.webp",
          route: "MineCraft",
        },
        {
          name: "全民大乐斗",
          logo: "http://img.anlan.xyz/game/qmdld.png",
          route: "PenguinFight",
        },
        {
          name: "权限",
          logo: "http://img.anlan.xyz/game/auth.jpg",
          route: "Auth",
          auth: 6,
        },
        {
          name: "鸡",
          logo: "https://pic4.zhimg.com/80/v2-bfe10bb04c52c0622c198c9aaa6004bf_1440w.jpg",
          route: "CxkGame",
        },
        {
          name: "VUE方法",
          logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
          route: "MethodUsed",
        },
      ],
    };
  },
  methods: {
    selectStyle(index) {
      this.activeIndex = index;
    },
    outStyle() {
      this.activeIndex = -1;
    },
    goTo(route) {
      // 如果不在当前模块，才允许跳转
      if (
        !this.$store.state.asyncRouteReady ||
        this.$store.state.asyncRouteReady !== route
      ) {
        this.outStyle();
        this.$store.commit("SetRouteTabVisible", false);
        this.$router.push({ path: `/${route}` });
      }
    },
    // 点击关闭遮罩，取消选择
    close() {
      // 如果在主页，则无关闭事件直接return
      if (this.$route.path === "/") {
        return;
      }
      // 通知父组件关闭遮罩事件
      this.$store.commit("SetRouteTabVisible", false);
    },
  },
  computed: {
    washModuleList() {
      const result = [];
      // 进入页面就对首页显示几个模块用计算属性控制，经过用户等级和路由设置的等级进行判断，大于才可以显示，最后拿用户可以访问的权限返回，在页面上渲染，如果不想显示某个页面，直接在moduleListArr数组某个对象里加auth。
      for (const item of this.moduleListArr) {
        if (!item.auth) {
          result.push(item);
        } else {
          if (this.$store.state.userInfo.level >= item.auth) {
            result.push(item);
          }
        }
      }
      return result;
    },
  },
};
</script>

<style lang="less" scoped>
.shadow {
  .pos-f-auto;
  top: 48px;
  width: 100vw;
  height: calc(100vh - 48px);
  background-color: @avatar;
  z-index: 1000;
}

.module-list {
  .pos-f-center;
  z-index: 1001;
  display: flex;
  flex-wrap: wrap;
  width: 720px;
  background-color: @white;
  border-radius: 4px;

  &-item {
    position: relative;
    z-index: 5;
    .square(180px);
    padding-top: 37px;
    border-right: 2px solid @lightWhite;
    border-bottom: 2px solid @lightWhite;
    cursor: pointer;
    box-sizing: border-box;

    .img-wrap {
      display: flex;
      justify-content: center;

      .img-box {
        .square(68px);
      }
    }

    &-txt {
      width: 100px;
      height: 25px;
      line-height: 24px;
      background: @blue;
      border-radius: 13px;
      text-align: center;
      color: @white;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      position: absolute;
      bottom: 24px;
      left: 50%;
      margin-left: -50px;
    }

    .active-module-list-item-txt {
      background: @black;
    }

    .disable-module-list-item-txt {
      background: transparent;
      color: @disabled;
    }
  }

  .active-module-list-item {
    box-shadow: 0px 11px 13px 0px @shadow;
    border-radius: 4px;
    background: @white;
    transform: scale(1.1);
    z-index: 6;
  }
}

@media screen and (max-width: 1000px) {
  .module-list {
    width: 450px;

    &-item {
      width: 150px;
    }
  }
}

@media screen and (max-width: 600px) {
  .module-list {
    width: 240px;

    &-item {
      width: 120px;
    }
  }
}
</style>
