<template>
<!-- click이벤트가 발생하면 onClick 함수를 실행한다. -->
  <li @click="onClick" class="list-group-item">
    <img v-bind:src="thumbnailsUrl" alt="youtube-thumbnail">
    <div class="media-body" v-html="video.snippet.title"></div>
  </li>
</template>

<script>
export default {
  name: 'VideoListItem',

  props: {
    video: {
      type: Object,
      required: true,
    }
  },
  methods: {
    // VideoSelect라는 이벤트를 발생시킨다.
    onClick: function() {
      this.$emit('selectVideo', this.video)
    }
  },
  computed: {
    thumbnailsUrl: function() {
      return this.video.snippet.thumbnails.default.url
    }
  },
}
</script>

<style scoped>
  li {
    display: flex;
    cursor: pointer;
  }

  li:hover {
    background-color: #eee;
  }
</style>