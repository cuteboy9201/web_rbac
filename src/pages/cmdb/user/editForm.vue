<!--
 * @Author: your name
 * @Date: 2019-11-19 11:39:06
 * @LastEditTime : 2019-12-26 15:17:09
 * @LastEditors  : YouShumin
 * @Description: In User Settings Edit
 * @FilePath: /RBAC/src/pages/cmdb/adminuser/editForm.vue
 -->
<template>
  <el-dialog width="500px" title="资产授权" :visible.sync="dialogVisible" @opened="dialogOpen">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item prop="hostInfo" label="资产信息" :rules="[{ required: true, message: '不能为空'}]">
        <el-select
          v-model="form.hostInfo"
          multiple
          filterable
          remote
          placeholder="请输入关键词"
          :loading="loading"
        >
          <el-option
            v-for="item in select_host_data"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="authUser" label="登陆用户" :rules="[{ required: true, message: '不能为空'}]">
        <el-select
          v-model="form.authUser"
          filterable
          remote
          placeholder="请输入关键词"
          :loading="loading"
        >
          <el-option
            v-for="item in select_auth_data"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="userInfo" label="授权用户">
        <el-select
          v-model="form.userInfo"
          multiple
          filterable
          remote
          placeholder="请输入关键词"
          :loading="loading"
        >
          <el-option
            v-for="item in select_user_data"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="roleInfo" label="授权角色">
        <el-select
          v-model="form.roleInfo"
          multiple
          filterable
          remote
          placeholder="请输入关键词"
          :loading="loading"
        >
          <el-option
            v-for="item in select_role_data"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
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
import * as apiUserRight from "@/api/cmdb/userright";
import { Message } from "element-ui";
import { log } from "util";
export default {
  name: "UserRigehtEdit",
  props: {
    entity: Object,
    value: Boolean
  },
  data() {
    return {
      select_host_data: [],
      select_user_data: [],
      select_auth_data: [],
      select_role_data: [],
      loading: false,
      dialogVisible: false,
      form: {}
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
    get_host_data() {
      apiUserRight.getHostSelect().then(data => {
        this.select_host_data = data;
      });
    },
    get_auth_data() {
      apiUserRight.getAuthSelect().then(data => {
        this.select_auth_data = data;
      });
    },
    get_user_data() {
      apiUserRight.getUserSelect().then(data => {
        this.select_user_data = data;
      });
    },
    get_role_data() {
      apiUserRight.getRoleSelect().then(data => {
        this.select_role_data = data;
      });
    },
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
            console.log({ ...this.form });
            // adminuserService
            //   .put({ ...this.form, id: this.entity.id })
            //   .then(data => {
            //     this.loading = false;
            //     this.dialogVisible = false;
            //     this.$emit("submit");
            //   })
            //   .catch(err => {
            //     Message({
            //       message: err,
            //       type: "error",
            //       duration: 1.5 * 1000
            //     });
            //     this.loading = false;
            //     this.dialogVisible = true;
            //   });
          } else {
            //否则就是新添加信息
            apiUserRight
              .save({ ...this.form })
              .then(data => {
                Message({
                  message: "添加成功",
                  type: "success",
                  duration: 1.5 * 1000
                });
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
  },
  created() {
    this.get_host_data();
    this.get_auth_data();
    this.get_user_data();
    this.get_role_data();
  }
};
</script>
