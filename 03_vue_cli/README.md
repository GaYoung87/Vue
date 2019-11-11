# Youtube-browser

### 1. 설치

```bash
# 1. vue cli 설치
   # 이 프로젝트 뿐만 아니라 컴퓨터 어디에서나 사용할 수 있는 라이브러리를 설치하겠다! -> -g
$ npm install -g @vue/cli

# 2. vue 버전 확인
$ vue --version

# 3. 우리가 만들 브라우저
$ vue create youtube-browser
? Please pick a preset: default (babel, eslint) 선택
   # babel: 표준 문법을 지키지 않는 브라우저(js최신버전까지 catchup하지 못하는 브라우저)들을 옛날 문법으로                 바꿔줘서 인식하게 해줌
   # eslint: 코딩스타일의 오류나, js 코드에서 발견된 문제가 있으면 git commit 불가
   
# 4. 서버 열기
student@M702 MINGW64 ~/development/Vue/03_vue_cli/youtube-browser (master)
$ npm run serve

# 5. 최적화된 모습으로 만들기(dist)
$ npm run build
   # dist: 최종적으로 배포하는 파일!

# 6. 문법적 error가 있는지 없는지 알려주는 것
$ npm run lint
```



### 프로젝트 구조

![](C:\Users\student\AppData\Roaming\Typora\typora-user-images\image-20191111113457458.png)

![image-20191111113439123](C:\Users\student\AppData\Roaming\Typora\typora-user-images\image-20191111113439123.png)

- props: 상위 component가 가지고있는 정보를 하위 component 에게 데이터 전달해줌
- 우리는 searchbar를 통해 검색하게할건데, 검색 정보를 searchbar가 가지고 있으면 안됨 -> searchbar에 event를 주고, 입력받으면 app에 있는 정
- App: 가지고 있는 데이터를 데이터를 불러오는 함수를 만들어서 SearchBar한테 넘겨줌 -> App이 데이터를 가지고있음 -> App이 VedioDetail과 VedioList로 데이터를 전달해줌
- SearchBar: 사용자입력event가 나타나면 App에서 실행하게 만들고(입력 event가 발생했을 때) -> SearchBar는 실질적으로 데이터가지고있는 것이아니라, 실행만 하라는 것

- 데이터 불러오는 함수를 App에 만듦. VedioDataList

  

## 2. App.vue (최상위 vue)

```bash
$ npm install axios
# axios 사용하기 위해
```



```vue
<template>
  <div>
    <!-- step3. 사용하기 -->
    <!-- inputChange가 발생하면, onInputChange mehtods실행시켜라
         inputChange가 언제발생한다고? SearchBar에 따라 input의 값이 바뀔 때마다 -->
    <SearchBar @inputChange="onInputChange" />
  </div>
</template>

<script>
import axios from 'axios'

// Vue의 옵션들 작성

// component를 등록 후 사용(step1 ~ step3)
// step1. 호출하기
import SearchBar from './components/SearchBar'
const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY  // youtube API_KEY
const API_URL = 'https://www.googleapis.com/youtube/v3/search'

export default {
  name: 'App',  // Component의 이름을 지정

  // step2. 내가 사용하고자하는 component 밑에서 등록하기
  components: {
    SearchBar: SearchBar,   // key = value = searchbar라면 이렇게 축약 가능
  },
  methods: {
    // inputChange라는 event(우리가 지정)가 발생할 때마다 실행해라!
    onInputChange: function(inputValue) {
      // console.log(inputValue)
      axios.get(API_URL, {
        params: {
          key: API_KEY,
          type: 'video',
          part: 'snippet',
          q: inputValue,
        }
      })
      // key 요청이 변할 때마다 갱신
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>
```



- API_KEY 보호를 위해 .env.local에 API_KEY 작성

```
VUE_APP_YOUTUBE_API_KEY=_____________________________________________
```



## 3. SearchBar.vue

- SearchBar가 데이터를 가지고있으면 안되는 이유! -> VedioDetail, VedioList로 전달할 수가없다. 
-  VedioDetail, VedioList는 데이터를 필요로함.

```vue

```

- 개발 시에는 console.log()가 찍히지 않으면 불편  -> package.json에서 수정

  ```json
  "rules": {
          "no-console": "off"
  }
  ```

  



## 4. VideoList



## 5. VideoListItem

- 여기서 받은 정보를 다시 videoList로 올리고, App으로 올린다음에 VideoDetail이 그 App의 정보를 받을 수 있게 한다.
- // video하나를 누르면 onclick함수가 발생되면서 상위 컴퍼넌트한테 말해줌. 발생했음을 이해하고 onVideoSelect함수 실행 -> VideoSelect 함수 실행하고 video값 보냄. 아이템에서 click할때마다 app.vue

