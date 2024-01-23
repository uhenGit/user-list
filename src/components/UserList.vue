<script>
import SearchInput from './SearchInput.vue';
import UserInfoModal from './UserInfoModal.vue';

export default {

  components: {
    SearchInput,
    UserInfoModal,
  },

  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  emits: ['remove-user', 'handle-user'],

  data() {
    return {
      filter: '',
      selectedUser: null,
      showUserModal: false,
      editable: false,
    }
  },

  computed: {
    filteredUsers() {
      return !this.filter
        ? this.users
        : this.users.filter((user) => {
          return [user.first_name, user.last_name, user.email].some((value) => {
            return value.toLowerCase().includes(this.filter.toLowerCase())
          })
        })
    },
  },

  methods: {
    applyFilter(value) {
      this.filter = value;
    },

    showUserDetails(userIsEditable, userId = null) {
      if (!userId) {
        this.selectedUser = {
          first_name: '',
          last_name: '',
          email: '',
          id: null,
          avatar: '',
        };
        this.editable = true;
        this.showUserModal = true;

        return;
      }

      this.selectedUser = this.users.find(({ id }) => userId === id);
      this.editable = userIsEditable;
      this.showUserModal = true;
    },

    hideUserDetails() {
      this.showUserModal = false;
    },

    addUser(newUser) {
      this.$emit('handle-user', newUser);
    },

    onRemoveUser(userId) {
      this.$emit('remove-user', userId);
    },
  },
}
</script>
<template>
  <search-input
    :filter="filter"
    @apply-filter="applyFilter"
  />
  <ul class="list-style-none full-width users-list">
    <li
      v-for="user in filteredUsers"
      :key="user.id"
      class="flex user-row"
    >
      <div class="flex user-info">
        <img
          :src="user.avatar"
          alt="users avatar"
          class="avatar"
        />
        <div class="flex user-credentials">
          <span
            class="c-pointer text-ellipsis"
            @click="showUserDetails(false, user.id)"
          >
            {{ user.first_name }}&ensp;{{ user.last_name }}:
          </span>&ensp;
          <span>{{ user.email }}</span>
        </div>
      </div>
      <div class="flex c-pointer user-actions">
        <img
          src="../assets/icons/edit-svgrepo-com.svg"
          alt="edit user"
          @click="showUserDetails(true, user.id)"
        >
        <img
          src="../assets/icons/trash-alt-svgrepo-com.svg"
          alt="remove user"
          @click="onRemoveUser(user.id)"
        >
      </div>
    </li>
  </ul>
  <div class="flex flex-center add-user">
    <button
      class="full-width c-pointer"
      @click="showUserDetails(true)"
    >
      Add user
    </button>
  </div>
    <user-info-modal
      v-if="showUserModal"
      :user="selectedUser"
      :editable="editable"
      @hide-modal="hideUserDetails"
      @handle-user="addUser"
    />
</template>
<style lang="scss">
.users-list {
  margin: 50px auto 0;

  .user-row {
    padding: 1rem 2rem;
    justify-content: space-between;
    border-bottom: 1px solid #465057;
    font-size: 18px;
    color: #495057;

    .user-info {
      align-items: center;

      img {
        margin-right: 3rem;
      }
    }
  }
}
.avatar {
  width: 40px;
  border-radius: 50%;
  margin-right: 2rem;
}
.user-actions img {
  width: 36px;
  height: 36px;
  padding: 8px;
  border-radius: 35%;

  &:first-child {
    background-color: #fd7e14;
    margin-right: 5px;
  }

  &:last-child {
  background-color: #dc3545;
  }
}
.add-user {
  margin: 1rem auto;
  width: 70%;

  button {
    padding: 0.5rem 0;
    background-color: #0d6efd;
  }
}

@media screen and (max-width: 570px) {
  .users-list {
    .user-row {
      padding: 1rem 0;

      .user-info img {
        margin-right: 1rem;
        margin-left: 5px;
      }
    }
  }
  
  .user-credentials,
  .user-actions {
    flex-direction: column;
  }

  .user-actions img {
    margin-right: 5px;

    &:first-child {
      margin-bottom: 5px;
    }
  }
}
</style>