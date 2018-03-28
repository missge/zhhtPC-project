var isProduction = process.env.NODE_ENV === 'production';
let base = 'http://localhost:8008';
let uploadType = "new"
if (isProduction) {
    base = "";
    uploadType = "old";
}
var defaultImg = "http://wallpaper.cdn.pandora.xiaomi.com/thumbnail/webp/w512/MiTv/0bdab55084ff3433126f2aff3e847eda79130a0f9";
var uploadImageUri = "/rest/account/api/upload";

var fonts = [{
        "key": "fz-pangtyjt", value: "方正胖头鱼简体" 
    },
    {
        "key": "fzyh-bz", value: "方正悠黑标准" 
    },
    {
        "key": "fzltkh-gbk", value: "方正兰亭刊黑_GBK" 
    },
    {
        "key": "fzyh-zc", value: "方正兰亭中黑" 
    },
    // {
    //     "key": "fzyh-zc", value: "方正悠黑中粗" 
    // }
    ]

var mifgUrl = ""
var golbal_config = {
    base: base,
    uploadImageUri : uploadImageUri,
    isProduction: isProduction,
    uploadType: uploadType,
    fonts: fonts,
    defaultImg: defaultImg
}


export default golbal_config