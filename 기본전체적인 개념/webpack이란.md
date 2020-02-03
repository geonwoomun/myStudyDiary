# Webpack이란 ?

오늘 생활코딩 Webpack 강의가 올라와서 듣다가 더 자세히 알고 싶어 블로그를 찾아보며 적은 글

## 왜 Webpack이 등장하게 되었을까?
규모가 있는 System에서는 많은 Javasciprt가 존재하게 된다. 이 많은 Javascripㅅ 파일을 하나의 파일로 관리하기엔 어려움이 있다.

## 그렇다면 여러 개로 호출하면 되는게 아닐까?
여러 개의 파일을 브라우져에서 로딩하는 것은 네트워크 비용이 그만큼 사용하여 반응속도가 느려지게 된다.
더 나아가 각 파일의 변수 충돌의 위험성도 존재하게 된다.
이를 해결하기 위해 Webpack이 등자하게 되었다.

## Webpack이란?
현대 Javascript Application의 Static Module Bundler이다.
Webpack이 실행된다면 Dependencies Graph를 통해 필요한 형태의 하나 또는 여러개의 Bundle로 생성한다.

### Bundle이란?
소프트웨어 및 일부 하드웨어와 함께 작동하는 데 필요한 모든 것을 포함하는 package
각각의 모듈들에 대해 의존성 관계를 파악하여 하나 또는 여러개의 그룹으로 볼 수 있다.

### 그렇다면 왜 Webpack을 사용해야할 까?
다른 Module Bundler도 많이 존재하지만 performance가 우수하다.

### Browsify, Grunt, Gulp 등의 도구들은 webpack과 무슨 차이가 있을까?

크고 복잡함 다양한 리소스들이 들어있는 프로젝트에는 webpack을 사용하는 것이 좋다.
Grunt, Gulp는 오로지 리소스들에 대한 툴로 사용되며 dependecy graph에 대한 개념이 없다.
Browsify는 비슷한 도구이지만 속도면에서 webpack이 더 좋다.

## Webpack Core Concept

### Entry
dependency graph를 만들기 위해 필요한 Input Source이다.
직/간접적으로 의존성을 가진 모듈들을 이해합니다.
여러개의 entry가 존재할 수 있다.
Default value : ./src/index.js

    module.exports = {
        entry : './path/to/my/entry/file.js'
    };

### Output
webpack이 생성한 bundles의 결과물의 위치를 지정할 수 있다.
Default value : ./dist/main.js

    const path = require('path');

    module.exports = {
        entry : './path/to/my/entry/file.js',
        output : {
            path : path.resolve(__dirname, 'dist'),
            filename : 'my-first-webpack.bundle.js'
        }
    };

### Loaders
Webpack은 오직 Javascript와 Json만 이해할 수 있는 단점이 있다.
Loader는 다른 Type의 파일을 Webpack이 이해하고 처리 가능한 모듈로 변환 시키는 작업을 담당한다.

    const path = require('path');

    module.exports = {
        output : {
            filename : 'my-first-webpack.bundle.js'
        },
        module : {
            rules : [
                { test : /\.txt$/, use: 'raw-loader'}
            ]
        }
    };

### Plugins
Loader가 변환하는 동안 Plugin은 bundle optimization, asset management and injection of environment과 같은 일을 진행할 수 있다.

    const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
    const webpack = require('webpack'); //to access built-in plugins

    module.exports = {
      module: {
        rules: [
          { test: /\.txt$/, use: 'raw-loader' }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
      ]
    };

### Mode
다양한 Profile로 지정하여 진행할 수 있다.
development, production, none
Default value : production

    module.exports = {
        mode : 'production'
    };

### Browser Compatibility
웹팩은 ES5를 사용하는 모든 브라우저를 지원합니다. 단 IE8의 아래 버전은 지원하지 않습니다.