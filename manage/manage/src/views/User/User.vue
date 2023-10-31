<template>
  <div class="user-add">
    <el-button type="primary" @click="formline.dialog = true">+新增</el-button>
    <div class="seach">
      <el-form :model="formline" label-width="120px">
        <el-form-item label="请输入">
          <el-input v-model="formline.keyword" placeholder="请输入用户名" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="SeachClick">搜索</el-button>
    </div>
  </div>
  <div class="userTable">
    <el-table :data="tableData.tableList" border style="width: 100%">
      <el-table-column
        v-for="item in tableData.tableheader"
        :key="item.name"
        :prop="item.name"
        :label="item.label"
        :show-overflow-tooltip="true"
        width="160px"
      />
      <el-table-column fixed="right" label="操作" width="auto">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="example-pagination-block">
      <el-pagination
        :page-size="pageconfig.limit"
        layout="prev, pager, next"
        :total="pageconfig.total"
        @current-change="changePage"
      />
    </div>
    <ContainerDialog />
  </div>

  <el-dialog
    v-model="formline.dialog"
    width="50%"
    @close="formline.dialog = false"
  >
    <el-form :model="dialogForm" label-width="120px" :rules="rules">
      <el-form-item label="名字" prop="name">
        <el-input v-model="dialogForm.name" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="dialogForm.age" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="dialogForm.sex" placeholder="请选择">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="brithday">
        <el-date-picker
          v-model="dialogForm.brithday"
          type="date"
          placeholder="请选择"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="dialogForm.address" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="AddUser">添加</el-button>
        <el-button @click="formline.dialog = false">返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { onMounted, onUpdated, reactive } from "vue";
import { tabledata, delData, AddUserdata } from "../../api/api";
import ContainerDialog from "../../components/ContainerDialog.vue";
import { useStore } from "vuex";
export default {
  components: {
    ContainerDialog,
  },
  setup() {
    let store = useStore();
    let formline = reactive({
      keyword: "",
      dialog: false,
    });

    //Adduser
    let dialogForm = reactive({
      name: "",
      age: "",
      sex: "",
      brithday: "",
      address: "",
    });
    //Adduser rules
    let rules = reactive({
      name: [
        {
          required: true,
          message: "Please input  name",
        },
        { min: 2, max: 5, message: "Length should be 3 to 5" },
      ],
      age: [
        {
          required: true,
          message: "Please input age",
        },
        {
          type: "number",
          message: "age must be a number",
        },
      ],
      sex: [
        {
          required: true,
          message: "Please input sex",
        },
      ],
      brithday: [
        {
          type: "date",
          required: true,
          message: "Please pick a date",
          trigger: "change",
        },
      ],
      address: [
        {
          required: true,
          message: "Please input address",
        },
      ],
    });

    let tableData = reactive({
      tableList: [],
      tableheader: [
        {
          name: "tableList_name",
          label: "名字",
        },
        {
          name: "tableList_age",
          label: "年龄",
        },
        {
          name: "tableList_sex",
          label: "性别",
        },
        {
          name: "tableList_brithday",
          label: "出生日期",
        },
        {
          name: "tableList_address",
          label: "地址",
        },
      ],
    });
    //pageconfig
    let pageconfig = reactive({
      total: 0,
      page: 1,
      limit: 9,
      name: "",
    });
    let tabledataList = async (params) => {
      await tabledata("/user/tabledata", { params }).then((res) => {
        pageconfig.total = res.data.count;
        for (let i = 0; i < res.data.Limit.length; i++) {
          const element = res.data.Limit[i];
          element.tableList_brithday = new Date(
            Date.parse(element.tableList_brithday) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "")
            .slice(0, 10);
        }
        tableData.tableList = res.data.Limit;
      });
    };
    let changePage = (page) => {
      pageconfig.page = page;
      tabledataList(pageconfig);
    };
    //addUser
    let AddUser = async () => {
      await AddUserdata("/user/adduser", { dialogForm }).then((res) => {
        ElMessage({ message: res.data.tip, type: "success" });
        formline.dialog = false;
      });
    };
    //Edit
    let handleEdit = (row) => {
      let editdata = {
        value: true,
        data: row,
      };
      store.commit("dialogChange", editdata);
    };
    //Delete
    let handleDelete = async (row) => {
      await delData("/user/deldata", { row }).then((res) => {
        ElMessage({ message: res.data.tip, type: "error" });
      });
    };
    //Seach
    let SeachClick = () => {
      pageconfig.name = formline.keyword;
      tabledataList(pageconfig);
    };
    //更新table数据
    onUpdated(() => {
      tabledataList(pageconfig);
    });
    onMounted(() => {
      tabledataList(pageconfig);
    });
    return {
      tableData,
      pageconfig,
      formline,
      dialogForm,
      rules,
      changePage,
      handleEdit,
      handleDelete,
      SeachClick,
      AddUser,
    };
  },
};
</script>
<style lang="scss" scoped>
.user-add,
.seach {
  display: flex;
  justify-content: space-between;
}
.seach {
  width: 32%;
}
.userTable {
  height: 460px;
}
.example-pagination-block {
  margin-top: 10px;
  float: right;
}
</style>