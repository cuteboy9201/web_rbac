<!--
 * @Author: your name
 * @Date: 2019-11-19 11:39:06
 * @LastEditTime: 2019-11-27 16:42:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /RBAC/src/pages/cmdb/adminuser/editForm.vue
 -->
<template>
  <el-dialog width="500px" title="添加资产信息" :visible.sync="dialogVisible" @opened="dialogOpen">
    <el-form ref="form" :model="form" label-width="80px" size="small">
     
      <el-form-item prop="name" label="名称" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item prop="connectHost" label="管理地址" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.connectHost"></el-input>
      </el-form-item>

      <el-form-item prop="connectPort" label="管理端口"  :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.connectPort"></el-input>
      </el-form-item>

      <el-form-item prop="env" label="资产环境"  :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.env"></el-input>
      </el-form-item>
    
      <el-form-item prop="authInfo" label="认证信息">
          <el-autocomplete v-model="select_value" :fetch-suggestions="querySearchAsync" placeholder="请选择管理账号" @select="handleSelect"></el-autocomplete>
      </el-form-item>

      <el-form-item prop="desc" label="描述"  :rules="[{ required: true, message: '不能为空'}]">
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
import * as apiService from '@/api/cmdb/property'
import { Message } from 'element-ui'
export default {
  name: 'editpage',
  props: {
    entity: Object,
    value: Boolean
  },
  data () {
    return {
      selectData: [],   // 搜索源数据
      loading: false,   // 防止表单多次提交
      dialogVisible: false,  
      select_value: "",
      form: {},
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

    querySearchAsync(queryString, cb){
    // 关键字搜索
      var restaurant = this.selectData;
      var results = queryString ? restaurant.filter(this.createStateFilter(queryString)): restaurant;
      cb(results);
    },

    createStateFilter(queryString) {
    // 关键字搜索规则
      return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },
 
    handleSelect(item) {
        console.log(item)
        this.select_value = item.value
        this.form.authInfo = item.id
    },
    
    get_select_value(value){
      data = this.selectData;
      var results = queryString ? data.filter(this.createStateFilter(value)): data;
      console.log("sehzhi ") 
      console.log(results)   
    },
    
    dialogOpen () {
    // 打开窗口
      this.$refs.form.resetFields()
      if (this.entity.id) {
        apiService.getInfoById(this.entity.id).then(data => {
          let form = {}
          form.name = data.name;
          form.connectHost = data.connectHost;
          form.connectPort = data.connectPort;
          form.authType = data.authType;
          form.env = data.env;
          form.desc=data.desc;

          // 设置搜索显示数据
          if (data.authInfo.length !== 0) {
            form.authInfo = data.authInfo;
            let obj = {}
            let option_data = this.selectData;
            obj = option_data.find(item => {
              return item.id === form.authInfo
            })
            this.select_value = obj.value;
          }
          this.form = form;
        })
      } else {
        this.form = {}
      }
    },

    save () {
    // 保存或者修改信息 根据 entity.id来判断
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          if (this.entity.id){
            // 当存在entity.id的时候 提交是put为修改信息
          apiService.put({ ...this.form, id: this.entity.id }).then(data => {
              this.loading = false
              this.dialogVisible = false
              this.$emit('submit')
            }).catch(err=> {
              Message({
                message: err,
                type: "error",
                duration: 1.5*1000
              })
              this.loading = false
              this.dialogVisible = true
            })
          } else{
            //否则就是新添加信息
            apiService.save({ ...this.form}).then(data => {
                this.loading = false
                this.dialogVisible = false
                this.$emit('submit')
              }).catch(err=> {
                Message({
                  message: err,
                  type: "error",
                  duration: 1.5*1000
                })
                this.loading = false
                this.dialogVisible = true
              })           
          }
        } else {
          return false
        }
      })
    },

    close () {
    // 关闭页面
      this.$refs['form'].resetFields()
      this.select_value = ""
      this.dialogVisible = false
    },

    getSelect() {
        apiService.getSelect().then(data=> {
            this.selectData = data;
        })
    }
  },

  created() {
    //   页面加载对时候同时加载
    this.getSelect();
  }
}
</script>
