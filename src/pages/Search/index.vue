<template>
  <div>
    {{$route.params}}
    {{$route.query}}
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    console.log(this)
  }
};
</script>

<style lang="scss" scoped>
</style>