<template>
  <div>
  <div class="phone">
       <div style="height:600px;overflow:auto;background-color: #FFF;">
            <AppIndex></AppIndex>
       </div>
     <div>
      <!-- <el-dialog @close="dialogClose" title="编辑富文本" :visible.sync="richtext" size="small">
            <RichText v-if="richtext" ></RichText>
        </el-dialog>
        <el-dialog @close="dialogClose"  title="编辑单图" :visible.sync="simple_picture" size="small">
            <SimplePicture v-if="simple_picture"></SimplePicture>
        </el-dialog>
        <el-dialog @close="dialogClose"  title="编辑橱窗" :visible.sync="image_display" size="small">
            <ImageDisplay v-if="image_display"></ImageDisplay>
        </el-dialog>
        <el-dialog @close="dialogClose"  title="编辑多图" :visible.sync="multi_image" size="small">
            <MultiImage v-if="multi_image"></MultiImage>
        </el-dialog>
        <el-dialog @close="dialogClose"  title="编辑标题导语" :visible.sync="title_lead" size="small">
            <TitleLead v-if="title_lead"></TitleLead>
        </el-dialog>
        <el-dialog @close="dialogClose"  title="编辑二图二列" :visible.sync="two_image" size="small">
            <TwoImage v-if="two_image"></TwoImage>
        </el-dialog> -->
        <el-dialog @close="dialogClose"  title="添加模块" :visible.sync="selected" size="small">
            <MainPage v-if="selected"></MainPage>
        </el-dialog>
        <!-- <el-dialog @close="dialogClose"  title="编辑底部框" :visible.sync="copyright" size="small">
            <Copyright v-if="copyright"></Copyright>
        </el-dialog> -->
      </div> 

  </div>
 
  </div>
</template>

<script>

import MainPage from "./MainPage"
import { mapState, mapActions,mapGetters } from 'vuex'
import AppIndex from "./AppIndex.vue"
export default {
  name: 'phone',
  components: {
      MainPage,
      AppIndex,
  },
  computed: {
    routePath() {
        return this.$route.path.replace(/^\/(zh-cn|en)2?/, '');
    },
    ...mapState ({
        designCurrentData: state => state.designCurrentData,
        designCurrentType: state => state.designCurrentType,
    }),
    ...mapGetters({
        getDesignCurrentType: 'getDesignCurrentType',
        getType: 'getDesignCurrentType',
        getModes: 'getModes',
        getDesignDialog:'getDesignDialog'
    })
  },
  data() {
      var url = '/#' + '/app_index?t='+ this.msg;
      return { 
          url:url,
          richtext: false,
          selected: false,
          simple_picture: false,
          image_display: false,
          multi_image: false,
          title_lead: false,
          two_image:false,
          copyright:false,
      }
  },
  props: ['msg'],
  methods: {
      handleType: function(type, status) {
          switch(type) {
              case "selected":
                this.selected = status;
                break;
          }
      },
      ...mapActions({
          setDesignCurrentData: 'setDesignCurrentData',
          setDesignCurrentType: 'setDesignCurrentType',
          setModes: 'setModes',
          delMode: 'delMode',
          setDesignDialog: 'setDesignDialog'
      }),
      onClick: function() {
          var _this = this;
          var data = this.getModes;
          this.Resource.put({
              resource: "h5_design.webpage",
              data: data,
              success: function(data) {
                  
              },
              error: function() {
                  _this.$notify({
                      title: '失败',
                      message: '保存失败，请联系相关研发～',
                      type: 'error'
                  });
              }
          })
      },
      resetDialog: function() {
          this.richtext=false;
          this.selected=false;
          this.simple_picture=false;
          this.image_display=false;
          this.multi_image=false;
          this.title_lead=false;
          this.two_image=false;
          this.copyright=false;
      },
      dialogClose: function() {
          this.setDesignDialog({
              dialog_name: "",
              status: false
          })
      }
  },
  watch: {
      getDesignDialog: function(item) {
          this.handleType(item.dialog_name, item.status)
      }
  },
  mounted() {
      this.setModes([]);
      this.setDesignCurrentData({});
      var _this = this;
      this.dialogClose();      
  }
};
</script>

<style>
  .phone {
    margin: 20px 20px 0 20px;
    background-image: url('../assets/phone.png');
    background-repeat: no-repeat;
    background-size: 100%;
    height: 800px;
    padding: 100px 16px;
    box-sizing: border-box;
    width: 365px;
  }
  body {
    background:  #ffffff!important;
  }
  .demo-page {
    width: 100%;
    height: 580px;
    background-color: #fff;
  }
  ::-webkit-scrollbar  
  {  
      width: 0px;  
      height: auto;  
      background-color: #fff;  
  } 
</style>
