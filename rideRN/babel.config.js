module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            // "@components": "./src/components",
            // "@constants": "./src/constants",
            "@context": "./src/context",
            "@hooks": "./src/hooks",
            // "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@": "./src",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
