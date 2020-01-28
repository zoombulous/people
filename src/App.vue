<template>
  <div id="app">
    <pre v-if="info">
      {{ info }}
    </pre>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
        info: null,
        contains: '',
        startsWith: '',
        names: [],
        last_event: 0,
        cancel: 0
    };
  },
    

    methods: {
        findNames() {
            axios.get(
                'http://names.sinistercode.com:4242/api/names?'
                    + 'format=json'
                    + '&sort=length-asc'
                    + '&contains-letters=' + this.contains
                    + '&starts-with=' + this.startsWith
            ).then((response) => {
                this.names = response.data.results.map(item => item.name);
            });
        }
  }
};
</script>

