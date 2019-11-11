<template>
<!-- VideoList하는 일! -> VideoListItem을 반목시켜준다 -->
  <ul class="list-group-item">
    <VideoListItem 
      v-for="video in videos" 
      v-bind:key="video.id.videoId"
      v-bind:video="video"
      @selectVideo="onSelectVideo"
      />
      <!-- selectVideo 이벤트가 발생하면 onSelectVideo가 실행된다. -->
  </ul>
</template>

<script>
import VideoListItem from './VideoListItem'

export default {
  name: 'VideoList',
  props: {
    videos: {
      type: Array,
      required: true,
    }
  },
  components: {
    VideoListItem
  },
  methods: {
    // 또다시 SelectVideo라는 이벤트를 발생시킨다! -> why? App.vue가 이 정보를 받을 수 있도록
    onSelectVideo: function(video) {
      this.$emit('selectVideo', video)
    }
  }
}
</script>

<style>

</style>
