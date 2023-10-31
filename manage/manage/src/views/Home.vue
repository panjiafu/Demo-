<template>
  <div class="C-layout">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="user">
            <img class="userImg" src="../assets/images/headerimg.png" alt="" />
            <div class="userinfo">
              <p class="name">{{$store.state.name}}</p>
              <p class="role">{{$store.state.root}}</p>
            </div>
          </div>
          <div class="login-info">
            <p class="login-time">登陆时间:<span>{{new Date().toLocaleDateString().replace(/\//g,'-')}}</span></p>
            <p class="login-addres">地点:<span>{{$store.state.address}}</span></p>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px">
          <el-table :data="dataList.list">
            <el-table-column
              v-for="(val, key) in tablelabel"
              :prop="key"
              :label="val"
              :key="key"
            />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="r-icon">
          <el-card
            :body-style="{ display: 'flex', padding: '0px' }"
            v-for="item in dataList.ricon"
            :key="item.name"
          >
            <component
              class="icons"
              :is="item.icon"
              :style="{ background: item.color }"
            ></component>
            <div class="r-conent">
              <p class="r-top">{{ item.name }}</p>
              <p class="r-botton">{{ item.value }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 240px">
          <div ref="echart" style="height: 240px"></div>
        </el-card>
        <div class="T-echart">
          <el-card style="height: 260px">
            <div ref="T-echarto" style="height: 240px"></div>
          </el-card>
          <el-card style="height: 260px">
            <div ref="T-echartt" style="height: 240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, reactive } from "vue";
import { selldata, echartdata } from "../api/api";
import * as echarts from "echarts";
export default {
  setup() {
    let dataList = reactive({
      list: [],
      ricon: [],
      time:''
    });
    dataList.ricon.push(
      {
        name: "图标1",
        value: "2023",
        icon: "SuccessFilled",
        color: "rgb(221 87 188)",
      },
      {
        name: "图标2",
        value: "5523",
        icon: "StarFilled",
        color: "rgb(93 84 200)",
      },
      {
        name: "图标3",
        value: "623",
        icon: "CircleCheckFilled",
        color: "rgb(166 181 53)",
      }
    );
    let tablelabel = {
      sell_name: "名称",
      sell_today: "today",
      sell_month: "month",
      sell_count: "count",
    };


    //Echarts
    //折线
    let options = reactive({
      legend: {
        show: true,
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        show: "true",
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [],
    });
    // 柱状
    let baroptions = {
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [],
    };
    //饼状
    let pieoption = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [],
    };
    let { proxy } = getCurrentInstance();
    let Tabledata = async () => {
      await selldata("/user/sell").then((res) => {
        dataList.list = res.data.data;
      });
    };
    let Echartdata = async () => {
      await echartdata("/user/echartdata").then((res) => {
        let order = res.data.echartdata.orderdata;
        let value = res.data.echartdata.valuedata;
        let user = res.data.echartdata.userdata;
        let keyArray = Object.keys(value[0]);
        let seriesdata = [];
        keyArray.forEach((element) => {
          seriesdata.push({
            name: element,
            type: "line",
            data: value.map((item) => {
              return item[element];
            }),
          });
        });
        options.xAxis.data = order;
        options.series = seriesdata;
        let myEcharts = echarts.init(proxy.$refs["echart"]);
        myEcharts.setOption(options);

        //柱状
        baroptions.xAxis.data = user.map((item) => item.date);
        baroptions.series = [
          {
            name: "新用户",
            data: user.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: user.map((item) => item.active),
            type: "bar",
          },
        ];
        let TEcharts = echarts.init(proxy.$refs["T-echarto"]);
        TEcharts.setOption(baroptions);

        //饼状
        let userarray = []
        user.forEach(element=>{
          userarray.push({
            name:element.date,
            value:element.new+element.active,
            
          })
        })
        pieoption.series = [
          {
            name:'在线用户',
            data:userarray,
            type:"pie",
            radius: '50%',
          }
        ]
        let TEchartst = echarts.init(proxy.$refs["T-echartt"]);
        TEchartst.setOption(pieoption);
      });
    };
    onMounted(() => {
      Tabledata();
      Echartdata();
    });

    return {
      onMounted,
      dataList,
      tablelabel,
    };
  },
};
</script>
<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(226, 222, 222);
  margin-bottom: 20px;
  .userImg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 50px;
  }
}
.login-info {
  .login-time {
    margin-bottom: 10px;
  }
  span {
    margin-left: 20px;
  }
}
.r-icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icons {
    width: 80px;
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    color: #fff;
  }
  .r-conent {
    margin-left: 20px;
    margin-top: 10px;
    .r-top {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .r-botton {
      font-size: 15px;
    }
  }
}
.T-echart {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .el-card {
    width: 48%;
  }
}
</style>
