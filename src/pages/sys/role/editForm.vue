<template>
  <el-dialog title="角色信息" width="500px" :visible.sync="dialogVisible" @opened="dialogOpen" @closed="dialogClose">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item prop="name" label="角色名称" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="角色标识" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loading" @click="saveRole">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import * as roleService from '@/api/sys/role'
import { Message } from 'element-ui'
export default {
  name: 'roleEditForm',
  props: {
    role: Object,
    value: Boolean
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      form: {}
    }
  },
  watch: {
    value (val) {
      this.dialogVisible = val
    },
    dialogVisible (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    dialogOpen () {
      this.$refs.form.resetFields()
      if (this.role.id) {
        roleService.getRole(this.role.id).then(data => {
          let form = {}
          form.name = data.name
          form.code = data.code
          form.description = data.description
          this.form = form
        })
      } else {
        this.form = {}
      }
    },
    saveRole () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          roleService
            .saveRole({ ...this.form, id: this.role.id })
            .then(data => {
              this.loading = false
              this.dialogVisible = false
              this.$emit('submit')
            })
            .catch(err => {
              Message({
                message: err,
                type: 'error',
                duration: 2 * 1000
              }),
              this.loading = false,
              this.dialogVisible = true
            })
        } else {
          return false
        }
      })
    },
    close () {
      this.dialogClose()
    },
    dialogClose () {
      this.$refs['form'].resetFields()
      this.dialogVisible = false
    }
  }
}
</script>
