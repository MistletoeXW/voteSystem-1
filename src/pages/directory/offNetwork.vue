<template>
  <div>
    <!-- <div class="pagetitle">
      <div class="intru">现在一共有11种投票项目：</div>
    </div>-->

    <div class="Table">
      <div class="tablemain">
        <Table
          border
          ref="selection"
          :columns="columns4"
          :data="data"
          height="400"
          stripe
          :loading="loading"
        ></Table>
        <div class="bottomButton">
          <div style="text-align:center">
            <Button
              type="info"
              size="large"
              ghost
              @click="handleOnClickRefresh()"
              style="margin-right:0px;position:relative;left:-20px"
            >刷新</Button>
          </div>
          <div class="bottom1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eoffNetwork from './eoffNetwork.vue'
import axios from 'axios'
export default {
  data() {
    return {
      columns4: [
      
        {
          type: 'index',
          title: '序号',
          width: 70,
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'votesystemname',
          width: 160,
        },
        {
          title: '候选人数',
          key: 'candidatenumber'
        },
        {
          title: '至多赞成人数',
          key: 'electornumber'
        },
        {
          title: '已投人数',
          key: 'havevotednumber'
        },
        // {
        //   title: '总投票员',
        //   key: 'haverightman'
        // },
         {
          title: '开始时间',
          key: 'starttime',
          width: 200,
        },
         {
          title: '结束时间',
          key: 'endtime',
          width: 200,
        },

        {
          title: 'Action',
          slot: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      localStorage.setItem(
                        'projectName',
                        this.data[params.index].votesystemname
                      )
                      // this.$router.push({ name: 'soffNetwork' })
                      this.$router.push({
                        path: `specifics/offNetwork`
                      })
                    }
                  }
                },
                '投票'
              )
            ])
          }
        }
      ],
      data: [],
      loading: false
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    handleOnClickRefresh() {
      this.loadData()
    },
    loadData() {
      let URL = `${apiPath}/user/CountMenu`
      let username = localStorage.getItem('username')
      this.loading = true
      axios({
        url: URL,
        method: 'get'
      })
        .then(res => {
         
          if (res.data.code === 'SUCCESS') {
            if (res.data.data != null) {
              this.data = res.data.data
            }

            this.loading = false
          } else {
            this.loading = false
            this.$Notice.warning({ title: `${res.data.message}` })
          }
        })
        .catch(err => {
          this.loading = false
          this.$Notice.warning({ title: `出错，提示：${err}` })
        })
    }
  }
}
</script>

<style scoped>
.bottomButton {
  margin-top: 10px;
}
.bottom {
  margin-left: 44%;
  /* background-color: antiquewhite; */
}
.bottom1 {
  padding-top: 5px;
  margin-top: 5px;
}
.pagetitle {
  height: 10vh;
  left: 4%;
  position: relative;
  /* background-color: blueviolet; */
}
.Table {
  width: 90%;
  height: 65vh;
  position: absolute;
  left: 5%;
  top: 10%;
  /* background-color: aquamarine; */
}
.intru {
  position: relative;
  top: 25%;
  float: left;
  left: 10px;
}
.tablemain {
  /* background-color: rgba(102, 146, 191, 0.44); */

  border: solid 1px rgba(102, 146, 191, 0.68);

  border-radius: 10px;

  -moz-box-shadow: 2px 2px 1px #585858;
  -webkit-box-shadow: 2px 2px 1px #666565;
  box-shadow: 1px 1px 8px #7c7e7e;
}
</style>
