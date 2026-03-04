module.exports = {
  apps: [
    {
      name: "tuita",
      script: "./dist/index.mjs",
      interpreter: "node",
      watch: false,
      autorestart: true,
      restart_delay: 3000,
      max_restarts: 10,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
