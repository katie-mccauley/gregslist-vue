<template>
  <form>
    <div class="form-group">
      <label for="price" class="">Price:</label>
      <input
        v-model="editable.price"
        placeholder="Price"
        type="number"
        class="form-control"
        name="price"
        id="price"
        required
      />
    </div>
    <div class="form-group">
      <label for="bedrooms" class="">Bedrooms:</label>
      <input
        v-model="editable.bedrooms"
        placeholder="Bedrooms"
        type="number"
        class="form-control"
        name="bedrooms"
        id="bedrooms"
        min="0"
        max="9999999"
      />
    </div>
    <div class="form-group">
      <label for="bedrooms" class="">levels:</label>
      <input
        v-model="editable.levels"
        placeholder="Bedrooms"
        type="number"
        class="form-control"
        name="levels"
        id="levels"
        min="0"
        max="9999999"
      />
    </div>
    <div class="form-group">
      <label for="bedrooms" class="">Bathrooms:</label>
      <input
        v-model="editable.bathrooms"
        placeholder="Bathrooms"
        type="number"
        class="form-control"
        name="bathrooms"
        id="bathrooms"
        min="0"
        max="9999999"
      />
    </div>
    <div class="form-group">
      <label for="year" class="">year:</label>
      <input
        v-model="editable.year"
        placeholder="year"
        type="year"
        class="form-control"
        name="year"
        id="year"
      />
    </div>
    <div class="form-group">
      <label for="description" class="">description:</label>
      <textarea
        v-model="editable.description"
        placeholder="Description"
        type="text"
        class="form-control"
        name="description"
        id="description"
        rows="5"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="img" class="">img:</label>
      <input
        v-model="editable.imgUrl"
        placeholder="https://imgurl.com"
        type="url"
        class="form-control"
        name="img"
        id="img"
        required
      />
    </div>
    <div class="d-flex justify-content-between my-3">
      <button
        type="button"
        data-bs-dismiss="modal"
        aria-label="Close"
        class="btn text-dark lighten-20 text-uppercase selectable"
      >
        <b> cancel </b>
      </button>
      <button
        v-if="!houseData.id"
        @click="createHouse"
        type="button"
        class="btn btn-success text-dark text-uppercase selectable"
      >
        <b> Create House </b>
      </button>
      <button
        v-else
        @click="editHouse"
        type="button"
        class="btn btn-info text-dark text-uppercase selectable"
      >
        <b> Edit House </b>
      </button>
    </div>
  </form>
</template>

<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import { housesService } from "../services/HousesService";
import { Modal } from "bootstrap";
export default {
  props: {
    houseData: {
      type: Object,
      required: false,
      default: {},
    },
  },
  setup(props) {
    const editable = ref({});
    const router = useRouter();
    watchEffect(() => {
      logger.log("change happened re-running watch effect");
      editable.value = props.houseData;
    });
    return {
      editable,
      async createHouse() {
        try {
          let newHouse = await housesService.createHouse(editable.value);
          Modal.getOrCreateInstance(
            document.getElementById("form-modal")
          ).hide();
          router.push({ name: "HouseDetails", params: { id: newHouse.id } });
        } catch (error) {
          logger.error(error);
        }
      },
      async editHouse() {
        try {
          await housesService.editHouse(editable.value);
          Modal.getOrCreateInstance(
            document.getElementById("form-modal")
          ).hide();
        } catch (error) {
          logger.error(error);
        }
      },
    };
  },
};
</script>
