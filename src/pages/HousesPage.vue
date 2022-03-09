<template>
  <div class="container-fluid">
    <b
      title="Create House"
      class="
        create-btn
        btn btn-success
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      data-bs-toggle="modal"
      data-bs-target="#form-modal"
    >
      <i class="mdi mdi-plus"></i>
    </b>
    <div class="row">
      <div class="col-3" v-for="h in houses" :key="h.id">
        <House :house="h" />
      </div>
    </div>
    <Modal>
      <template #modal-title>Create House</template>
      <template #modal-body><HouseForm /></template>
    </Modal>
  </div>
</template>

<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { housesService } from "../services/HousesService";
import { logger } from "../utils/Logger";
export default {
  setup() {
    onMounted(async () => {
      try {
        await housesService.getAll();
      } catch (error) {
        logger.error(error);
      }
    });
    return {
      houses: computed(() => AppState.houses),
    };
  },
};
</script>

<style scoped>
.create-btn {
  font-size: 20px;
  height: 60px;
  width: 60px;
  z-index: 100;
  position: fixed;
  bottom: 10vh;
  right: 5vh;
}
</style>