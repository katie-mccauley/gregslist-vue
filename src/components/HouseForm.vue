<template>
  <form>
    <div class="form-group">
      <label for="price" class="">Price:</label>
      <input
        v-model="editable.model"
        placeholder="Model"
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
        v-model="editable.price"
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
        v-if="!carHouse.id"
        @click="createHouse"
        type="button"
        class="btn btn-success text-dark text-uppercase selectable"
      >
        <b> Create Car </b>
      </button>
    </div>
  </form>
</template>