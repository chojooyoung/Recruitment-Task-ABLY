<template>
    <h1>{{pageName}}</h1>
</template>

<script>

export default {
  name: "Header",
  props: {
    pageName: String,
  },
};
</script>
