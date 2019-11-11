<template>
<!-- video가 없으면 렌더링하지 않음(화면에 보여주지 않음) -->
  <div v-if="video">
    <div>
      <iframe v-bind:src="videoUrl" frameborder="0"></iframe>
    </div>
    <div class="details">
      <h4 v-html="video.snippet.title"></h4>
      <p v-html="video.snippet.description"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoDetail',
  props: {
    video: {
      type: Object,
    }
  },
  computed: {
    videoUrl: function() {
      const videoId = this.video.id.videoId
      return `https://www.youtube.com/embed/${videoId}`
    }
  }
}
</script>

<style scoped>
  .details {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>