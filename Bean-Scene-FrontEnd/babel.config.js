module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Make sure jest-expo and related libraries are correctly transpiled
    env: {
      test: {
        presets: ['babel-preset-expo'],
        plugins: ['@babel/plugin-transform-runtime'],
      },
    },
  };
};