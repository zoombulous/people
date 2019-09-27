<template>
  <div id="people-list">
    <ul>
      <li v-for="person in people" :key="person.id">
          {{ person.first }} {{person.last}}
      </li>
      <li>Person 2</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "people-list",
  props: {
    people: Array
  }
};
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
