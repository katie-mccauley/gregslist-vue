<template>
  <router-link :to="{name: 'HouseDetails', params: {id: house.id}}">
    <div class="row p-3 rounded bg-light rounded selectable">
      <div class="col-12">
        <img class="img-fluid" :src="house.imgUrl" alt="" />
      </div>
      <h3 class="col-12">
        {{house.year}} | {{house.levels}} | {{house.price}}
      </h3>
    </div>'
  </router-link>
</template>

<script>
  import { AppState } from "../AppState";
  import { computed, reactive, onMounted } from "vue";

  export default {
    props: {
      house: {
        type: Object,
        required: true
      },
    },
    setup() {
      return {}
    },
  }
</script>