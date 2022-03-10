<template>
  <div class="container-fluid">
    <div class="row mt-3 bg-light shadow p-4">
      <div class="col-md-6">
        <img :src="house.imgUrl" class="img-fluid" alt="" srcset="" />
      </div>
      <div class="col-md-6">
        <h1>{{ house.year }} | {{ house.price }}</h1>
        <h2>{{ house.description }}</h2>
        <p>{{ house.levels }} | {{ house.bedrooms }} | {{ house.bathrooms }}</p>
        <div @click="deleteHouse">
          <button class="btn btn-danger">delete</button>
        </div>
        <div class="text-end selectable" @click="openModal">
          edit house
          <i class="mdi mdi-pencil"></i>
        </div>
      </div>
    </div>
    <Modal>
      <template #modal-title>Edit {{ house.price }}</template>
      <template #modal-body><HouseForm :houseData="house" /></template>
    </Modal>
  </div>
</template>

<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { housesService } from "../services/HousesService";
import { logger } from "../utils/Logger";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      try {
        AppState.activeHouse = {};
        await housesService.getById(route.params.id);
      } catch (error) {
        logger.log(error);
      }
    });

    return {
      house: computed(() => AppState.activeHouse),
      openModal() {
        Modal.getOrCreateInstance(document.getElementById("form-modal")).show();
      },
      async deleteHouse() {
        try {
          await housesService.deleteHouse(route.params.id);
          router.push({ name: "Houses" });
        } catch (error) {
          logger.error(error);
        }
      },
    };
  },
};
</script>