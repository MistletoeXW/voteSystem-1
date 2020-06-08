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
          :columns="columns"
          height="400"
          :data="data"
          stripe
          :loading="loading"
          @on-row-click="toggleTableExpand"
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
    <Modal title="项目详情" v-model="xiangqing" width="550" :styles="{top: '80px'}">
      <p slot="header" style="color:#000;text-align:center;height:30px;">
        <span style="position:relative;font-size:24px;font-weight:bold;top:20%">项目详情</span>
      </p>
      <div style="width:100%;position:relative;text-align:left">
        <Row style="text-align:left">
          <Col span="24" :bordered="false">
            <Card>
              <Row>
                <span class="stitle">详情：</span>
                <div id="method">
                
                </div>
              </Row>
              <Divider size="small" />
              <Row class="expand-row">
                <Col span="12">
                  <span class="expand-key">已投人数:</span>
                  <span class="expand-value">{{ row.havevotednumber }}</span>
                </Col>
                <Col span="12">
                  <span class="expand-key">总投票员数:</span>
                  <span class="expand-value">{{ row.haverightman }}</span>
                </Col>
              </Row>
              <Divider class="spider"></Divider>
              <Row class="expand-row">
                <Col span="12">
                  <span class="expand-key">投票开始时间:</span>
                  <span class="expand-value">{{ row.starttime }}</span>
                </Col>

                <Col span="12">
                  <span class="expand-key">投票截止时间:</span>
                  <span class="expand-value">{{ row.endtime }}</span>
                </Col>
              </Row>
              <Divider class="spider"></Divider>
              <Row class="expand-row">
                <Col span="24">
                  <span class="expand-key">
                    项目简介:
                    <br />
                    <br />
                  </span>
                  <span
                    class="expand-value"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ row.description }}</span>
                </Col>
              </Row>
              
            </Card>
          </Col>
        </Row>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" size="large" long @click="xiangqing=false">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import ecount from "./ecount.vue";
import axios from "axios";
export default {
  data() {
    return {
      columns: [
       
        {
          type: "index",
          title: "序号",
          width: 70,
          align: "center"
        },
        {
          title: "项目名称",
          key: "votesystemname"
          // width: 120
        },
        {
          title:'投票模式',
          key:'votingmode',
        },
        {
          title: "候选人数",
          key: "candidatenumber"
        },
        {
          title: "至多赞成人数",
          key: "electornumber"
        },

        {
          title: "Action",
          slot: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem(
                        "projectId",
                        this.data[params.index].id
                      );
                      localStorage.setItem(
                        "projectName",
                        this.data[params.index].votesystemname
                      );
                      // this.$router.push({ name: 'scount' })
                      this.$router.push({
                        path: `specifics/count`
                      });
                    }
                  }
                },
                "计票"
              )
            ]);
          }
        }
      ],
      data: [
     
      ],
      loading: false,
     row:"",
      xiangqing:false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    toggleTableExpand(row, index) {
      this.xiangqing = true;
      this.row = row;
    },
    handleOnClickRefresh() {
      this.loadData();
    },
    loadData() {
      let URL = `${apiPath}/user/allCountMenu`;
      let username = localStorage.getItem("username");
      this.loading = true;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
           
          if (res.data.code === "SUCCESS") {
            this.loading = false;
            if (res.data.data != null) {
              this.data = res.data.data;
              for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].votingmode == "1") {
                  this.data[i].votingmode = "线上投票";
                } else {
                  this.data[i].votingmode = "线下投票";
                }
              }
            }
          } else {
            this.loading = false;
            this.$Message.warning(`暂无项目`);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    }
  }
};
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
</script>
<style lang="scss" scoped>
@import "card";
</style>
<style scoped>
.expand-row {
  margin-bottom: 16px;
}
.expand-key {
  font-weight: lighter;
}
.expand-value {
  /* font-size:22px; */
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  /* font-weight: bold; */
}
.spider {
  font-weight: bold;
}
.stitle {
  margin-left: 3px;
  margin-bottom: -8px;

  font-size: 22px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: bolder;
}
#method {
  font-size: 22px;
  font-weight: bolder;
  position: relative;
  float: right;
  right: 12%;
  /* top:1px; */
}
</style>