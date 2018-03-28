<template>
<div>

  <ul>
      <li v-for="item in items">
        <el-button  @click="handleAdd(item)">{{ item.name }}</el-button>
      </li>
  </ul>

</div>
</template>
<script>
    import { mapState, mapActions,mapGetters } from 'vuex'
    // var Resource = require('../../util/Resource');
    export default {
        components : {},
        data() {
            return {
                items: [
                  {
                    name: "标题导语",
                    type: "title_lead",
                    index:0
                  },
                  {
                    name: "二图二列",
                    type: "two_image",
                    index: 0
                  },
                  {
                    name:"单图", 
                    type:"simple_picture",
                    index:0,
                  },
                  {
                    name:"橱窗(三图）", 
                    type:"image_display",
                    index:0,
                  },{
                    name:"轮播图",
                    type:"swiper_image",
                    index:0,
                  }
                ],
                item: {}
          }
        },
        computed: {
            ...mapState ({
                modes: state => state.modes
            }),
          },
        methods: {
            ...mapActions({
                addMode: 'addMode',
            }),
            handleAdd: function(item) {
                item.id = new Date().getTime();
                var item_str = JSON.stringify(item);
                var new_item = JSON.parse(item_str);
                this.addMode(new_item);
            }
        },
        mounted() {

        }
    }
</script>
