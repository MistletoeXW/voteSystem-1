
<template>
  <div class="layout">
    <Layout style="height: 100vh;">
      <Sider :width="251" style="background: #343957;">
        <div>
          <img src="@/common/images/photo.png" />
        </div>
        <Menu width="100%" :active-name="fullPath" :open-names="[openname]" accordion>
          <MenuItem name="controlentirety" to="/selectBranchControl3/control">
            <Icon type="ios-settings" />
            <span>管理页面</span>
          </MenuItem>

        
          <MenuItem name="voteentirety" to="/selectBranchControl3/vote">
            <Icon type="md-person" />
            <span>线上投票</span>
          </MenuItem>
        </Menu>
  
      </Sider>
      <Layout>
        <Header
          :style="{background: '#fff', height: '70px',boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"
          class="layout-header-bar"
        >
          <div class="layout-header-title">
            <Icon :type="type" />
            {{title}}
          </div>
          <div class="user">
            <Avatar style="background-color: #87d068" icon="ios-person" />
            <Dropdown>
              <a href="javascript:void(0)" class="name">
                {{username}}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <!-- <Dropdown placement="left-start" v-if="identity.show">
                  <DropdownItem>
                    选择身份
                    <Icon type="ios-arrow-forward"></Icon>
                  </DropdownItem>
                  <DropdownMenu slot="list">
                    <DropdownItem v-if="this.identity.student|this.identity.teacher" @click.native="$router.push('/user')">普通用户</DropdownItem>
                    <DropdownItem v-if="this.identity.manager" @click.native="$router.push('/manager')">普通管理员</DropdownItem>
                    <DropdownItem v-if="this.identity.system" @click.native="$router.push('/system')">系统管理员</DropdownItem>
                  </DropdownMenu>
                </Dropdown>-->
                <!-- <DropdownItem @click.native="$router.push('myInfo')">我的信息</DropdownItem> -->
                <DropdownItem divided @click.native="$router.push({ name: 'logout' })">
                  <Icon type="ios-log-out" />&nbsp;&nbsp;登出
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Content
          :style="{margin: '20px', background: '#fff'}"
          style="height:100vh"
          class="main;margin-top:-20px;"
        >
          <GeminiScrollbar class="my-scroll-bar">
            <router-view></router-view>
          </GeminiScrollbar>
        </Content>
        <!--页面部分-->
      </Layout>
      <!--右边部分-->
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      username: '',
      type: '',
      openname: ''
    }
  },

  methods: {
    handleCommand(command) {
      if (command == 'logout') {
        this.$router.push({ name: 'logout' })
      }
    },
    initIdentity() {
      if (this.$route.name == 'controlentirety') {
        this.title = '管理页面'
        this.type = 'ios-settings'
      } else if (this.$route.name == 'countentirety') {
        this.title = '计票页面'
        this.type = 'ios-paper'
      } else if (this.$route.name == 'offNetworkentirety') {
        this.title = '线下投票'
        this.type = 'ios-people'
      } else if(this.$route.name == 'voteentirety'){
        this.title = '线上投票'
        this.type = 'md-person'
      }else {
        this.title = localStorage.getItem("projectName")
    
        this.type = 'ios-pie'
      }
    },
    warning() {
      this.$Message.warning({
        content: '请从进入此页'
      })
    }
  },

  computed: {
    fullPath() {
      if (this.$route.path == '/selectBranchControl3/count') {
        this.openname = 'online'
        return 'onlineentirety'
      } else if (this.$route.path == '/selectBranchControl3/control') {
        this.openname = 'control'
        return 'controlentirety'
      } else if (this.$route.path == '/selectBranchControl3/vote') {
        this.openname = 'vote'
        return 'voteentirety'
      } else if (this.$route.path == '/selectBranchControl3/specifics/control') {
        this.openname = 'control'
        return 'controlspecifics'
      } else if (this.$route.path == '/selectBranchControl3/specifics/count') {
        this.openname = 'online'
        return 'onlinespecifics'
      } else if (
        this.$route.path == '/selectBranchControl3/specifics/offNetwork'
      ) {
        this.openname = 'offNetwork'
        return 'offNetworkspecifics'
      } else if (this.$route.path == '/selectBranchControl3/specifics/vote') {
        this.openname = 'vote'
        return 'votespecifics'
      } else {
        this.openname = 'offNetwork'
        return 'offNetworkentirety'
      }
    }
  },
  mounted() {
    this.username = localStorage.getItem('username')
    this.initIdentity()
  },
  watch: {
    $route() {
      this.initIdentity()
    }
  }
}
</script>
<style scoped lang="scss">
@import './select';
</style>
<style  lang="scss">
.ivu-menu-submenu-title {
  // display: flex;
  background: #343957;
  font-size: 18px;
  font-weight: normal;
  // align-content: center !important;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  color: #c6d7f2;
  // width: 277px;
  // left:-10%;
  // position:relative;
  i {
    // display: flex;
    align-items: center;
  }
}
// .my-scroll-bar {
//   height: 100%;
// }
// .gm-scrollbar.-vertical {
//   // background-color: #f0f0f0
// }

// /* horizontal scrollbar track */
// .gm-scrollbar.-horizontal {
//   background-color: transparent;
// }

// /* scrollbar thumb */
// .gm-scrollbar .thumb {
//   background-color: rgba(69, 66, 71, 0.3);
// }
// .gm-scrollbar .thumb:hover {
//   background-color: rgb(49, 46, 49);
// }

.user {
  position: relative;
  float: right;
  right: -3%;
  font-size: 20px;
  width: 18%;
  top: 6%;
}
.name {
  color: #484848;
  margin-left: 8px;
}

.name:hover {
  color: darkslategray;
}

.el-dropdown-link {
  // position:relative;
  cursor: pointer;
  color: #171a14;
  font-size: 24px;
  // display: flex;
}
.el-icon-arrow-down {
  font-size: 24px;
}
</style>
