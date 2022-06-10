<template>
  <section class="al-module-list">
    <div class="shadow" @click="close" v-if="$route.path !== '/'"></div>
    <ul class="module-list">
      <li v-for="(item, index) in moduleListArr" :key="item.route" @mouseover="selectStyle(index)"
        @mouseout="outStyle(index)" :class="[
          'module-list-item',
          {
            'active-module-list-item': index === activeIndex
          }
        ]" @click="goTo(item.route)">
        <template>
          <div class="img-wrap">
            <div class="img-box">
              <el-image :src="item.logo" :alt="item.name" fit="fill" />
            </div>
          </div>
          <p :class="[
            'module-list-item-txt',
            {
              'active-module-list-item-txt': index === activeIndex
            },
            {
              'disable-module-list-item-txt': item.route === asyncRouteReady
            },
          ]">{{ item.name }}</p>
        </template>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AlModuleList',
  data() {
    return {
      activeIndex: -1, // 判断hover的模块
      moduleListArr: [
        {
          'name': '英雄联盟',
          'logo': 'http://img.anlan.xyz/game/lol.webp',
          'route': 'LeagueOfLegends'
        },
        {
          'name': '我的世界',
          'logo': 'http://img.anlan.xyz/game/mc.webp',
          'route': 'MineCraft'
        },
        {
          'name': '全民大乐斗',
          'logo': 'http://img.anlan.xyz/game/qmdld.png',
          'route': 'PenguinFight'
        },
      ]
    }
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
      if (!this.asyncRouteReady || this.asyncRouteReady !== route) {
        this.$router.push(route)
      }
    },
    // 点击关闭遮罩，取消选择
    close() {
      // 如果在主页，则无关闭事件直接return
      if (this.$route.path === "/") {
        return
      }
      // 通知父组件关闭遮罩事件
      this.$emit("close");
    }
  },
  computed: {
    // 获取vuex全局变量asyncRouteReady
    ...mapState(['asyncRouteReady'])
  }
}
</script>

<style lang="less" scoped>
.shadow {
  .pos-f-auto;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.module-list {
  .pos-f-center;
  z-index: 1001;
  display: flex;
  flex-wrap: wrap;
  width: 720px;
  background-color: #fff;
  border-radius: 4px;

  &-item {
    position: relative;
    z-index: 5;
    width: 180px;
    height: 180px;
    padding-top: 37px;
    border-right: 2px solid #f3f3f3;
    border-bottom: 2px solid #f3f3f3;
    cursor: pointer;
    box-sizing: border-box;

    .img-wrap {
      display: flex;
      justify-content: center;

      .img-box {
        width: 68px;
        height: 68px;
      }
    }

    &-txt {
      width: 100px;
      height: 25px;
      line-height: 24px;
      background: rgba(32, 160, 255, 1);
      border-radius: 13px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      position: absolute;
      bottom: 24px;
      left: 50%;
      margin-left: -50px;
    }

    .active-module-list-item-txt {
      background: #363f40;
    }

    .disable-module-list-item-txt {
      background: transparent;
      color: #999;
    }
  }

  .active-module-list-item {
    box-shadow: 0px 11px 13px 0px rgba(0, 0, 0, 0.11);
    border-radius: 4px;
    background: #fff;
    transform: scale(1.1);
    z-index: 6
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
