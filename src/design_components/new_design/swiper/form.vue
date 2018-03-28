<template>
<div style="padding:20px">
  <el-form label-position="left"  ref="image_display" :model="image_display" label-width="100px"   border>
            <el-form-item label="图片-1">
                <el-upload
                  class="upload-demo"
                  :action="upload_url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessFirst"
                  :data="upload_type"
                  :file-list="fileListFirst"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <!-- 图片预览弹窗 -->
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item label="链接地址-1" prop="url">
                <el-input v-model="image_display.url1"></el-input>
            </el-form-item>
            <el-form-item label="图片-2">
                <el-upload
                  class="upload-demo"
                  :action="upload_url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessSecond"
                  :data="upload_type"
                  :file-list="fileListSecond"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="链接地址-2" prop="url">
                <el-input v-model="image_display.url2"></el-input>
            </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="submitVisible" @click="onSubmit('image_display')">确定</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
    import { mapState, mapActions,mapGetters } from 'vuex'

    export default {
        components : {},
        data() {
            return {
                upload_url:this.global_config.uploadImageUri,
                dialogImageUrl: '',
                dialogVisible: false,
                submitVisible: false,
                upload_type:{
                    type: this.global_config.uploadType,
                    online: true
                },
                image_display: {
                    url1: this.global_config.mifgUrl,
                    url2: this.global_config.mifgUrl,
                    img1: "",
                    img2: "",
                },
                fileListFirst: [],
                fileListSecond: [],
          }
        },
        computed: {
            ...mapState ({
                designCurrentData: state => state.designCurrentData,
                designCurrentType: state => state.designCurrentType
            })
          },
        methods: {
            ...mapActions({
                updateMode: 'updateMode',
            }),
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccessFirst(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.image_display.img1 = response.data.url;
                    this.fileListFirst = [{
                        name:"",
                        url: this.image_display.img1
                    }]

                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.image_display.img1 = "";
                }
            },
            handleSuccessSecond(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.image_display.img2 = response.data.url;
                    this.fileListSecond = [{
                        name:"",
                        url: this.image_display.img2
                    }]

                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.image_display.img2 = "";
                }
            },
            onSubmit(formname){
                var currentData = this.designCurrentData;
                var imgArrs = { imgArr:[
                        {
                            img:this.image_display.img1,
                            url:this.image_display.url1
                        },
                        {
                            img:this.image_display.img2,
                            url:this.image_display.url2
                        }
                    ]} 
                currentData.data = imgArrs;

                this.updateMode(currentData);
            },
        },
        mounted() {
            if (this.designCurrentData && this.designCurrentData.data) {

                this.image_display = {
                    url1: this.designCurrentData.data.imgArr[0].url,
                    url2: this.designCurrentData.data.imgArr[1].url,
                    img1: this.designCurrentData.data.imgArr[0].img,
                    img2: this.designCurrentData.data.imgArr[1].img,
                },
                this.fileListFirst = [{
                    name:"",
                    url: this.image_display.img1
                }];
                this.fileListSecond = [{
                    name:"",
                    url: this.image_display.img2
                }];
            } else {
                this.image_display = {
                    url1: this.global_config.mifgUrl,
                    url2: this.global_config.mifgUrl,
                    img1: "",
                    img2: "",
                }
            }
        }
    }
</script>
