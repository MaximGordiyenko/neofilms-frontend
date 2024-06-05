const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://57.151.104.191:8888/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        }),
    );
};