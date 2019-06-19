module.exports = {
    "env": {
        "node": true,    // node env,
        // "browser": true, // browser env, can use alert, window...
        "commonjs": true,
        "es6": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6
    },
    "rules": {
      // if use console.log() will error
      // but allow console.warn() or console.error() or console.info()
      "no-console": ["error", {
        "allow": ["warn", "error", "info"]
      }]
    }
};
