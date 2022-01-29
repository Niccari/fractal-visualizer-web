const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
      },
      meta: {
        'description': { name: 'description', content: 'Fractal Visualizer for Web'},
        'keyword': { name: 'keywords', content: 'グラフ,描画,フラクタル,Graph,Draw,Fractal'},
        'og:title': { property: 'og:title', content: 'Fractal Visualizer for Web' },
        'og:description': { property: 'og:description', content: 'フラクタル図形などを使い、様々な図形を描画するツール' },
        'og:site_name': { property: 'og:site_name', content: 'niccari.net' },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': { property: 'og:url', content: 'https://niccari.net/fv/' },
        'og:image': { property: 'og:image', content: 'https://niccari.net/fv/ogp.png' },
        'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
        'twitter:title': { name: 'twitter:title', content: 'Fractal Visualizer for Web' },
        'twitter:description': { name: 'twitter:description', content: 'フラクタル図形などを使い、様々な図形を描画するツール' },
        'twitter:image': { name: 'twitter:image', content: 'https://niccari.net/fv/ogp.png' },
        'twitter:site': { name: 'twitter:site', content: 'niccari1' }
      }
    })
  ]
};
