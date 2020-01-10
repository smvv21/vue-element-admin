<template>
  <div class="content-box">
    <el-card shadow="hover" class="card-pb0 mb20">
      <el-form :inline="true" :model="formData">
        <el-form-item label="名字或Email">
          <el-input v-model="formData.nickname" placeholder="名字或Email" clearable />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>

        <el-form-item class="ml30">
          <el-button type="warning" icon="el-icon-plus" @click="showAddDialog=true">添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="新增成员"
      :visible.sync="showAddDialog"
      width="30%"
      center>
      <el-form :model="addNewFormData" label-width="80px">
        <el-form-item label="名字">
          <el-input v-model="addNewFormData.nickname" placeholder="名字" clearable />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="addNewFormData.email" placeholder="Email" clearable />
        </el-form-item>
        <el-form-item label="角色">
          <el-radio-group v-model="addNewFormData.role">
            <el-radio label="manager">组长</el-radio>
            <el-radio label="admin">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="onAddNewSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-card shadow="hover">
      <el-table
        :data="tableData"
        border
        class="w100"
      >
        <el-table-column
          fixed
          prop="nickname"
          label="名字"
        />
        <el-table-column
          prop="email"
          label="Email"
        />
        <el-table-column
          prop="role"
          label="角色"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="140"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleClick(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-card shadow="never" class="mt-1"><el-pagination background layout="prev, pager, next, jumper" :total="pageData.total" :current-page.sync="pageData.pn" @current-change="handleCurrentChange" /></el-card>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'ManagerIndex',
  data() {
    return {
      formData: {},
      tableData: [],
      pageData: {
        total: 0,
        pn: 1
      },

      showAddDialog: false,
      addNewFormData: {}
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.getList()
    },
    handleClick(row) {

    },
    handleCurrentChange(pn) {
      this.getList()
    },
    async getList() {
      var params = Object.assign({}, this.formData, this.pageData)
      var { data } = await this.$get('/manager/list', params)
      this.tableData = data.list
      this.pageData.total = data.total
    },
    async onAddNewSubmit() {
      this.showAddDialog = false
      var params = Object.assign({}, this.addNewFormData)
      var { data } = await this.$get('/manager/add', params)
      //TODO
    }
  }
}
</script>
