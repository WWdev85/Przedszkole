const path = require ('path');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, '../'),
        port: 3000,
    },

    devtool: 'inline-source-map',
    module:{
       rules:[
           {
               test:/\.module\.s(a|c)ss$/,
               use: [
                   'style-loader',
                   {
                       loader: 'css-loader',
                       options:{
                           modules:{
                               localIdentName: '[local]',
                           }
                       },
                   },
                   {
                       loader: 'sass-loader',
                       options: {
                           sourceMap: true,
                       }
                   }
               ]
           },
           {
            test: /\.(jpg|png|svg|gif|jpeg|webp)$/,
            use: 'file-loader'
           },
           {
            test: /\.(s(a|c)ss|css)$/,
            exclude: /\.module.(s(a|c)ss)$/,
            use: [
                'style-loader',
                 'css-loader',
                   {
                       loader: 'sass-loader',
                       options: {
                           sourceMap: true,
                       }
                   }
               ]
           },    
       ] ,
    },
};