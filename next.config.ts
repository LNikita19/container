// const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Required when deploying to Vercel with module federation
//   output: "standalone",
//   webpack(config: any, options: any) {
//     const { isServer } = options;

//     config.plugins.push(
//       new NextFederationPlugin({
//         name: "container",
//         filename: "static/chunks/remoteEntry.js",
//         remotes: {
//           dashboard: `dashboard@http://localhost:3001/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
//           remote2: `remote2@http://localhost:3002/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
//         },
//         exposes: {
//           "./AuthContext": "./src/context/AuthContext.tsx",
//         },
//         shared: {
//           react: { singleton: true, requiredVersion: false },
//           "react-dom": { singleton: true, requiredVersion: false },

//         },
//       })
//     );

//     return config;
//   },
//   experimental: {
//     outputFileTracingRoot: __dirname, // 👈 fixes multiple lockfiles warning
//   },
// };
// module.exports = nextConfig;
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack(config: { plugins: any[]; }, options: { isServer: any; }) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: "container",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          dashboard: `dashboard@https://dashboard-pi-kohl.vercel.app/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          remote2: `remote2@https://remote2-iota.vercel.app/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
        },
        exposes: {
          "./AuthContext": "./src/context/AuthContext.tsx",
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
      })
    );

    return config;
  },
  experimental: {
    outputFileTracingRoot: __dirname,
  },
};

module.exports = nextConfig;
