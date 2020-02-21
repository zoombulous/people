<template>
<div id="app">
  <h1>Lil' Baby Names</h1>
  <div id="app" class="parent">
    <div id="app" class="center">
      <div id="app" class="container-fluid">
        
        <div id="app" class="row row1">
          <div id="app" class="col-xs-12 col-sm-7 col-md-5 col-lg-1 mx-2">
          </div>
          
          
          <div id="app" class="col-xs-12 col-sm-7 col-md-5 col-lg-2 mx-2">
            <div id="app" class="form-group">
              <form action="" style="width: auto; margin: auto">
                <div for="name" class="control-label">Gender</div>
                <select v-model="gender" class="form-control">
                  <option value="male,mostly-male,neutral,mostly-female,female">All Genders</option>
                  <option value="male,mostly-male,gender-neutral">All Male</option>
                  <option value="male">Most Masculine</option>
                  <option value="male,mostly-male">Medium Masculine</option>
                  <option value="gender-neutral">Gender Neutral</option>
                  <option value="female,mostly-female">Medium Feminine</option>
                  <option value="female">Most Feminine</option>
                  <option value="gender-neutral,female,mostly-female">All Female</option>
                </select>
              </form>
            </div>
          </div>
          
          <div id="app" class="col-xs-12 col-sm-7 col-md-5 col-lg-2 mx-2">
            <div id="app" class="form-group">
              <form action="" style="width: auto; margin: auto">
                <div for="name" class="control-label">Sort</div>
                <select v-model="sortBy" class="form-control">
                  <option value="alpha">A-Z</option>
                  <option value="alpha-desc">Z-A</option>
                  <option value="freq-asc">Least Common</option>
                  <option value="freq-desc">Most Common</option>
                  <option value="length">Shortest</option>
                  <option value="length-desc">Longest</option>
                </select>
              </form>
            </div>
          </div>
          <div id="app" class="col-xs-12 col-sm-7 col-md-5 col-lg-2 mx-2">
            <div id="app" class="form-group">
              <form action="" style="width: auto; margin: auto">
                <div for="name" class="control-label">Starts With</div>
                <input v-model="startsWith" @input="isTyping = true" placeholder="" size="15" class="form-control"/>
              </form>
            </div>
          </div>
          <div id="app" class="col-xs-12 col-sm-7 col-md-5 col-lg-2 mx-2">
            <div id="app" class="form-group">
              <form action="" style="width: auto; margin: auto">
                <div for="name" class="control-label">Contains</div>
                <input v-model="contains" placeholder="" size="15" class="form-control"/>
              </form>
            </div>
          </div>
        </div>
        
        <div id="app" class="rowSlider center row1">
          <div id="app" class="col-xs-12 col-sm-7 col-md-5 col-lg-1 mx-2">
          </div>
          <div id="app" class="form-group">
            <form action="" style="width: auto; margin: auto" class="center">
              <div for="name" class="control-label">Length</div>
              <input v-model="maxLength"
                     type="range"
                     placeholder=""
                     min="1"
                     max="15"
                     class="custom-range"/>
            </form>
          </div>
        </div>

        <div id="app" class="center row1">
            <div id="app" class="col-12">
              <button id="btn" class="btn btn-warning" v-on:click="findNames">Go</button>
            </div>
          </div>
        
        <div id="app" class="rowPage center">
          <div id="app" class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-warning" v-on:click="resetPage">&laquo;</button>
            <button type="button" class="btn btn-warning" v-on:click="previousPage">&#8249;</button>
            <div for="name" class="control-label">
            </div>
            <input v-model="pageNumber" placeholder="" size="5" class="form-control"/>
            <button id="btn" class="btn btn-warning" v-on:click="nextPage">&#8250;</button>
            <button id="btn" class="btn btn-warning" v-on:click="lastPage">&raquo;</button>
          </div>
        </div>
        <div id="app" class="center row2">
          <div id="app" class="group" role="group">
            <p>Result:
              <strong>
              <div id="app" class="center">
                <input v-model="totalResults" placeholder="" size="5" class="form-control"/>
              </div>
              </strong>
            </p>
          </div>
          <table id="app" class="table table-striped table-hover">
            <tr v-for="name in names" :key="name">
              <td>{{ name }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<link rel="stylesheet" href="vue-nouislider/dist/vue-nouislider.css"/>
 
<script src="vue.js"></script>
<script src="vue-nouislider/dist/vue-nouislider.browser.js"></script>

<style>
  @import './styles.css';
</style>

<script>
import axios from "axios";
import { components } from 'aws-amplify-vue';
var slider = document.getElementById('slider');



export default {
  name: "App",
  data() {
      return {
          sliderValue: ['10.00', '80.00'],
        contains: '',
        startsWith: '',
        sortBy: 'alpha-asc, alpha-desc, freq-asc, freq-desc, length, length-desc',
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
                this.names = response.data.results.map(item => item.name);
                this.totalResults = response.data['total-matches'];
                });
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
    },
    
},
    return: {
        fontSize: 10
    }
};
</script>

