cmodule.exports = { // very good docs at http://pm2.keymetrics.io/docs/usage/application-declaration/#attributes-available
    apps: [
      {
        name: "Adeeb_Astro_SSR",
        instances: 1, // 0 means create instances to number of CPU cores on host
        script: "./dist/server/entry.mjs",
        watch: true,
        ignore_watch: [
          "/[\s\S].spec.js$/", // don't restart on test file change
          "node_modules",
          "docs",
          "cypress"
        ],
        exec_mode: "cluster", // or fork
        interpreter_args: "",
        error_file: "/var/tmp/my_application/error.log", // it will be created if nonexistent
        min_uptime: 500,
        max_restarts: 10,
        restart_delay: 1000,
        max_memory_restart: '300M',
        exp_backoff_restart_delay: 100,
        // choose which env with --env (name after _ )
        env_production: {
          NODE_ENV: 'production',
          PUBLIC_API:''
        }
      }
    ],
}