<template>
  <div>
    <div class="pagetitle">
      <Alert show-icon style="background:#f9fafc">
        您至多赞成<em>{{maxVoteNum}}</em>票
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <template slot="desc">您已赞成<em>{{voteNum}}</em>人,最多还可赞成<em>{{maxVoteNum-voteNum}}</em>人</template>
      </Alert>
    </div>

    <div class="Table">
      <div class="tablemain">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="voteData"
          height="400"
          :loading="loading"
        >
          <template slot-scope="{ row,index }" slot="agree">
            <input
              type="radio"
              :name="voteData[index].name"
              class="radios"
              v-model="voteData[index].num"
              value="2"
            />
          </template>
          <template slot-scope="{ row,index }" slot="against">
            <input
              type="radio"
              :name="voteData[index].name"
              class="radios"
              v-model="voteData[index].num"
              value="1"
            />
          </template>
          <template slot-scope="{ row,index }" slot="give">
            <input
              type="radio"
              :name="voteData[index].name"
              class="radios"
              v-model="voteData[index].num"
              value="0"
            />
          </template>
        </Table>
        <div class="bottomButton">
          <div style="text-align:center">
            <Button
              type="info"
              size="large"
              @click="handleOnClickRefresh()"
              style="margin-right:0px;position:relative;left:-20px"
            >刷新</Button>
            <Button type="success" size="large" @click="handleOnClickSubmit()">提交</Button>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="dialogVisible" width="25" :styles="{top: '300px'}" class="smallModal">
      <p slot="header" style="color:#000;text-align:center;height:30px;">
        <span style="position:relative;font-size:24px;font-weight:bold;top:20%">提交确认</span>
      </p>
      <div style="text-align:center">
        <p>共{{voteData.length}}人，您已赞成{{voteNum}}人。</p>
        <!-- <p>
              本张选票不赞成序号及序号：
              <span
                v-for="(_,index) in voteData"
                v-if="voteData[index].num==='1'"
                :key="_.value"
              >({{index+1}}):{{voteData[index].name}}</span>
            </p>
            <p>
              本张选票赞成姓名及序号：
              <span
                v-for="(_,index) in voteData"
                v-if="voteData[index].num==='2'"
                :key="_.value"
              >({{index+1}}):{{voteData[index].name}}</span>
        </p>-->
        <p style="font-weight:bold;margin-top:10px;">是否提交？</p>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click="dialogVisible=false;hander()">提交</Button>
      </div>
    </Modal>
  </div>
</template>
 
<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      maxVoteNum: '',
      voteData: [],

      columns: [
        {
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
        {
          title: '名字',
          key: 'name',
          align: 'center'
        },

        {
          title: '赞成',
          slot: 'agree',
          align: 'center',
          width: 220
        },
        {
          title: '反对',
          align: 'center',
          slot: 'against',
          width: 220
        },
        {
          title: '弃权',
          align: 'center',
          slot: 'give',
          width: 220
        }
      ]
    }
  },
  methods: {
    handleOnClickSubmit() {
      if (this.voteNum > this.maxVoteNum) {
        this.$Notice.warning({
          title: '一张选票至多选择' + this.maxVoteNum + '人'
        })
        return
      }
      this.dialogVisible = true
    },
    hander() {
      let URL = `${apiPath}/vote/votecounting`
      let projectName = localStorage.getItem('projectName')
      axios({
        url: URL,
        method: 'POST',
        data: {
          data: this.voteData,
          projectName: projectName
        }
      })
        .then(res => {
          if (res.data.code === 'SUCCESS') {
            this.loadData()
            this.$Notice.success({ title: `投票成功` })
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.message}` })
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` })
        })
    },
    loadData() {
      let URL = `${apiPath}/user/showUnderCount`
      this.projectName = localStorage.getItem('projectName')
      this.loading = true
      axios({
        url: URL,
        method: 'post',
        data: {
          projectname: this.projectName
        }
      })
        .then(res => {
          if (res.data.code === 'SUCCESS') {
            if (res.data.data != null) {
              this.voteData = res.data.data.list
              this.maxVoteNum = res.data.data.electorNum
            }
            this.loading = false
          } else {
            this.loading = false
            this.$Notice.warning({ title: `出错，提示：${res.data.message}` })
          }
        })
        .catch(err => {
          this.loading = false
          this.$Notice.warning({ title: `出错，提示：${err}` })
        })
    },
    handleOnClickRefresh() {
      this.loadData()
    }
  },

  mounted() {
    this.loadData()
  },
  computed: {
    voteNum() {
      let num = 0
      for (let i = 0; i < this.voteData.length; i++) {
        if (this.voteData[i].num === '2') num++
      }
      return num
    }
  }
}
</script>

<style scoped>
.Table {
  width: 90%;
  height: 65vh;
  position: absolute;
  left: 5%;
  /* background-color: aquamarine; */
}
.pagetitle {
  margin-top: 1%;
  height: 12vh;
  left: 5%;
  width: 90%;
  position: relative;
  font-family: 'Times New Roman', Georgia, Serif;
  font-size: 20px;
}

.tablemain {
  border-radius: 10px;
  -moz-box-shadow: 2px 2px 1px #585858;
  -webkit-box-shadow: 2px 2px 1px #666565;
  box-shadow: 1px 1px 8px #7c7e7e;
}
.bottomButton {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 7vh;
}
.radios {
  height: 25px;
  width: 25px;
  margin: 5px;
}
</style>

<style>
.ivu-alert-info {
  border: 1px solid #f9fafc;
  /* background-color: #f0faff; */
}
em{
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
  font-size:18px;
  margin-left:5px;
  margin-right:5px;
}
</style>
