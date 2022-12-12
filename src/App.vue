<template>
  <div :class="['ovh', 'message-web', isDev && 'has-dev-menu']">
    <ul v-if="isDev" :class="['left-menu', hideMenu && 'left-menu hide-menu']">
      <el-button
        :icon="hideMenu ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        circle
        @click="hideMenu = !hideMenu"
      ></el-button>
      <ul class="menu-list">
        <li
          v-for="(item, index) in tabs"
          :key="item.name"
          @click="activePage(item, index)"
        >
          <div class="name">{{ item.meta.title }}</div>
        </li>
      </ul>
    </ul>
    <router-view />
  </div>
</template>
<script>
import routes from './router'
export default {
  name: 'App',
  data() {
    return {
      hideMenu: false,
      tabs: [],
      isDev: false,
    }
  },
  mounted() {
    this.tabs = routes.filter((item) => {
      return item.meta && item.meta.isMenu
    })
    console.log('this.tabs', this.tabs)
    this.isDev = process.env.NODE_ENV === 'development'
  },
  methods: {
    activePage(item) {
      this.$router.replace(item.path)
    },
  },
}
</script>
<style scoped>
.message-web {
  background-color: #f4f8fd;
  height: 100%;
}
.has-dev-menu {
  display: flex;
}
.has-dev-menu > :nth-child(2) {
  width: 230px;
  flex: auto;
}
.has-dev-menu .content {
  flex: auto;
}
.left-menu {
  margin: 0;
  flex-shrink: 0;
  width: 230px;
  min-height: 100%;
  background: #eee;
  box-sizing: border-box;
  font-weight: 400;
  padding: 0;
  padding-top: 10px;
}
.left-menu .menu-list {
  margin: 0;
  padding: 20px 0 0 0;
  display: block;
}
.left-menu .menu-list li {
  color: #000;
  margin: 0 0 10px0;
  padding: 0 10px;
  overflow: hidden;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.left-menu .menu-list li .name {
  width: 180px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
}
.left-menu .menu-list li:hover {
  border-radius: 8px;
  background: #ddd;
}
.left-menu .menu-list li.active {
  border-radius: 8px;
}

.hide-menu {
  width: 44px;
}
.hide-menu .menu-list {
  display: none;
}
</style>
