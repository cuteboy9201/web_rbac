<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-11-18 10:17:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="./image/logo.png" alt="logo">
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
            <el-form-item prop="username">
              <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                <i slot="prepend" class="fa fa-user-circle-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" placeholder="密码">
                <i slot="prepend" class="fa fa-keyboard-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input @keyup.enter.native="submit" type="text" v-model="formLogin.code" placeholder="- - - -">
                <template slot="prepend">验证码</template>
                <template slot="append">
                  <img :src="imgcode" class="login-code" @click="changeImgCode" alt="验证码" title="点击换一张">
                </template>
              </el-input>
            </el-form-item>
            <el-button-group>
              <el-button size="default" @click="submit" type="primary">登录</el-button>
            </el-button-group>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-dialog title="快速选择用户" :visible.sync="dialogVisible" width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px;">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="user-btn" @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o" />
            <span>{{user.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

import config from './config/default'
import * as loginService from '@/api/sys/login'
import { mapActions } from 'vuex'
require('particles.js')
export default {
  data () {
    return {
      imgcode: '',
      imgkey: '',
      dialogVisible: false,
      users: [
        {
          name: '',
          username: '',
          password: ''
        }
      ],
      // 表单
      formLogin: {
        username: '',
        password: '',
        code: ''
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    // 初始化例子插件
    // location.reload();
    particlesJS('login', config)
  },
  created () {
    this.changeImgCode()
  },
  beforeDestroy () {
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS()
      pJSDom = []
    }
  },
  methods: {
    ...mapActions('d2admin/account', ['login']),

    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            vm: this,
            username: this.formLogin.username,
            password: this.formLogin.password,
            code: this.formLogin.code,
            codekey: this.imgkey
          })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    },
    changeImgCode () {
      var num = Math.ceil(Math.random() * 10)
      loginService.AccountCode(num).then(data => {
        this.imgcode = "http://dev.code.cn" + data.image_url;

        // this.imgcode = 'https://cuteeyes.8min.top' + data.image_url
        this.imgkey = data.key
      })
    }
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
