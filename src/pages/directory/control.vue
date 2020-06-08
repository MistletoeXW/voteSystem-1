
<template>
  <div>
    <div class="Table">
      <div class="action" style="position:relative;margin-bottom:0px;top:-15px;">
        <Row type="flex" justify="end" class="code-row-bg">
          <Col span="4" style="text-align:right">
            <Button type="success" @click="checkControl=true">查询管理员</Button>
          </Col>
        </Row>
      </div>
      <div class="tablemain">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="data"
          height="420"
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
            <Button type="success" size="large" ghost @click="addProject()">增加项目</Button>
          </div>
          <div class="bottom1"></div>
        </div>
      </div>
    </div>
    <Modal v-model="deleteControl" width="20%" :styles="{top: '300px'}" class="smallModal">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>此管理员删除后，其数据将不能保留</p>
        <p style="font-weight:bold;margin-top:10px;">是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteControls(theIndex)">删除</Button>
      </div>
    </Modal>
    <Modal v-model="checkControl" width="450" :styles="{top: '100px'}">
      <p slot="header" style="color:#000;text-align:center;height:30px;">
        <span style="position:relative;font-size:24px;font-weight:bold;top:20%">查询管理员</span>
      </p>
      <div style="text-align:center">
        <Table stripe :columns="columnsc" :data="datac" height="250"></Table>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" size="large" @click="addControl=true" ghost>增加管理员</Button>
      </div>
    </Modal>
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
                  <!-- <span class="expand-key">投票方式:</!-->
                  <!-- <span class="expand-value">{{ row.votingmode }}</span> -->
                </div>
              </Row>
              <Divider size="small" />
              <Row class="expand-row">
                <Col span="8">
                  <span class="expand-key">已投人数:</span>
                  <span class="expand-value">{{ row.havevotednumber }}</span>
                </Col>
                <Col span="8">
                  <span class="expand-key">总投票员数:</span>
                  <span class="expand-value">{{ row.haverightman }}</span>
                </Col>
                <Col span="8">
                  <span class="expand-key">计票员数:</span>
                  <span class="expand-value">{{ row.countPeople }}</span>
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
    <Modal title="增加投票项目" v-model="addmodal" width="450" :styles="{top: '80px'}">
      <p slot="header" style="color:#000;text-align:center;height:30px;">
        <span style="position:relative;font-size:24px;font-weight:bold;top:20%">增加投票项目</span>
      </p>
      <div style="width:100%;position:relative">
        <Form ref="projectInfo" :model="projectInfo" :label-width="100">
          <FormItem label="项目名称">
            <Input v-model="projectInfo.projectName" placeholder="请输入项目名称" />
          </FormItem>
          <FormItem label="至多赞成数">
            <Input v-model="projectInfo.maxAccentNum" placeholder="请输入至多赞成数" />
          </FormItem>
          <FormItem label="投票方式">
            <RadioGroup v-model="projectInfo.method">
              <Radio label="线上投票">线上投票</Radio>
              <Radio label="线下投票">线下投票</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="开始时间">
            <DatePicker
              type="datetime"
              placeholder="选择时间"
              :value="projectInfo.startTime"
              @on-change="projectInfo.startTime=$event"
              format="yyyy-MM-dd HH:mm:ss"
            ></DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker
              type="datetime"
              placeholder="选择时间"
              :value="projectInfo.endTime"
              @on-change="projectInfo.endTime=$event"
              format="yyyy-MM-dd HH:mm:ss"
            ></DatePicker>
          </FormItem>
          <FormItem label="项目简介">
            <Input
              v-model="projectInfo.introuction"
              type="textarea"
              :autosize="{minRows: 3,maxRows: 5}"
              placeholder="请写下对项目的介绍"
            />
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button
          type="primary"
          size="large"
          @click="createNewProject2()"
          style="margin-right:1vh;"
          :disabled="projectInfo.submit"
        >立即创建</Button>
        <Button
          type="primary"
          size="large"
          ghost
          @click="addmodal=false"
          style="margin-right:1vh;"
        >取消</Button>
      </div>
    </Modal>
    <Modal v-model="addControl" width="25" :styles="{top: '300px'}" class="smallModal">
      <p slot="header" style="color:#000;text-align:center;font-size:22px">
        <span>增加管理员</span>
      </p>
      <div style="text-align:center;margin-bottom:-15px;">
        <Form ref="form" :model="forms" :label-width="100">
          <FormItem label="学号/工号">
            <Input v-model="forms.userId" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" size="large" @click="addControls()" style="margin-right:1vh;">增加</Button>
        <Button
          type="primary"
          size="large"
          ghost
          @click="addControl = false"
          style="margin-right:0vh;"
        >取消</Button>
      </div>
    </Modal>
    <Modal v-model="dialogFormVisible5" width="25%" :closable="false" :styles="{top: '100px'}">
      <p slot="header" style="color:#000;text-align:center;font-size:22px">
        <span>更改项目</span>
      </p>
      <div style="margin-bottom:-15px;">
        <Form ref="form3" :model="form3" :label-width="100">
          <FormItem label="项目名称">
            <Input v-model="projectInfo.projectName" />
          </FormItem>
          <FormItem label="至多赞成数">
            <Input v-model="projectInfo.maxAccentNum" placeholder="请输入至多赞成数" />
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker
              type="datetime"
              placeholder="选择时间"
              :value="projectInfo.endTime"
              @on-change="projectInfo.endTime=$event"
              format="yyyy-MM-dd HH:mm:ss"
            ></DatePicker>
          </FormItem>
          <FormItem label="项目简介">
            <Input
              v-model="projectInfo.introuction"
              type="textarea"
              :autosize="{minRows: 3,maxRows: 5}"
              placeholder="请写下对项目的介绍"
            />
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button
          type="primary"
          size="large"
          @click="dialogFormVisible5=false;changeProjectName()"
          style="margin-right:1vh;"
        >更改</Button>
        <Button type="primary" size="large" ghost @click="cancelName()" style="margin-right:0vh;">取消</Button>
      </div>
    </Modal>

    <Modal v-model="dialog" width="20" :styles="{top: '300px'}" class="smallModal">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>此任务删除后，其数据将不能保留</p>
        <p style="font-weight:bold;margin-top:10px;">是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteProject(projectIndex)">删除</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import axios from "axios";
import econtrol from "./econtrol.vue";
export default {
  components: { econtrol },
  data() {
    return {
      forms: {
        userId: ""
      },
      addControl: false,
      deleteControl: false,
      row: "",
      xiangqing: false,
      loading: false,
      projectIndex: "",
      projectKind: "12",
      datac: [],
      columnsc: [
        {
          type: "index",
          title: "序号",
          width: 70
          // align:center
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "学号/工号",
          key: "userId"
        },
        {
          title: "Action",
          slot: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.theIndex = params.index;
                      this.deleteControl = true;
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
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
          title: "投票模式",
          key: "votingmode"
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
          width: 180,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    ghost: true
                  },
                  style: {
                    marginRight: "1px"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem(
                        "projectName",
                        this.data[params.index].votesystemname
                      );
                      localStorage.setItem(
                        "projectId",
                        this.data[params.index].id
                      );
                      let projectName = this.data[params.index].votesystemname;
                      this.$router.push({
                        path: `specifics/control?votingmode=${this.data[params.index].votingmode}`
                      });
                    }
                  }
                },
                "管理"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    ghost: true
                  },
                  style: {
                    marginRight: "1px"
                  },
                  on: {
                    click: () => {
                      this.projectInfo.projectName = this.data[
                        params.index
                      ].votesystemname;
                      this.projectInfo.endTime = this.data[
                        params.index
                      ].endtime;
                      this.projectInfo.maxAccentNum = this.data[
                        params.index
                      ].electornumber;
                      this.projectInfo.introuction = this.data[
                        params.index
                      ].description;
                      this.projectInfo.id = this.data[params.index].id;
                      this.dialogFormVisible5 = true;
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    ghost: true
                  },
                  style: {
                    marginRight: "1px"
                  },
                  on: {
                    click: () => {
                      this.projectIndex = params.index;
                      this.dialog = true;
                      // this.deleteProject(params.index)
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      theIndex: -1,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      dialog: false,
      addmodal: false,
      form1: {
        accent: ""
      },
      form2: {
        projectName: "",
        maxAccentNum: "",
        dateb: "",
        timeb: "",
        dateo: "",
        timeo: "",
        method: "",
        introuction: ""
      },
      projectInfo: {
        id: -1,
        projectName: "",
        maxAccentNum: "",
        startTime: "",
        endTime: "",
        method: "",
        introuction: "",
        submit: true
      },
      form3: {
        newProjectName: "",
        oldProjectName: ""
      },
      checkControl: false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    addProject() {
      // this.dialogFormVisible3 = true
      this.addmodal = true;
    },
    handleCommand(command) {
      if (command == "addCount") {
        this.dialogFormVisible1 = true;
      } else if (command == "delCount") {
        this.dialogFormVisible2 = true;
      } else if (command == "addProject") {
        this.dialogFormVisible3 = true;
      } else {
        alert("删除项目");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.form1.accent = "";
          this.dialogFormVisible1 = false;
          this.dialogFormVisible2 = false;
        } else {
          this.form1.accent = "";
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleOnClickRefresh() {
      this.loadData();
    },
    loadData() {
      let URL = `${apiPath}/user/menu`;
      let username = localStorage.getItem("username");
      let type = localStorage.getItem("type");
      this.loading = true;
      axios({
        url: `${apiPath}/user/menu`,
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
            this.$Notice.warning({ title: `${res.data.message}` });
          }
        })
        .catch(err => {
          this.loading = false;
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    cancelName() {
      this.dialogFormVisible5 = false;
    },
    changeProjectName() {
      let id = this.projectInfo.id;
      let projectName = this.projectInfo.projectName;
      let maxAccentNum = this.projectInfo.maxAccentNum;

      let endTime = this.projectInfo.endTime;
      let description = this.projectInfo.introuction;

      axios({
        url: `${apiPath}/admin/changeName`,
        method: "post",
        data: {
          id: id,
          projectName: projectName,
          maxAccentNum: maxAccentNum,
          endTime: endTime,
          description: description
        }
      })
        .then(res => {
          if (res.data.code === "SUCCESS") {
            this.loadData();

            this.$Notice.success({ title: `修改成功` });
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.message}` });
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    deleteProject(index) {
      let projectName = this.data[index].votesystemname;
      let URL = `${apiPath}/admin/deleteProject`;
      this.loading = true;
      this.dialog = false;
      axios({
        url: URL,
        method: "post",
        data: {
          projectname: projectName
        }
      })
        .then(res => {
          if (res.data.code === "SUCCESS") {
            this.loading = false;
            this.data = res.data.data;
            this.projectKind--;
            this.$Notice.success({ title: `删除成功` });
          } else {
            this.loading = false;
            this.$Notice.warning({ title: `出错，提示：${res.data.message}` });
          }
        })
        .catch(err => {
          this.loading = false;
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    deleteControls(index) {
      let userId = this.datac[index].userId;
      let URL = `${apiPath}/admin/deleteOneAdmin`;

      axios({
        url: URL,
        method: "get",
        params: {
          userId: userId
        }
      })
        .then(res => {
          this.deleteControl = false;
          if (res.data.code === "SUCCESS") {
            this.loadData2();

            this.$Notice.success({ title: `删除成功` });
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.message}` });
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    addControls() {
      let URL = `${apiPath}/admin/addAdmin`;
      axios({
        url: URL,
        method: "get",
        params: {
          userId: this.forms.userId
        }
      })
        .then(res => {
          if (res.data.code === "SUCCESS") {
            this.loadData2();

            this.$Notice.success({ title: `增加管理员成功` });
            this.addControl = false;
          } else {
            this.$Notice.warning({
              title: `出错，提示：${res.data.message}`
            });
            this.addControl = false;
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
          //  this.addControl = false
        });
    },
    createNewProject() {
      // let URL=`${apiPath}/`
      let projectName = this.form2.projectName;
      let maxAccentNum = this.form2.maxAccentNum;
      let dateb = this.form2.dateb;
      let dateo = this.form2.dateo;
      let timeb = this.form2.timeb;
      let timeo = this.form2.timeo;
      let description = this.form2.introuction;
      let method = this.form2.method;
     
      if (method == "线上投票") {
        method = 1;
      } else {
        method = 2;
      }
      axios({
        url: `${apiPath}/admin/addOne`,
        method: "post",
        data: {
          projectname: projectName,
          electorNum: maxAccentNum,
          votingmode: method,
          startDate: dateb,
          endDate: dateo,
          startTime: timeb,
          endTime: timeo,
          description: description
        }
      })
        .then(res => {
          this.spin = false;
          if (res.data.code === "SUCCESS") {
            this.handleOnClickRefresh();

            this.$Notice.success({ title: "添加成功！" });
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.message}` });
        
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    loadData2() {
      let URL = `${apiPath}/admin/getAllAdmin`;
      let projectName = localStorage.getItem("projectName");
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === "SUCCESS") {
            if (res.data.data != null) {
              this.datac = res.data.data.adminList;
            }
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.message}` });
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    createNewProject2() {
      // let URL=`${apiPath}/`
      let projectName = this.projectInfo.projectName;
      let maxAccentNum = this.projectInfo.maxAccentNum;
      let startTime = this.projectInfo.startTime;
      let endTime = this.projectInfo.endTime;
      let description = this.projectInfo.introuction;
      let method = this.projectInfo.method;
      if (method == "线上投票") {
        method = 1;
      } else {
        method = 2;
      }
      axios({
        url: `${apiPath}/admin/addOne`,
        method: "post",
        data: {
          projectname: projectName,
          electorNum: maxAccentNum,
          votingmode: method,
          startTime: startTime,
          endTime: endTime,
          description: description
        }
      })
        .then(res => {
          if (res.data.code === "SUCCESS") {
            this.addmodal = false;
            this.handleOnClickRefresh();
            this.$Notice.success({ title: "添加成功！" });
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.message}` });
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    toggleTableExpand(row, index) {
      if (!this.dialogFormVisible5 && !this.dialog) {
        this.xiangqing = true;
        this.row = row;
      }
    }
  },
  watch: {
    addControl(val, oldVal) {
      if (!val) {
        this.forms.userId = "";
      }
    },
    addmodal(val, oldVal) {
      if (!val) {
        this.projectInfo.projectName = "";
        this.projectInfo.maxAccentNum = "";
        this.projectInfo.method = "";
        this.projectInfo.startTime = "";
        this.projectInfo.endTime = "";
        this.projectInfo.introuction = "";
        this.projectInfo.submit = false;
      }
    },
    dialogFormVisible5(val, oldVal) {
      if (!val) {
        this.projectInfo.projectName = "";
        this.projectInfo.maxAccentNum = "";
        this.projectInfo.method = "";
        this.projectInfo.startTime = "";
        this.projectInfo.endTime = "";
        this.projectInfo.introuction = "";
        this.projectInfo.id = -1;
      }
    },
    projectInfo: {
      handler() {
        if (
          this.projectInfo.projectName != "" &&
          this.projectInfo.maxAccentNum != "" &&
          this.projectInfo.method != "" &&
          this.projectInfo.startTime != "" &&
          this.projectInfo.endTime != "" &&
          this.projectInfo.introuction != ""
        ) {
          this.projectInfo.submit = false;
        } else {
          this.projectInfo.submit = true;
        }
      },
      deep: true
    },
    checkControl(val, oldVal) {
      if (val) {
        this.loadData2();
      }
    }
  }
};
</script>

<style scoped>
.bottomButton {
  margin-top: 10px;
}
.bottom {
  margin-left: 39%;
  /* background-color: antiquewhite; */
}
.bottom1 {
  padding-top: 5px;
  margin-top: 5px;
}
.pagetitle {
  height: 5vh;
  left: 4%;
  position: relative;
  /* background-color: blueviolet; */
}
.Table {
  position: relative;
  width: 96%;
  margin-top: 5%;
  left: 2%;
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
.func {
  position: relative;

  right: 9%;
  float: right;
  top: 15%;
  /* background-color: #585858; */
}
.imgs {
  position: relative;
  left: 10%;
  width: 80%;
}
.autos {
  /* background-color: #7c7e7e; */
  position: relative;
  left: 31%;

  margin-top: 2vh;
}
</style>
<style lang="scss">
.ivu-form .ivu-form-item-label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 15px;
  font-weight: bold;
  color: #495060;
  line-height: 1;
  padding: 10px 12px 10px 0;
  box-sizing: border-box;
}
.ivu-modal-wrap {
  // margin-top: -15%;
}
.smallModal {
  .ivu-modal-wrap {
    margin-top: -8%;
  }
}
</style>
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