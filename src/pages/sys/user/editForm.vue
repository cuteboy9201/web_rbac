<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-09-04 14:18:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    title="用户信息"
    :visible.sync="dialogVisible"
    @opened="dialogOpen"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
      :rules="rules"
    >
      <el-form-item
        prop="name"
        label="账号"
        :rules="[{ required: true, message: '不能为空'}]"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item
        prop="trueName"
        label="用户名称"
        :rules="[{ required: true, message: '不能为空'}]"
      >
      <el-input v-model="form.trueName" ></el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[{ required: true, message: '不能为空'}]"
      >
      <el-input v-model="form.email" ></el-input>
      </el-form-item>
      <el-form-item
        prop="phone"
        label="电话"
        :rules="[{ required: true, message: '不能为空'}]"
      >
      <el-input v-model="form.phone" ></el-input>
      </el-form-item>

      
      <el-form-item  v-if="!this.user.id"
        prop="password"
        label="密码">
      <el-input show-password :placeholder="form.password" v-model="form.password" >
        <!-- <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;" class="el-input__icon iconfont icon-xianshi"></i> -->
      </el-input>
      </el-form-item>
    
      <el-form-item v-if="!this.user.id"
        prop="repassword"
        label="确认密码">
      <el-input show-password :placeholder="form.repassword" v-model="form.repassword">
        <!-- <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;" class="el-input__icon iconfont icon-xianshi"></i> -->
      </el-input>
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
  name: "userEditForm",
  props: {
    user: Object,
    value: Boolean
  },
  data() {
    var validataPass = (rule, value, callback) =>{
      if ( value === '') {
        callback(new Error('请再次输入密码'));
      }else if (value !== this.form.password){
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
        password: [
          {required: true, message: "请输入密码", trigger: 'blur'},
          {pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/, message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位' }
        ],
        repassword: [
          {required: true, validator: validataPass, trigger: 'blur'}
        ]
      }
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
      if (this.user.id) {
        userService.getUser(this.user.id).then(data => {
          let form = {};
          form.name = data.name;
          form.trueName = data.trueName;
          form.phone = data.phone;
          form.email = data.email;
          this.form = form;
        });
      } else {
        this.form = {};
      }
    },
    saveUser() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // this.loading = true;
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

