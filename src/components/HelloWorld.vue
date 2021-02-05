<template>
  <div class="hello" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <b-container>
      <b-row class="mb-5">
        <b-col col xl="4">
          <b-form-input v-model="search" placeholder="Search the starships"></b-form-input>
        </b-col>
        <b-col col xl="12" class="text-left mt-3">
          Recent Search:
          <b-card
              v-for="(tag, index) in tags"
              :key="tag"
              :id="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
              tag="li"
              class="mt-1 mr-1"
              body-class="py-1 pr-2 text-nowrap"
          >
            <strong>{{ tag }}</strong>
            <b-button
                @click="removeTag(index)"
                variant="link"
                size="sm"
                :aria-controls="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
            >remove</b-button>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col col lg="4" v-for="(item, key) in items" :key="key">
          <b-card
              :title="item.name"
              img-src="https://picsum.photos/600/300/?image=25"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 100%;"
              class="mb-2"
          >
            <b-card-text class="">
              <table class="table">
                <tbody>
                <tr>
                  <td class="table-secondary text-right">MGLT:</td>
                  <td>{{ item.MGLT }}</td>
                </tr>
                <tr>
                  <td class="table-secondary text-right">Consumables:</td>
                  <td>{{ item.consumables }}</td>
                </tr>
                <tr>
                  <td class="table-secondary text-right">Crew:</td>
                  <td>{{ item.crew }}</td>
                </tr>
                <tr>
                  <td class="table-secondary text-right">Length:</td>
                  <td>{{ item.length }}</td>
                </tr>
                <tr>
                  <td class="table-secondary text-right">Manufacturer:</td>
                  <td>{{ item.manufacturer }}</td>
                </tr>
                <tr>
                  <td class="table-secondary text-right">Starship Class:</td>
                  <td>{{ item.starship_class }}</td>
                </tr>
                </tbody>
              </table>
            </b-card-text>

            <b-button href="#" variant="primary" @click="getDetails(item.url)">Get Details</b-button>
          </b-card>
        </b-col>
      </b-row>
      <b-spinner v-if="busy" variant="primary" label="Spinning" style="width: 5rem; height: 5rem"></b-spinner>
    </b-container>
  </div>
</template>

<script>
import Starships from '@/API/starships.js';
import {debounce} from "debounce";

export default {
  name: 'HelloWorld',
  data: () => ({
    starships: null,
    items: [],
    busy: false,
    page: 1,
    total: null,
    search: '',
    tags: []
  }),
  watch: {
    search(val) {
      if (val) {
        this.searchStarship(val);
      } else {
        this.getStraships(this.page);
      }
    }
  },
  mounted() {
    this.starships = new Starships;
    this.getStraships(this.page);
  },
  methods: {
    loadMore: function () {
      this.busy = this.page < Math.ceil(this.total / 10);

      setTimeout(() => {
        if (this.page < Math.ceil(this.total / 10)) {
          this.page++;
          this.getStraships(this.page);
          this.busy = false;
        } else {
          return false
        }

      }, 1000);
    },
    getStraships: function (page) {
      this.starships.getStarships(page)
          .then((res) => {
            if (res.status === 200) {
              this.total = res.data.count;
              if (page === 1) {
                this.items = res.data.results;
              } else {
                res.data.results.forEach((e) => {
                  this.items.push(e);
                })
              }
            }
          })
          .catch((err) => {
            console.error(err.response.data.detail)
          })
    },
    getDetails: function (val) {
      let regex = /\d+/;
      this.$router.push('/starship/' + val.match(regex)[0])
    },
    searchStarship: debounce(function (val) {
      this.starships.searchStarships(val)
          .then((res) => {
            if (res.status === 200) {
              this.total = res.data.count;
              this.items = res.data.results;
              this.tags.push(val);
            }
          })
          .catch((err) => {
            console.error(err.response.data.detail)
          })
    }, 1000),
    removeTag(tag){
      this.tags.splice(tag, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
