const config = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 'current'
            },
            modules: false
        }],
        '@babel/preset-react'
    ]
};

export default config;