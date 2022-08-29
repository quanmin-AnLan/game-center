<template>
    <el-menu
        default-active="home"
        @select="handleOpen"
        :background-color="colorConfig.bgColor"
        :text-color="colorConfig.textColor"
        :active-text-color="colorConfig.activeColor"
        class="menu-section"
        :collapse="isCollapse">
        <template v-for="(items, index) in menuData">
            <el-submenu v-if="items.children.length > 0" :key="index" :index="items.index">
                <template slot="title">
                    <i :class="`el-icon-${items.icon}`"></i>
                    <span>{{items.title}}</span>
                </template>
                <template v-for="(item, i) in items.children">
                    <el-submenu v-if="item.children.length > 0" :key="i" :index="item.index">
                        <template slot="title">
                            <i :class="`el-icon-${item.icon}`"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <el-menu-item :index="ite.index" v-for="(ite, j) in item.children" :key="j">
                            <i :class="`el-icon-${ite.icon}`"></i>
                            <span>{{ite.title}}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :key="item.index" :index="item.index">
                        <i :class="`el-icon-${item.icon}`"></i>
                        <span>{{item.title}}</span>
                    </el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item v-else :key="items.index" :index="items.index">
                <i :class="`el-icon-${items.icon}`"></i>
                <span>{{items.title}}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
export default {
    name: 'AlMenu',
    props: {
        menuData: {
            type: Array,
            default: () => []
        },
        colorConfig: {
            type: Object,
            default: () => ({
                bgColor: '#545c64',
                textColor: '#fff',
                activeColor: '#ffd04b'
            })
        }
    },
    data() {
        return {
            isCollapse: false
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style lang="less" scoped>
.menu-section {
    width: 300px;
    height: calc(100vh - 48px);
    text-align: left;
}
.el-menu-item [class^=el-icon-] {
    vertical-align: text-bottom;
}
</style>
