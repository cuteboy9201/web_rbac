<!--
 * @Author: your name
 * @Date: 2019-11-19 11:39:06
 * @LastEditTime: 2019-11-26 10:08:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /RBAC/src/pages/cmdb/adminuser/editForm.vue
 -->
<template>
  <el-dialog width="500px" title="资产管理信息" :visible.sync="dialogVisible" @opened="dialogOpen">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item prop="name" label="名称" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="sshUser" label="用户" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.sshUser"></el-input>
      </el-form-item>
      <el-form-item prop="authType" label="认证方式" :rules="[{ required: true, message: '不能为空'}]">
        <el-select class="filter-item" v-model="form.authType" placeholder="请选择认证方式">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="form.authType===1"
        prop="sshPass"
        label="密码"
        :rules="[{ required: true, message: '不能为空'}]"
      >
        <el-input v-model="form.sshPass"></el-input>
      </el-form-item>
      <el-form-item
        v-if="form.authType===2"
        prop="sshKey"
        label="密钥"
        :rules="[{ required: true, message: '不能为空'}]"
      >
        <el-input type="textarea" v-model="form.sshKey"></el-input>
      </el-form-item>
      <el-form-item prop="sudoPass" label="sudo密码">
        <el-input v-model="form.sudoPass"></el-input>
      </el-form-item>
      <el-form-item prop="desc" label="描述" :rules="[{ required: true, message: '不能为空'}]">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="save">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import * as adminuserService from "@/api/cmdb/adminuser";
import { Message } from "element-ui";
export default {
  name: "interfaceEditForm",
  props: {
    entity: Object,
    value: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {},
      typeOptions: [
        {
          value: 1,
          label: "密码"
        },
        {
          value: 2,
          label: "密钥"
        }
      ]
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    dialogOpen() {
      this.$refs.form.resetFields();
      if (this.entity.id) {
        adminuserService.getInfoById(this.entity.id).then(data => {
          let form = {};
          form.name = data.name;
          form.sshUser = data.sshUser;
          form.sshPass = data.sshPass;
          form.authType = data.authType;
          form.sudoPass = data.sudoPass;
          form.sshKey = data.sshKey;
          form.desc = data.desc;
          this.form = form;
        });
      } else {
        this.form = {};
      }
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.entity.id) {
            // 当存在entity.id的时候 提交是put为修改信息
            adminuserService
              .put({ ...this.form, id: this.entity.id })
              .then(data => {
                this.loading = false;
                this.dialogVisible = false;
                this.$emit("submit");
              })
              .catch(err => {
                Message({
                  message: err,
                  type: "error",
                  duration: 1.5 * 1000
                });
                this.loading = false;
                this.dialogVisible = true;
              });
          } else {
            //否则就是新添加信息
            adminuserService
              .save({ ...this.form })
              .then(data => {
                this.loading = false;
                this.dialogVisible = false;
                this.$emit("submit");
              })
              .catch(err => {
                Message({
                  message: err,
                  type: "error",
                  duration: 1.5 * 1000
                });
                this.loading = false;
                this.dialogVisible = true;
              });
          }
        } else {
          return false;
        }
      });
    },
    close() {
      this.$refs["form"].resetFields();
      this.dialogVisible = false;
    }
  }
};
</script>
