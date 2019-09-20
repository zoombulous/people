<template>
  <div id="app">
    <h1>Todos</h1>
    <input type="text" v-model="personName" @keyup.enter="addPerson">
    <ul>
      <li v-for="person of people" :key="person.id">{{person.name}}</li>
    </ul>
  </div>
</template>

<script>
    import axios from 'axios';
const baseURL = "http://localhost:3000/todos"
export default {
  name: 'app',
    data() {
	return {
	    people: []
	    first: ''
	    last: ''
	    age: ''
	    weight: ''
	    height: ''
	};
    },
    async created() {
	try {
	    const res = await axios.get(baseURL);
	    this.people = res.data;
	} catch(e) {
	    console.error(e);
	}
    },
    methods: {
	async addPerson() {
	    const res = await axios.post(baseURL, { first: this.first
						    last: this.last
						    age: this.age
						    weight: this.weight
						    height: this.height
						  })
	    this.people = [...this.people, res.data];
	    this.first = "";
	    this.last = "";
	    this.age = "";
	    this.weight = "";
	    this.height = '';
	}
    }
};
						    
</script>
    
    <style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
</style>
    
