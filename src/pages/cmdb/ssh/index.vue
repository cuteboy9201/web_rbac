
<template>
  <iframe v-if="1===1"src="http://www.baidu.com"></iframe>
</template>


<script>
// import IframeRouterView from "@/components/d2-container-frame/iframe-router-view";
export default {
  //   components: {
  //   iframeRouterView
  // },
  data () {
    return {
      filename: __filename,
    }
  },
  //   // <d2-container-frame src="http://192.168.2.2:15200/webssh/?username=ceshi&hostname=dadas"/>
  mounted () {
    console.log('this.$route', this.$route)
    name = this.$route.name
  }
}
</script>

