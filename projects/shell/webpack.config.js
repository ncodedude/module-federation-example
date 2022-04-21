const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();


sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  ['event-bus']
);

module.exports = {
  output: {
    uniqueName: "shell",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },    
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },   
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },
        
      // For hosts (please adjust)
      remotes: {
          // "mfe1": "mfe1@http://localhost:3000/remoteEntry.js",
      },

      shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        "@ngx-translate/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        "@ngx-translate/http-loader": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        "ng-event-bus": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 

        // Uncomment for sharing lib of an Angular CLI or Nx workspace
        ...sharedMappings.getDescriptors()
      })

    }),
    // Uncomment for sharing lib of an Angular CLI or Nx workspace
    sharedMappings.getPlugin(),
  ],
};
