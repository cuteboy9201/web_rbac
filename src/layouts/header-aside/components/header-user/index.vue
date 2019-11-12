<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-09-04 15:12:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">你好 {{info.name}}</span>
    <el-dropdown-menu slot="dropdown">
      

      
      <el-dropdown-item @click.native="resetPass">
        <i class="el-icon-edit-outline"></i> 修改密码
      </el-dropdown-item>

      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5" /> 注销
      </el-dropdown-item>
         
    </el-dropdown-menu>
  <re-password :user="user" v-model="rePasswordVisible"/>
  </el-dropdown>
  
</template>
<script>
import { mapState, mapActions } from "vuex";
import rePassword from './rePassword';
import { truncate } from 'fs';
import { invoke } from 'q';
import { inflate } from 'zlib';
export default {
  // name: "IndexPage",
  components: {rePassword},
  data() {
    return { 
      user: {},
      rePasswordVisible: false,
      };
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  methods: {
    ...mapActions("d2admin/account", ["logout"]),
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        vm: this,
        confirm: true
      });
    },
    resetPass() {
      this.user = this.info;
      console.log(this.role);
      this.rePasswordVisible = true;
      console.log(this.user.name)
    },

  }
};
</script>
