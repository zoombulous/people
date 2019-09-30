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
	import axios from 'axios';
export default {
    name: "people-list",
    props: {
	people: Array
    }
};
methods: {
    addPerson()
    const res = axios.post(people {name this.personName}),
    this.people = [...this.people, res.data];
    this.personName = "";
}
}
};
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
