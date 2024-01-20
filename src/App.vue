<script>
import { loadUsers, removeUser } from '@/api';
import UserList from './components/UserList.vue';
import SpinLoader from './components/SpinLoader.vue';

export default {
  components: {
    UserList,
    SpinLoader,
  },

  data() {
    return {
      users: [],
      isLoading: false,
    };
  },

  async mounted() {
    this.isLoading = true;
    try {
      this.users = await loadUsers();
    } catch (err) {
      console.log('Loading error: ', err);
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    async onRemoveUser(userId) {
      try {
        this.isLoading = true;
        const response = await removeUser(userId);

        if (response) {
          this.users = this.users.filter(({ id }) => userId !== id);
        }
      } catch (err) {
        console.log('Remove user error: ', err);
      } finally {
        this.isLoading = false;
      }
    },

    onHandleUser(newUser) {
      const isUserExists = !!this.users.find(({ id }) => newUser.id === id);

      if (isUserExists) {
        this.users = this.users.map((user) => {
          if (user.id === newUser.id) {
            return newUser;
          }

          return user;
        });

        return;
      }

      this.users.push(newUser);
    },
  },
}
</script>

<template>
  <div class="flex flex-center flex-col">
    <spin-loader
      v-if="isLoading"
      :spin-diameter="100"
    />
    <user-list
      v-else
      :users="users"
      @remove-user="onRemoveUser"
      @handle-user="onHandleUser"
    />
  </div>
</template>

<style lang="scss">

</style>
