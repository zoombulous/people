<template>
<div id="app">
  <h1>Lil' Baby Names</h1>
  <div id="app" class="parent">

      <div class="container-fluid px-5">
        
        <div class="row bg-white">
          
          
          
          <div class="col">
            <div class="form-group">
              <form action="" style="width: auto; margin: auto">
                <div for="name" class="control-label">Gender</div>
                <select v-model="gender" class="form-control">
                  <option value="male">Male</option>
                  <option value="male,mostly-male,gender-neutral">Mostly Male</option>
                  <option value="">All Genders</option>
                  <option value="female,mostly-female,gender-neutral">Mostly Female</option>
                  <option value="female">Female</option>
                </select>
              </form>
            </div>
          </div>
          
          <div class="col">
            <div class="form-group">
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
          <div class="col">
            <div class="form-group">
              <form action="" style="width: auto; margin: auto">
                <div for="name" class="control-label">Starts With</div>
                <input v-model="startsWith" @input="isTyping = true" placeholder="" size="15" class="form-control"/>
              </form>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <form action="" style="width: auto; margin: auto">
                <div for="name" class="control-label">Contains</div>
                <input v-model="contains" placeholder="" size="15" class="form-control"/>
              </form>
            </div>
          </div>
        </div>
        
        <div class="row bg-white">
          <div class="col">
          
            <div class="range-slider">
              <span @change="slider">from <input v-model.number="minLength" type="number"  min="1" max="15"/> to <input  v-model.number="maxLength" type="number"  min="1" max="15"/></span>
              <input @change="slider" v-model.number="minLength" min="1" max="15" step="1" type="range" />
              <input @change="slider" v-model.number="maxLength" min="1" max="15" step="1" type="range" />
              <svg width="100%" height="24">
                <line x1="4" y1="0" x2="300" y2="0" stroke="#444" stroke-width="12" stroke-dasharray="1 19"></line>
              </svg>
            </div>
          </div>
        </div>
          
        <div class="row bg-white">
          <div class="col-12">
            <button class="btn btn-warning" v-on:click="findNames">Go</button>
          </div>
        </div>
        
        <div class="row bg-light">
          <div class="col">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-warning" v-on:click="resetPage">&laquo;</button>
              <button type="button" class="btn btn-warning" v-on:click="previousPage">&#8249;</button>
              <div for="name" class="control-label">
              </div>
              <input v-model="pageNumber" placeholder="" size="5" class="form-control"/>
              <button id="btn" class="btn btn-warning" v-on:click="nextPage">&#8250;</button>
              <button id="btn" class="btn btn-warning" v-on:click="lastPage">&raquo;</button>
            </div>
          </div>
        </div>
        <div class="row row2">
          <div class="col">
            <div class="" role="group">
              <p>Result:
                <strong>
                  <div class="">
                    <input v-model="totalResults" placeholder="" size="5" class="form-control"/>
                  </div>
                </strong>
              </p>
            </div>
            <table class="table table-striped table-hover">
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
import _ from 'lodash';
import $ from 'jquery';
var slider = document.getElementById('slider');
require('dotenv').config();
console.log(process.env);


export default {
  name: "App",
  data() {
      return {
          contains: '',
          startsWith: '',
          sortBy: 'alpha-asc, alpha-desc, freq-asc, freq-desc, length, length-desc',
          gender:'male,mostly-male,neutral,mostly-female,female',
          minLength:'1',
          maxLength:'15',
          names: [],
          pageSize: [10],
          pageNumber: [1],
          totalResults: 0,
          lastEvent: 0,
          debouncedFindNames: this.findNames
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
        
        contains() {
            this.throttledFindNames();
        },
        changeKey() {
            this.reload();
        },
        startsWith() {
            this.throttledFindNames();
        },
    },
    
    methods: {
        findNames: _.debounce(
            function () {
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
            }, 500),
        
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
            let t = (new Date()).getTime();
            if(t - this.lastEvent > 500)
                this.findNames(),
            this.resetPage();
            else
                this.lastEvent = t;
        },
        throttledFindNamesLeavePage() {
            let t = (new Date()).getTime();
            if(t - this.lastEvent > 500)
                this.findNames();
            else
                this.lastEvent = t;
        },
        slider: function() {
            if (this.minLength > this.maxLength) {
                var tmp = this.maxLength;
                this.maxLength = this.minLength;
                this.minLength = tmp;
            }
        },
        
    },
    return: {
        fontSize: 10
    }
};
</script>

