<template>
  <div id="people-list">
  <input type="text" v-model="personName" @keyup.enter="addPerson">
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
    data() {
        return{
            people: [],
            first:'',
            last: ''
    },
        computed: {
            fullname: function(){
                return person.first + ' ' + person.last;
            }
        }
    });
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
