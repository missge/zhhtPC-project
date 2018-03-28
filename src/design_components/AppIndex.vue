<template>
  <div class="page-navbar">
      <div style='background-color:#FFF;font-weight:900;text-align: center;height: 30px;  border-style:solid;border-color:#ff0000;'  @click="handleAdd()"><span style="color:black">点击添加</span></div>
      <div class="el-upload-list el-upload-list--picture-card list-group" style="margin:0px!important;background-color:#FFF" v-sortable="{ onUpdate: onUpdate }">
        
        <div class="el-upload-list__item is-success app-index-custom app-index-custom" v-for="item in modes" style="height:auto;width:100%;margin:0px!important" :key="item.id">
          <component v-if="dataLoaded" :key="item.id" v-bind:is="item.type" class="ui-content" style="background-color:#FFF"   :vdata="item.data"> </component>

          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview">
              <i class="el-icon-edit" @click="handleUpdate(item.id,item.type,$event)"></i>
            </span>
            <span class="el-upload-list__item-delete">
              <i class="el-icon-delete2" @click="handleDel(item.id)"></i>
            </span>
            <span class="el-upload-list__item-delete">
              <i class="el-icon-plus" @click="handleAdd()"></i>
            </span>
          </span>
        </div>
      </div>
  </div>

</template>
<script>
import { mapState, mapActions,mapGetters } from 'vuex'

import SimplePictureTemplate from "./new_design/simple_picture/template.vue"
import TitleLeadTemplate from "./new_design/title_lead/template.vue"
import TwoImageTemplate from "./new_design/two_image/template.vue"
import ImageDisplayTemplate from "./new_design/image_display/template.vue"
import SwiperImageTemlate from "./new_design/swiper/template.vue"
export default {
  name: 'app_index',
  components : {
      "simple_picture": SimplePictureTemplate,
      "title_lead": TitleLeadTemplate,
      "two_image": TwoImageTemplate,
      "image_display": ImageDisplayTemplate,
      "swiper_image":SwiperImageTemlate
  },
  computed: {
      ...mapState ({
        modes: state => state.modes,
      }),
   },
    watch: {
      modes: function (val) {
          console.log(">>>>D>D>",val)
          this.dataLoaded = true;
      }
    },
  data () {
    return {
       content: '',
       currentData: {},
       dataLoaded:false
    }
  },
  methods: {
      ...mapActions({
          setDesignCurrentData: 'setDesignCurrentData',
          setDesignCurrentType: 'setDesignCurrentType',
          setModes: 'setModes',
          delMode: 'delMode',
          setDesignDialog: 'setDesignDialog'
      }),
      onUpdate: function(event) {
          this.modes.splice(event.newIndex, 0, this.modes.splice(event.oldIndex, 1)[0]);
          var index = 0
          this.modes.forEach(function(i){
                i.index = index;
                index = index + 1
            });
          console.log(this.modes);
          this.setModes(this.modes);
      },
      handleUpdate: function(id, type, e) {
          this.setDesignCurrentData(this.modes.getById(id));
          this.setDesignCurrentType(type)
          this.setDesignDialog({
              dialog_name: type,
              status: true
          })
          console.log(">>>",e)
      },
      handleDel: function(id) {
          this.delMode(id)
      },
      handleAdd: function() {
          this.setDesignDialog({
              dialog_name:"selected",
              status:true});
      }
  },
  mounted() {
      
  }
}
</script>
<!-- <style lang="scss" src="../assets/main.scss"></style> -->