//test
export const getCount = state => {
    return state.count   ////理解为传入state对象，修改state.count属性
   // S6的箭头函数来给count赋值。
   //类似：return this.$store.state.count
}

export const getSels = state => {
    return state.sels
}

export const getContent = state => {
    return state.content
}

export const getSelID = state => {
    return state.sel_id
}
//for design h5
export const getDesignCurrentType = state => {
    return state.designCurrentType
}

export const getModes = state => {
    return state.modes
}

export const getDesignDialog =  state => {
    return state.design_dialog
}

export const getNotebookSels = state => {
    return state.notebook_sels
}
