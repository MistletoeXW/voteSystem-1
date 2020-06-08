<template>
  <div>
    <Row>
      <Col span="12" offset="6" :bordered="false">
        <Card>
           <Row>
          <span class="stitle">详情：</span>
          <div id="method">
            <!-- <span class="expand-key">投票方式:</!--> 
            <span class="expand-value">{{ row.votingmode }}</span>
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
          <Divider class="spider"></Divider>
         
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    row: Object
  }
}
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
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  /* font-weight: bold; */
}
.spider {
  font-weight: bold;
}
.stitle {
  margin-left: 3px;
  margin-bottom: -8px;

  font-size: 22px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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