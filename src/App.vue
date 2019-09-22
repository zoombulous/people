<template>
  <div id="app" class="small-container">
    <h1>People List</h1>
    <people-list :people="people"/>
  </div>
</template>

<script>

import PeopleList from "./components/PeopleList";
import people_json from "./json/people.json";

export default {
  name: "app",
  components: {
    PeopleList
  },
  data () {
    return {
      people: people_json.people
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  width: 80%;
}
</style>
