<template>
  <b-container>
    <img src="https://picsum.photos/600/300/?image=25" alt="Starships">
    <table class="table mt-5" v-if="data">
      <tbody>
      <tr v-for="([key, value], index) in Object.entries(data)" :key="index">
        <td class="table-secondary text-right">{{key}}</td>
        <td :class="key === 'name'? 'font-weight-bold': ''"> {{value}}</td>
      </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
import Starships from '@/API/starships.js';

export default {
  name: "Details",
  data: () => ({
    starships: null,
    data: null
  }),
  created() {
    this.starships = new Starships;
    this.getDetails(this.$route.params.id)

  },
  methods:{
    getDetails: function(page){
      this.starships.getStarshipsDetail(page)
      .then((res)=>{
        if(res.status === 200){
          this.data =  res.data;
          delete this.data["films"];
          delete this.data["pilots"];
          delete this.data["url"];
        }
      })
      .catch((err) => console.error(err))
    }
  }
}
</script>

<style scoped>

</style>
