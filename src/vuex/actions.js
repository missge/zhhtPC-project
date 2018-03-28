//test
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}

export const addSel = ({commit}) => {
    commit('ADD_SEL')
}
export const delSel = ({commit}, item) => {
    commit('DEl_SEL', item)
}

export const setSels = ({commit}, items) => {
    commit('SET_SELs', items)
}

export const setType = ({commit}, type) => {
    commit('SET_TYPE', type)
}

export const clickCommonPic = ({commit}, item) => {
    commit('CLICK_COMMON_PIC', item)
}

export const addWordDistribution = ({commit}, item) => {
    commit("ADD_WORD_DISTRIBUTION", item)
}

export const delWordDistribution = ({commit}, item) => {
    commit("DEL_WORD_DISTRIBUTION", item)
}

export const setWordDistributions = ({commit}, items) => {
    commit("SET_WORD_DISTRIBUTIONS", items)
}

export const addShopWordDistribution = ({commit}, item) => {
    commit("ADD_SHOP_WORD_DISTRIBUTION", item)
}

export const delShopWordDistribution = ({commit}, item) => {
    commit("DEL_SHOP_WORD_DISTRIBUTION", item)
}

export const setShopWordDistributions = ({commit}, items) => {
    commit("SET_SHOP_WORD_DISTRIBUTIONS", items)
}

export const addNotebookWordDistribution = ({commit}, item) => {
    commit("ADD_NOTEBOOK_WORD_DISTRIBUTION", item)
}

export const delNotebookWordDistribution = ({commit}, item) => {
    commit("DEL_NOTEBOOK_WORD_DISTRIBUTION", item)
}

export const setNotebookWordDistributions = ({commit}, items) => {
    commit("SET_NOTEBOOK_WORD_DISTRIBUTIONS", items)
}

export const setPhoneContent = ({commit}, content) => {
    commit("SET_PHONE_CONTENT", content)
}

export const setPictureID = ({commit}, id) => {
    commit('SET_PICTURE_ID', id)
}

//for design h5
export const setDesignCurrentData = ({commit}, content) => {
    commit("SET_DESIGN_CURRENT_DATA", content)
}
export const setDesignCurrentType = ({commit}, content) => {
    commit("SET_DESIGN_CURRENT_TYPE", content)
}

export const setModes = ({commit}, modes) => {
    commit('SET_MODES', modes)
}

export const updateMode = ({commit}, mode) => {
    commit('UPDATE_MODE', mode)
}

export const addMode = ({commit}, mode) => {
    commit('ADD_MODE', mode)
}

export const delMode = ({commit}, id) => {
    commit('DEL_MODE', id)
}

export const setDesignDialog = ({commit}, item) => {
    commit("setDesignDialog", item)
}

export const addNotebookSel = ({commit}) => {
    commit('ADD_NOTEBOOK_SEL')
}
export const delNotebookSel = ({commit}, item) => {
    commit('DEl_NOTEBOOK_SEL', item)
}

export const setNotebookSels = ({commit}, items) => {
    commit('SET_NOTEBOOK_SELs', items)
}

export const clickCommonNotebookPic = ({commit}, item) => {
    commit('CLICK_COMMON_NOTEBOOK_PIC', item)
}

export const setAlbumID = ({commit}, id) => {
    commit('SET_ALBUM_ID', id)
}

export const setIndex = ({commit}, id) => {
    commit('SET_INDEX_ID', id)
}
