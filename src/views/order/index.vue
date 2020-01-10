<template>
  <div class="content-box">
    <el-card shadow="hover" class="card-pb0 mb20">
      <el-form :inline="true" :model="formData">
        <el-form-item label="下单时间">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker v-model="formData.date_start" type="date" placeholder="起始日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker v-model="formData.date_end" type="date" placeholder="结束日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="formData.order_id" placeholder="订单号" clearable />
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="formData.account" placeholder="账号" clearable />
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="formData.nickname" placeholder="角色名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="hover">
      <el-table
        :data="tableData"
        border
        class="w100"
      >
        <el-table-column
          fixed
          prop="date"
          label="日期"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="province"
          label="省份"
        />
        <el-table-column
          prop="city"
          label="市区"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="zip"
          label="邮编"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <router-link to="/order/detail?id=999" class="mr8 el-link el-link--success">详情</router-link>
            <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-card shadow="never" class="mt-1"><el-pagination background layout="prev, pager, next, jumper" :total="pageData.total" :current-page.sync="pageData.pn" @current-change="handleCurrentChange" /></el-card>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderIndex',
  data() {
    return {
      formData: {},
      tableData: [],
      pageData: {
        total: 0,
        pn: 1
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
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
      var { data } = await this.$get('/order/list', params)
      this.tableData = data.list
      this.pageData.total = data.total
    }
  }
}
</script>
