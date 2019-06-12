<template>
  <div class="entity-list-page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ Name: 'UserDashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>实体管理</el-breadcrumb-item>
      <el-breadcrumb-item>实体列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="handle-box">
        <el-switch v-model="isDeletedEntityShown" active-text="显示删除实体">
        </el-switch>
        <el-button type="primary" size="small" @click="showCreateModal">添加实体</el-button>
      </div>
      <el-table class="entity-list-table" :data="filterEntityList" tooltip-effect="dark" :row-class-name="setTableRowClassName">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">{{ new Date(scope.row.created_at).toLocaleString() }}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="showModifyModal(scope.row)" v-if="!scope.row.deleted_at">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteEntity(scope.row)" v-if="!scope.row.deleted_at">删除</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="restoreEntity(scope.row)" v-else>恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :background="true" :page-size="pageSize" :current-page.sync="currentPage" :total="count" @current-change="getEntityList"></el-pagination>
      <el-dialog :title="entity.id ? '修改实体信息' : '新增实体'" :visible.sync="isModalShown">
        <el-form :model="entity" label-width="80px" class="create-entity-form">
          <el-form-item label="实体名称">
            <el-input v-model="entity.name" autocomplete="off" :disabled="!!entity.id"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="entity.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isModalShown = false">取 消</el-button>
          <el-button type="primary" @click="saveEntity">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Table, TableColumn, Breadcrumb, BreadcrumbItem, Button, Form, FormItem, Input, Select, Option, Dialog, Pagination, Switch } from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Switch)

import { createEntity, deleteEntity, restoreEntity, getEntity, updateEntity, listEntity } from '@/api/entity'
export default {
  name: 'EntityList',
  data() {
    return {
      pageSize: 12,
      currentPage: 1,
      count: 0,
      entityList: [],
      isModalShown: false,
      isDeletedEntityShown: false,
      entity: {
        id: null,
        name: '',
        description: '',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    }
  },
  computed: {
    filterEntityList() {
      if (this.isDeletedEntityShown) {
        return this.entityList
      } else {
        return this.entityList.filter(entity => {
          return !entity.deleted_at
        })
      }
    }
  },
  created() {
    this.getEntityList()
  },
  methods: {
    setTableRowClassName({ row, rowIndex }) {
      if (row.deleted_at) {
        return 'deleted-row'
      }
    },
    async getEntityList() {
      let { count, rows } = await listEntity({
        limit: this.pageSize,
        page: this.currentPage,
        paranoid: false,
        order: ['-deleted_at', '-created_at'].toString()
      })
      this.entityList = rows
      this.count = count
    },
    showCreateModal() {
      this.entity = {
        id: null,
        name: '',
        description: '',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
      this.isModalShown = true
    },
    async showModifyModal(entity) {
      this.entity = await getEntity(entity.id)
      this.isModalShown = true
    },
    async saveEntity() {
      if (this.entity.id) {
        await updateEntity(this.entity)
      } else {
        await createEntity(this.entity)
      }
      this.isModalShown = false
      this.getEntityList()
    },
    async deleteEntity(entity) {
      this.$confirm('此操作会删除该实体，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteEntity(entity.id)
        this.getEntityList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    async restoreEntity(entity) {
      await restoreEntity(entity.id)
      this.getEntityList()
    }
  }
}
</script>
<style lang="scss">
.entity-list-page {
  .el-breadcrumb {
    margin: 10px 0 20px;
  }
  .content {
    background-color: #fff;
    .handle-box {
      padding: 20px;
      text-align: right;
    }
    .entity-list-table {
      tbody {
        .deleted-row {
          background-color: #ddd;
        }
      }
    }
    .el-pagination {
      padding: 20px;
    }
  }
}
</style>