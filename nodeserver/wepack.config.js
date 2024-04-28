// webpack.config.js

const path = require('path');

module.exports = {
  mode: 'development', // or 'production' depending on your environment
  entry: './src/index.js', // Update this path to match your entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory relative to the webpack configuration file
    filename: 'bundle.js'
  },
  // Other webpack configurations...
};
