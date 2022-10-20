import postcssPresetEnv from 'postcss-preset-env';

export default {
    plugins: [
        postcssPresetEnv({
            stage: false,
            features: {
                'custom-properties': {
                    disableDeprecationNotice: true
                }
            },
            importFrom: './src/routes/styles.css'
        })
    ]
};