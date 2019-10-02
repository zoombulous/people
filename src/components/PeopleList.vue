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
const baseURL = "http://localhost:3000/people"
export default {
    name: "people-list",
    props: {
	people: Array
    }
},
async created {
    try {
        const res = await axios.get(baseURL);
        this.people = res.data;
    } catch(e) {
        console.error(e);
    }
    },
methods: {
    async addPerson() {
    const res = await axios.post(people {name this.personName});
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
