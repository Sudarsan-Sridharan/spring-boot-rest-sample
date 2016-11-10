const path = require('path');

const PATHS = {
     frontend: path.join(__dirname, 'src/main/resources/frontend'),
     entry: path.join(__dirname, 'src/main/resources/frontend/js/app.jsx'),
     build: path.join(__dirname, 'target/classes/static/app/js')
};
    
module.exports = {
  entry: PATHS.entry,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
      {
         test: /\.(jpg|png|gif)$/,
         loader: 'url?limit=25000',
         include: PATHS.frontend  
      },
      {
        test: /\.css$/, 
        loaders: ['style', 'css'],
        include: [PATHS.frontend]
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: './node_modules',
        include: [PATHS.frontend]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'] 
  }
};