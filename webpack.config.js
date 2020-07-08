var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports={
    mode:'development',
    entry:'./js/car.js',
        
    output:{
        path:__dirname+'/dist',
        filename:'car.js'
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                },
              },
            ],
          },
          
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename:'car.html',
          template:'./car.html',
          minify:true      
        }),
        new HtmlWebpackPlugin({
          filename:'index.html',
          template:'./index.html',
          minify:true 
        }),
        new MiniCssExtractPlugin({
          filename:'car.css',
          template:''
        }),
        new CopyPlugin({
          patterns: [
            { from: './images', to: 'images' },
            
          ],
        }),
      ],
      devServer:{
        port:8021 ,
        open:true,
        host:'192.168.0.102'
      }


}