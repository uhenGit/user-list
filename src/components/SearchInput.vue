<script>
export default {
  props: {
    filter: {
      type: String,
      default: '',
    }
  },

  emits: ['apply-filter'],

  data() {
    return {
      isActiveInput: false,
    }
  },

  methods: {
    onToggleInput() {
      if (this.isActiveInput && this.filter) {
        return;
      }

      this.isActiveInput = !this.isActiveInput;

      if (this.isActiveInput) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      }
    },

    onFilterUsers(evt) {
      this.$emit('apply-filter', evt.target.value);
    }
  }
}
</script>
<template>
  <div class="fixed full-width">
    <div class="flex flex-end search-wrap">
     <Transition name="button">
        <button
          v-if="!isActiveInput"
          class="search-btn c-pointer"
          title="Click to search a user"
          @click="onToggleInput"
        >
          <img
            class="search-icon"
            src="../assets/icons/search-alt-1-svgrepo-com.svg"
            alt="search icon"
          >
        </button>
     </Transition>
      <Transition name="input">
        <input
          v-if="isActiveInput"
          ref="searchInput"
          :value="filter"
          class="search-input"
          @input="onFilterUsers"
          @blur="onToggleInput"
        />
      </Transition>
    </div>
  </div>
</template>
<style scoped lang="scss">
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0d6efd;

  .search-wrap {
    padding: 10px;
  }

  .search-btn {
    width: 36px;
    height: 36px;
    outline: none;
    border-radius: 8px;
    background-color: #fff;
    position: relative;
    left: 0;

    .search-icon {
      width: 22px;
      height: 22px;
      padding-top: 3px;
    }
  }

  .search-input {
    padding: 3px 0 3px 6px;
    width: 200px;
    border-radius: 8px;
    font-size: 18px;
    background-color: #fff;
    color: #495057;
  }
}
.button-enter-active,
.buleave-active {
  transition: all 0.5s ease;
  transition-delay: 0.5s;
}
.button-enter-from,
.button-leave-to {
  opacity: 0;
  left: -200px;
}
.input-enter-active,
.input-leave-active {
  transition: all 0.5s ease;
}

.input-enter-from,
.input-leave-to {
  width: 0;
  opacity: 0;
}
</style>