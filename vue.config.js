module.exports = {
    //关闭eslint
    lintOnSave: false,
    //关闭上线以后错误信息提示
    productionSourceMap:false,
    //代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
            }
        }
    }
}