module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "settings": {
        "react": {
           "version": "detect"
        }
    },
    "globals": {
        "assign": "readonly",
        "Atomics": "readonly",
        "CAL": "readonly",
        "honey": "readonly",
        "moment": "readonly",        
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "react/prop-types": [
            "off"
        ],
        "react-hooks/rules-of-hooks": [
            "error"
        ],
        "react-hooks/exhaustive-deps": [ 
            "warn"
        ]
    }
};
