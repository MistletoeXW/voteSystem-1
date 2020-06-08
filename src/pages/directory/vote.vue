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
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      columns4: [
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
          title: "候选人数",
          key: "candidatenumber",
          width: 100
        },
        {
          title: "至多赞数",
          key: "electornumber",
          width: 100
        },

        {
          title: "开始日期",
          key: "starttime"
        },
        {
          title: "截止日期",
          key: "endtime"
        },
        {
          title: "投票状态",
          key: "isvote",
          width: 160,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const color = row.isvote === 0 ? "warning" : "success";
            const text = row.isvote === 0 ? "未投" : "已投";

            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    type: "dot",
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
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
                        "projectName",
                        this.data[params.index].votesystemname
                      );
                      if (this.data[params.index].isvote == 0) {
                        this.$router.push({
                          path: `specifics/vote`
                        });
                      } else {
                        this.$Message.warning('您已为该项目投过票');
                      }
                    }
                  }
                },
                "投票"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  methods: {
    loadData() {
      let URL = `${apiPath}/user/votemenu`;
      this.loading = true;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === "SUCCESS") {
            if (res.data.data != null) {
              this.data = res.data.data;
            }

            this.loading = false;
          } else if (res.data.code === "FAILED") {
            this.loading = false;
            this.$Notice.warning({ title: `暂无项目` });
          } else {
            this.loading = false;
            this.$Notice.warning({ title: `出错，提示：${err}` });
          }
        })
        .catch(err => {
          this.loading = false;
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    handleOnClickRefresh() {
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
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
