<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 17:38:54
 * @LastEditTime: 2019-09-04 16:21:05
 * @LastEditors: Please set LastEditors
 -->

<template>
  <el-dialog :visible.sync="dialogVisible" @opened="dialogOpen" @closed="dialogClose" top="10%" width="28%">
    <div slot="title">修改<el-tag>{{user.name}}</el-tag>的密码</div>    
    <el-form ref="form" :model="form" label-width="80px" size="small" :rules="rules">
      
      <el-form-item prop="newpassword" label="新密码" >
        <el-input show-password :placeholder="form.newpassword" v-model="form.newpassword">
          
        </el-input>
      </el-form-item>

      <el-form-item 
        prop="repassword"
        label="确认密码" >
      <el-input autosize show-password :placeholder="form.repassword" v-model="form.repassword">
      </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loading" @click="retPassword">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import { constants } from 'crypto';
import * as userService from "@/api/sys/user";
export default {
  name: "userResetPassword",
  props: {
    user: Object,
    value: Boolean
  },
  data() {
    var validataPass = (rule, value, callback) =>{
      if ( value === '') {
        callback(new Error('请再次输入密码'));
      }else if (value !== this.form.newpassword){
        callback(new Error('两次输入的密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      dialogVisible: false,
      form: {
      },
      rules: {
        newpassword: [
          {required: true, message: "请输入密码", trigger: 'blur'},
          {pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/, message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位' },],
        repassword: [
          {required: true, validator: validataPass, trigger: 'blur'}],
      },
      formLabelWidth: '120px',
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
      let form = {};
      form.newpassword = "";
      form.repassword = "";
      form.name = this.user.id;
      this.form = form;
    },
    retPassword() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = false;
          userService
            .adminChangePassword({ ...this.form})
            .then(data => {
              this.loading = false;
              this.dialogVisible = false;
              this.$emit("submit");
            });
        } else {
          return false;
        }
      });
    },
    close() {
      this.dialogClose();
    },
    dialogClose() {
      this.$refs["form"].resetFields();
      this.dialogVisible = false;
    }
  }
};
</script>

