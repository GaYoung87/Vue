

# Webpack

- Node.js에서 개발한다
- 모든 프로젝트는 webpack을 통해 node.js로 가서 진행한다.

**설정**

```bash
# 1. node project 시작
$ npm init

# 2. vue 설치
$ npm install vue  # === "npm i vue" (i === install)

# 3. webpack 설치
# -D는 개발환경에서만 사용하겠다.
# webpack은 개발자의 편의성을 위한 툴
$ npm i -D webpack webpack-cli

# 4. webpack 설정 파일 생성
$ touch webpack.config.js

# 5. webpack은 js파일만 변환 가능, 때문에 vue 파일 밑 template를 webpack이 변환할 수 있도록 도와주는 라이브러리
$ npm install -D vue-loader vue-template-compiler
```

**webpackage.js**

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

// nodejs에서는 module에서 특정 값을 export 하기 위해서는 아래와 같이
// module.exports에 export할 값들을 정의한다.
module.exports = {
  // entry: 모든 파일들의 시작점
  entry: {
    // __dirname: 현재 directory의 이름 -> 최상위 위치(ex. Django의 BASE_DIR느낌)
    app: path.join(__dirname, 'src', 'main.js')  
  },
  // module: webpack은 기본적으로 js만 변환 가능
  //         따라서 css나 html 등은 모듈을 통해서 webpack이 이해할 수 있도록 변환이 필요
  //         변환 내용을 작성하는 곳
  module: {},
  // plugins: webpack을 통해서 번들된 결과를 추가 처리하는 부분
  plugins: {},
  // output: webpack을 통해서 번들된 결과물이 정의되는 곳
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
}

// 이곳에 작성한 후, 다른 곳에서 불러온다면 여기에 있는 모듈을 사용할 수 있음.
```

![image-20191106141223090](C:\Users\student\AppData\Roaming\Typora\typora-user-images\image-20191106141223090.png)

**main.js**

```js
// nodejs에서 vuejs를 사용하는 방법
import Vue from 'vue'
import App from './App.vue'


// 실제 개발시
new Vue({
  render: (h) => h(App)
}).$mount('#app')
// 1. 새로운 vue instance를 만들겠다.
// 2. App.vue: 최상위 컴퍼넌트가 된다.
// 3. html문서에서도 보여질 때 app 이라는 id에서 시작을 하겠다.

// 이것을 간소화시킨 것이 위에!
// new Vue({
//   render: function(createElement) {
//     return createElement(App)
//   }
// }).$mount('#app')  // 새로운 vue instance를 만들겠다.
```

**package.json**

```js
{
  "name": "02_vue_webpack_cli",
  "version": "1.0.0",
  "description": "webpack으로 vue 설정해보기",
  "main": "index.js",
  "scripts": {
    "build": "webpack"
  },
  "author": "gayoung",
  "license": "ISC",
  "dependencies": {
    "vue": "^2.6.10"
  },
  "devDependencies": {
    "vue-loader": "^15.7.2",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  }
}
```

```bash
# webpackage.js에 있는 output에서 app.js에 하나로 모으라고 설정
# 공백까지 없애서, 최대의 효율을 창출하는 것이 webpack의 기능
$ npm run build
```

- 실시간으로 화면에 보이지않음!! 다시 build해야 보인다!!
- vue extension 쓸 수 없음(상업용이기 때문)