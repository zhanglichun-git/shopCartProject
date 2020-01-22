var path=require('path');
var webpack=require('webpack');
var config={
    entry:path.resolve(__dirname,'src/js/cart.js'),
    output:{
        path:path.resolve(__dirname,'dist/js'),
        filename:'bundle.js'
    },
    devServer:{
        host:'localhost',
        compress:true,
        port:8081
    }
}
module.exports =config;