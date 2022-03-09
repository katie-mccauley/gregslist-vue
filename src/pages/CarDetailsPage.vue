<template>
  <div class="container">
    <div class="row mt-3 bg-light shadow p-4">
      <div class="col-md-6">
        <img :src="car.imgUrl" class="img-fluid" alt="" srcset="" />
      </div>
      <div class="col-md-6">
        <h1>{{ car.make }} | {{ car.model }}</h1>
        <h2>{{ car.year }}</h2>
        <p>{{ car.description }}</p>
        <input type="color" class="m-2" disabled :value="car.color" />
        <b>{{ car.price }}</b>
        <div class="text-end selectable" @click="openModal">
          edit car
          <i class="mdi mdi-pencil"></i>
        </div>
      </div>
    </div>
    <Modal>
      <template #modal-title>Edit {{ car.make }} {{ car.model }}</template>
      <template #modal-body><CarForm :carData="car" /></template>
    </Modal>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { carsService } from "../services/CarsService";
import { useRoute } from "vue-router";
import { Modal } from "bootstrap";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        // NOTE this first line is only to get rid of the previous car from showing up for half a second as we pick a new active car. not required to work.
        AppState.activeCar = {};
        logger.log(route.params);
        await carsService.getById(route.params.id);
      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      car: computed(() => AppState.activeCar),
      openModal() {
        Modal.getOrCreateInstance(document.getElementById("form-modal")).show();
      },
    };
  },
};
</script>


<style scoped>
</style>
