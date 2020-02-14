<template>
<div id="app">
  <h1>Lil' Baby Names</h1>
    <input v-model="startsWith" placeholder="starts with"/>
    <input v-model="contains" placeholder="contains these letters"/>
    <button id="btn" class="" v-on:click="findNames">Go</button>
  <p>Result:</p>
    <ul>
      <li v-for="(name,index) in names" :key="name">{{name}}</li>
    </ul>
</div>
</template>
<style>
  @import './styles.css';
</style>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
        contains: '',
        startsWith: '',
        sortBy: 'alpha',
        gender:'male,mostly-male,neutral,mostly-female,female',
        minLength:'1',
        maxLength:'25',
        names: [],
        pageSize: [10],
        pageNumber: [1],
        totalResults: 0,
        lastEvent: 0
    };
},

watch: {
        pageNumber() {
            this.throttledFindNamesLeavePage();
        },
        lastPage() {
            this.throttledFindNamesLeavePage();
        },  
        minLength() {
            this.throttledFindNames();
        },
        maxLength() {
            this.throttledFindNames();
        },
        startsWith() {
            this.throttledFindNames();
        },
        contains() {
            this.throttledFindNames();
        },
    },

methods: {
    findNames() {
        axios
            .get(
                'http://names.sinistercode.com:4242/api/names?'
                    + 'format=json'
                    + '&sort=' + this.sortBy
                    + '&contains-letters=' + this.contains
                    + '&starts-with=' + this.startsWith
                    + '&gender=' + this.gender
                    + '&sort=length&min-length=' + this.minLength
                    + '&sort=length&max-length=' + this.maxLength
                    + '&page-size=' + this.pageSize
                    + '&page=' + this.pageNumber
            )  
            .then((response) => {
                this.names = response.data.results.map(item => item.name)
             { console.log(response)
                this.names = response.data.results.map(item => item.name)
             }
            })
    },
    resetPage() {
        this.pageNumber=1;
    },
    nextPage() {
        this.pageNumber++;
    },
    previousPage() {
        this.pageNumber--;
    },
    lastPage() {
        this.pageNumber = Math.ceil(this.totalResults / 10);
    },
    throttledFindNames() {
        var t = (new Date()).getTime();
        if(t - this.lastEvent > 500)
            this.findNames(),
        this.resetPage();
        else
            this.lastEvent = t;
    },
    throttledFindNamesLeavePage() {
        var t = (new Date()).getTime();
        if(t - this.lastEvent > 500)
            this.findNames();
        else
            this.lastEvent = t;
    }
},
    return: {
        fontSize: 10
    }
};
</script>

