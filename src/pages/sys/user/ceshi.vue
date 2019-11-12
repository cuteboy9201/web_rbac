<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:39:47
 * @LastEditTime: 2019-09-16 16:39:47
 * @LastEditors: your name
 -->
<template>
  <el-dialog
    title="添加资产"
    :visible.sync="dialogVisible"
    @opened="dialogOpen"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
    >
        <el-form-item
        prop="address"
        label="主机地址"
        :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.address"></el-input>
        </el-form-item>

      <el-form-item
        prop="sshport"
        label="远程登陆端口"
        :rules="[{ required: true, message: '不能为空'}]"
      >
      <el-input v-model="form.sshport" ></el-input>
      </el-form-item>

      <el-form-item
        prop="sshinfo"
        label="管理账号"
        :rules="[{ required: true, message: '不能为空'}]"
      >
      <el-input v-model="form.sshinfo" ></el-input>
      </el-form-item>
    
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="saveUser"
        >保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import * as userService from "@/api/sys/user";
import { truncate } from 'fs';
import { Transform } from 'stream';
export default {
  name: "addForm",
  props: {
    info: Object,
    value: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {},
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
    // console.log("stasdfasdfasdfad");
      this.form={};
      
    //   console.log("stattttatt");
    //   if (this.info.id) {
    //     userService.getUser(this.info.id).then(data => {
    //       let form = {};
    //       form.address = data.address;
    //       form.sshport = data.sshport;
    //       form.sshinfo = data.sshinfo;
    //       this.form = form;
    //     });
    //   } else {
    //     this.form = {};
    //   }
    },
    saveUser() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          userService
            .saveUser({ ...this.form, id: this.user.id })
            .then(data => {
              if (data.statusCode === 500){
                this.loading = false,
                this.dialogVisible = true
              } else {
                console.log("请求成功")
                this.loading = false;
                this.dialogVisible = false;
                this.$emit("submit");
              }
            });
        } else {
          console.log("请求失败")
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