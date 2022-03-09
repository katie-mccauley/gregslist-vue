<template>
  <div class="container-fluid">
    <div class="row mt-3 bg-light shadow p-4">
      <div class="col-md-6">
        <img :src="house.imgUrl" class="img-fluid" alt="" srcset="" />
      </div>
      <div class="col-md-6">
        <h1>{{ house.year }} | {{ house.price }}</h1>
        <h2>{{ house.description }}</h2>
        <p>{{ house.levels }} | {{house.bedrooms}} | {{house.bathrooms}}</p>
        <!-- <div class="text-end selectable" @click="openModal">
          edit car
          <i class="mdi mdi-pencil"></i>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { AppState } from "../AppState";
  import { computed, reactive, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { housesService } from "../services/HousesService";
  import { logger } from "../utils/Logger";
  export default {
    setup() {
      const route = useRoute()
      onMounted(async () => {
        try {
          AppState.activeHouse = {}
          await housesService.getById(route.params.id)

        } catch (error) {
          logger.log(error)
        }
      })
      return {
        house: computed(() => AppState.activeHouse)

      }
    }
  }
</script>