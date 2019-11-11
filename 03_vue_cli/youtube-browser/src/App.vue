<template>
  <div class="container">
    <!-- step3. 사용하기 -->
    <!-- inputChange가 발생하면, onInputChange mehtods실행시켜라
         inputChange가 언제발생한다고? SearchBar에 따라 input의 값이 바뀔 때마다 -->
    <SearchBar @inputChange="onInputChange" />
    <VideoDetail v-bind:video="selectedVideo"/>
    <VideoList @selectVideo="onSelectVideo" v-bind:videos="videos" />
  </div>
</template>

<script>
import axios from 'axios'

// Vue의 옵션들 작성

// component를 등록 후 사용(step1 ~ step3)
// step1. 호출하기
import SearchBar from './components/SearchBar'
import VideoList from './components/VideoList'
import VideoDetail from './components/VideoDetail'

const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY  // youtube API_KEY
const API_URL = 'https://www.googleapis.com/youtube/v3/search'

export default {
  name: 'App',  // Component의 이름을 지정

  data() {
    return {
      videos: [],  // 데이터 만들어놓고, 응답받은 데이터를 모두 videos에 할당 후 VideoList에 넘겨준다
      selectedVideo: null,
    }
  },
  // step2. 내가 사용하고자하는 component 밑에서 등록하기
  components: {
    SearchBar: SearchBar,   // key = value = searchbar라면 이렇게 축약 가능
    VideoList,
    VideoDetail,
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
        // console.log(response)
        this.videos = response.data.items
      })
      .catch(error => {
        console.log(error)
      })
    },
    onSelectVideo: function(video) {
      // console.log('여기는 App 컴퍼넌트')
      // console.log(video)
      this.selectedVideo = video
    }
  }
}
</script>

<style>

</style>