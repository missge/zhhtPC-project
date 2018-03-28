<template>
<div ref="from-div" >
  <div style="height : auto; width:30%; display:inline-block;float:left;">
      <Phone msg="story"></Phone>
  </div>
  <div class="component-view"  style="height : auto;width:60%;display:inline-block;float:right;border-style:solid;border-color:#ff0000;margin:30px">
     <component v-bind:is="currentView"> </component>  
  </div>  
  <div class="xuanfu">
    <div style="margin-right: 300px;">
      <el-button  type="primary" :disabled="submitVisible" @click="onSubmit()">确定</el-button>
      <el-button style="" type="primary"  @click="onPreview()">预览</el-button>
    </div>
  </div> 
  <div>
      <el-dialog :visible.sync="dialogVisible" title="预览">
          <div class="phone">
            <div style="height:600px;overflow:auto;background-color: #FFF;">
              <div v-for="item in preview_components" style="height:auto;width:100%;margin:0px!important" :key="item.id">
                <component :key="item.id" v-bind:is="item.type" class="ui-content" style="background-color:#FFF"   :vdata="item.data"> </component>
              </div>
            </div>
          </div>
      </el-dialog>  
  </div>
  
</div>
</template>

<script>
// import VueUEditor from 'vue-ueditor'
// import GlobalConfig from '../../GlobalConfig'
import { mapState, mapActions,mapGetters } from 'vuex'
import Phone from "../../design_components/phone"
// import NProgress from 'nprogress'





//for new design
import SimplePictureForm from "../../design_components/new_design/simple_picture/form.vue"
import SimplePictureTemplate from "../../design_components/new_design/simple_picture/template.vue"
import TitleLeadForm from "../../design_components/new_design/title_lead/form.vue"
import TitleLeadTemplate from "../../design_components/new_design/title_lead/template.vue"
import TwoImageForm from "../../design_components/new_design/two_image/form.vue"
import TwoImageTemplate from "../../design_components/new_design/two_image/template.vue"
import ImageDisplayForm from "../../design_components/new_design/image_display/form.vue"
import ImageDisplayTemplate from "../../design_components/new_design/image_display/template.vue"
import SwiperImageTemlate from "../../design_components/new_design/swiper/template.vue"
import SwiperImageForm from "../../design_components/new_design/swiper/form.vue"

// var Resource = require('../../util/Resource');
export default {
  name: 'edit_webpage',
  components : {
      // VueUEditor,
      Phone,
    
      simple_picture_form: SimplePictureForm,
      simple_picture: SimplePictureTemplate,
      title_lead_form: TitleLeadForm,
      title_lead: TitleLeadTemplate,
      two_image_form: TwoImageForm,
      two_image: TwoImageTemplate,
      image_display_form: ImageDisplayForm,
      image_display: ImageDisplayTemplate,
      swiper_image: SwiperImageTemlate,
      swiper_image_form: SwiperImageForm,
  },
  computed: {
      ...mapState ({
        sels: state => state.sels,
        type: state => state.type
      }),
      ...mapGetters({
        getSels: 'getSels',
        getDesignDialog:'getDesignDialog'
      })
    },
  data () {
    return {
      upload_url:this.global_config.uplioadImageUri,
      submitVisible: false,
      id:'',
      loading: false,
      story: {
          title: '',
          status: '',
          categories: [],
          content: '',
          album_ids:[],
          head_img: '',
          weight:0,
          tags:[]
      },
      show_editor: false,
      currentView: "",
      dialogVisible:false,
      preview_components:[]
    }
  },
  watch: {
      getSels: function (albums) {
        // this.editorConfig.serverUrl = album_url + "?ids="+ JSON.stringify(this.story.album_ids);
        // this.editorConfig.albumIds = JSON.stringify(albumLegacyIds)
        // if (this.story.album_ids.length != 0 && this.editorInstance) {
        //     this.show_editor = true;
        //     this.editorInstance.options.serverUrl = this.editorConfig.serverUrl;
        //     this.editorInstance.options.albumIds = this.editorConfig.albumIds;
        // }
      },
      getDesignDialog: function(item) {
          this.handleType(item.dialog_name, item.status)
      }
  },
  methods: {
    handleType: function(type, status) {
        if (type == "selected"){
          return 
        } 
        console.log(">>>>>",type)
        if (type != "") {
          type = type + "_form";
        }
          this.currentView = type;
      },
    ...mapActions({
        setPhoneContent: 'setPhoneContent',
        setSels: 'setSels',
        setType: 'setType'
    }),
    ...mapGetters({
        getDesignCurrentType: 'getDesignCurrentType',
        getType: 'getDesignCurrentType',
        getModes: 'getModes'
    }),
   
    onSubmit(name) {
      this.$refs[name].validate((valid) => {
         if (valid) {
            var method = "put";
            if (this.id) {  
              method = "post";
            }
            var data = this.story;
            data.albums = []
            this.submitVisible=true;
            data.components = this.getModes();
            console.log(data.components)
            var _this = this;
            //向后台传数据
            // Resource.options({
            //   method: method,
            //   resource: "album.story",
            //   data: data,
            //   success: function(data) {
            //       _this.listLoading = false;
                  
            //       _this.$notify({
            //           title: '成功',
            //           message: '保存成功',
            //           type: 'success'
            //       });
            //       if (data.id) {
            //           window.location.href = '/#/apps/webpage';
            //       } else {
            //           _this.submitVisible = false;
            //       }
            //   },
            //   error: function(data) {
            //         _this.listLoading = false;
            //         var message = '添加失败，请联系相关研发～';
            //         if (data.data && data.data.errmsg) {
            //             message = data.data.errmsg
            //         }
            //         this.submitVisible=false;
            //         NProgress.done();
            //         _this.$notify({
            //             title: '失败',
            //             message: message,
            //             type: 'error'
            //         });
            //       }
            // });
          } else {
              this.$notify({
                  title: '保存失败',
                  message: '请按照红色提示修改区域内容',
                  type: 'error'
              });
              this.submitVisible = false;
            return false;
          }

          })
    },
    ...mapActions({
          setModes: 'setModes'
    }),
    getWebpage(id) {
        
    },
    onPreview(){
     
      this.preview_components = this.getModes();
      this.dialogVisible = true;
    }

  },
  mounted() {
    this.id = this.$route.query.id||"";
    this.setType(1);
    this.getWebpage(this.id);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.xuanfu{  
    position: fixed;  
    bottom: 0;
    width: 100%;  
    z-index: 100;
    padding:10px;  
    text-align: center;
    background-color:#00000038;filter:Alpha(Opacity=60);opacity:0.6;
}  
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .preview img {
    img { max-width: 100%;}
  }
</style>
