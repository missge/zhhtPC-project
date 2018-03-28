import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

Array.prototype.removeById = function(id) {
  for(var i=0; i<this.length; i++) {
    if(this[i].id == id) {
      this.splice(i, 1);
      break;
    }
  }
}
Array.prototype.existId = function(id) {
  var existed = false;
  for(var i=0; i<this.length; i++) {
    if(this[i].id == id) {
      existed = true;
      break;
    }
  }
  return existed
}

Array.prototype.indexOfId = function(id) {
  var index = -1;
  for(var i=0; i<this.length; i++) {
    if(this[i].id == id) {
      index = i
      break;
    }
  }
  return index
}

Array.prototype.maxId = function() {
  var index = -1;
  var id = 0;
  for(var i=0; i<this.length; i++) {
    if(this[i].id >= id) {
      id = this[i].id;
    }
  }
  return id
}

Array.prototype.getSel = function(id) {
  var index = -1;
  for(var i=0; i<this.length; i++) {
    if(this[i].id == id) {
      index = i
      break;
    }
  }
  return this[index]
}

Array.prototype.getById = function(id) {
  var res = "";
  for(var i=0; i<this.length; i++) {
    if(this[i].id == id) {
      res = this[i];
      break;
    }
  }
  return res
}

//array-dict mast have index key
Array.prototype.getMaxIndex = function(id) {
  var index = 0;
  for(var i=0; i<this.length; i++) {
    if(this[i].index >= index) {
       index = this[i].index;
    }
  }
  return index
}

Array.prototype.setSel = function(id,item) {
  var index = -1;
  for(var i=0; i<this.length; i++) {
    if(this[i].id == id) {
      index = i
      break;
    }
  }
  this[index] = item
}

// 应用初始状态
const state = {
    sels:[],
    picture_id: 0,
    wordDistributions:[],
    shopWordDistributions:[],
    notebookWordDistributions:[],
    type:0,
    content: "",

    //design h5 by bert
    modes: [

       ],
    designCurrentData: {},
    designCurrentType: "",

    design_dialog: {
        dialog_name: "",
        status: false
    },
    //notebook
    notebook_sels:[],
    //用于
    index:-1,
    album_id:0,
}


// 定义所需的 mutations
const mutations = {
    ADD_SEL(state, item) {
        state.sels.removeById(item.id);
        state.sels.push(item);
    },
    DEl_SEL(state,item) {
        state.sels.removeById(item.id);
    },
    CLICK_COMMON_PIC(state,item) {
        if (state.sels.indexOfId(item.id) === -1) {
            state.sels.push(item);
        } else {
            state.sels.removeById(item.id);
        }
    },
    ADD_WORD_DISTRIBUTION(state, item) {
        state.wordDistributions.push(item);
    },
    DEL_WORD_DISTRIBUTION(state, item) {
        var id = item.id
        var index = -1;
        for (var i = 0; i < state.wordDistributions.length; i ++) {
          if (state.wordDistributions[i].id == id) {
              index = i;
          }
        }
        if (index != -1) {
          var word_dist_data = state.wordDistributions;
          word_dist_data.splice(index, 1);
          state.wordDistributions = word_dist_data;
        }
    },
    SET_WORD_DISTRIBUTIONS(state, items) {
        state.wordDistributions = items;
    },

    ADD_SHOP_WORD_DISTRIBUTION(state, item) {
        state.shopWordDistributions.push(item);
    },
    DEL_SHOP_WORD_DISTRIBUTION(state, item) {
        var id = item.id
        var index = -1;
        for (var i = 0; i < state.shopWordDistributions.length; i ++) {
          if (state.shopWordDistributions[i].id == id) {
              index = i;
          }
        }
        if (index != -1) {
          var word_dist_data = state.shopWordDistributions;
          word_dist_data.splice(index, 1);
          state.shopWordDistributions = word_dist_data;
        }
    },
    SET_SHOP_WORD_DISTRIBUTIONS(state, items) {
        state.shopWordDistributions = items;
    },
    ADD_NOTEBOOK_WORD_DISTRIBUTION(state, item) {
        state.notebookWordDistributions.push(item);
    },
    DEL_NOTEBOOK_WORD_DISTRIBUTION(state, item) {
        var id = item.id
        var index = -1;
        for (var i = 0; i < state.notebookWordDistributions.length; i ++) {
          if (state.notebookWordDistributions[i].id == id) {
              index = i;
          }
        }
        if (index != -1) {
          var word_dist_data = state.notebookWordDistributions;
          word_dist_data.splice(index, 1);
          state.notebookWordDistributions = word_dist_data;
        }
    },
    SET_NOTEBOOK_WORD_DISTRIBUTIONS(state, items) {
        state.notebookWordDistributions = items;
    },
    SET_SELs(state, items) {
        state.sels = items;
    },
    SET_PICTURE_ID(state, id) {
        state.picture_id = id;
    },
    SET_TYPE(state, type) {
        state.type = type;
    },
    SET_PHONE_CONTENT(state, content) {
        state.content = content;
    },

    //for design h5
    SET_DESIGN_CURRENT_DATA(state, mode) {
        state.designCurrentData = mode;
    },
    SET_DESIGN_CURRENT_TYPE(state, type) {
        state.designCurrentType = type;
    },
    SET_MODES(state, modes) {
        state.modes = modes;
        function sortByIndex(x,y) {
          return x.index - y.index;
        }
        state.modes.sort(sortByIndex)
        sessionStorage.setItem("modes",JSON.stringify(state.modes));
    },
    UPDATE_MODE(state, mode) {
        state.modes.removeById(mode.id);
        state.modes.push(mode);
        function sortByIndex(x,y) {
          return x.index - y.index;
        }
        state.modes.sort(sortByIndex)

        sessionStorage.setItem("modes",JSON.stringify(state.modes));
    },
    ADD_MODE(state, mode) {
        var maxIndex = state.modes.getMaxIndex()
        mode.index = maxIndex + 1;
        state.modes.push(mode);
        sessionStorage.setItem("modes",JSON.stringify(state.modes));
    },
    DEL_MODE(state, id) {
        state.modes.removeById(id);
        function sortByIndex(x,y) {
          return x.index - y.index;
        }
        state.modes.sort(sortByIndex)
        sessionStorage.setItem("modes",JSON.stringify(state.modes));
    },

    setDesignDialog(state, item) {
      state.design_dialog = item
    },


    // notebook
    ADD_NOTEBOOK_SEL(state, item) {
        state.notebook_sels.push(item);
    },
    DEl_NOTEBOOK_SEL(state,item) {
        state.notebook_sels.removeById(item.id);
    },
    SET_NOTEBOOK_SELs(state, items) {
      for (var i = 0; i < items.length; i ++) {
          items[i].index = i
        }
      state.notebook_sels = items;
    },
    CLICK_COMMON_NOTEBOOK_PIC(state,item) {
        if (state.notebook_sels.indexOfId(item.id) === -1) {
            state.notebook_sels.push(item);
        } else {
            state.notebook_sels.removeById(item.id);
        }
    },
    SET_ALBUM_ID(state, id) {
        state.album_id = id;
    },
    SET_INDEX_ID(state, value) {
        state.index = value;
    },
}


// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
