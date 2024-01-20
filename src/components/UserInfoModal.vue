<script>
import { addUser, editUser } from '@/api';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['hide-modal', 'handle-user'],

  data() {
    return {
      editUser: {
        first_name: '',
        last_name: '',
        email: '',
        id: null,
        avatar: 'some url',
        phoneNumber: '',
        address: '',
      },
      isInvalidFirstName: false,
      isInvalidLastName: false,
      isInvalidEmail: false,
      isLoading: false,
    }
  },

  mounted() {
    this.editUser = { ...this.user };
  },

  computed: {
    userHasNoChanges() {
      return JSON.stringify(this.user) === JSON.stringify(this.editUser);
    }
  },

  methods: {
    handleAvatar() {
      if (this.editable && !this.isLoading) {
        this.$refs.avatar.click();
      }
    },

    onAddAvatar(evt) {
      this.editUser.avatar = URL.createObjectURL(evt.target.files[0]);
    },

    async onSaveUser() {
      if (this.isValidationFailed()) {
        return;
      }

      try {
        this.isLoading = true;
        let result;

        if (this.user.id) {
          result = await editUser(this.editUser);
        } else {
          this.editUser.id = Date.now();
          result = await addUser(this.editUser);
        }

        this.$emit('handle-user', result);
      } catch (err) {
        const errorMsg = this.user.id
          ? 'Update user error: '
          : 'Create user error: ';
        console.log(errorMsg, err);
      } finally {
        this.isLoading = false;
        this.$emit('hide-modal');
      }
    },

    isValidationFailed() {
      this.isInvalidFirstName = !this.editUser.first_name.trim();
      this.isInvalidLastName = !this.editUser.last_name.trim();
      // eslint-disable-next-line
      this.isInvalidEmail = !this.editUser.email.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi)

      return this.isInvalidFirstName || this.isInvalidLastName || this.isInvalidEmail;
    },

    onHideModal() {
      this.$emit('hide-modal');
    },
  },
}
</script>
<template>
  <div class="modal-outer"></div>
    <div class="modal-inner">
      <form
        class="flex flex-col"
        @submit.prevent="onSaveUser"
      >
        <table>
          <tr>
            <td>First name:</td>
            <td class="flex flex-col">
              <input
                type="text"
                v-model="editUser.first_name"
                :disabled="!editable || isLoading"
              />
              <span
                v-show="isInvalidFirstName"
                class="hint validated"
              >
              * This field should not be empty
              </span>
            </td>
          </tr>
          <tr>
            <td>Last name:</td>
            <td class="flex flex-col">
              <input
                type="text"
                v-model="editUser.last_name"
                :disabled="!editable || isLoading"
              />
              <span
                v-show="isInvalidLastName"
                class="hint validated"
              >
              * This field should not be empty
              </span>
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td class="flex flex-col">
               <input
                type="text"
                v-model="editUser.email"
                :disabled="!editable || isLoading"
              />
              <span
                v-show="isInvalidEmail"
                class="hint validated"
              >
                * Invalid email provided
              </span>
            </td>
          </tr>
          <tr>
            <td>Avatar:</td>
            <td>
              <div v-if="editUser.avatar">
                <img
                  :src="editUser.avatar"
                  alt="user avatar"
                  :class="{ 'c-pointer': editable && !isLoading }"
                  :title="(editable && !isLoading) ? 'Select file' : ''"
                  @click="handleAvatar"
                />
                <input
                  v-show="false"
                  ref="avatar"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  @input="onAddAvatar"
                />
              </div>
              <input
                v-else
                type="file"
                name="avatar"
                :disabled="!editable || isLoading"
                accept="image/*"
                @input="onAddAvatar"
              />
            </td>
          </tr>
          <tr>
            <td>Phone number:</td>
            <td class="flex flex-col">
              <input
                type="text"
                v-model="editUser.phoneNumber"
                :disabled="!editable || isLoading"
              />
              <span class="hint optional">
                Optional field
              </span>
            </td>
          </tr>
          <tr>
            <td>Address:</td>
            <td class="flex flex-col">
              <input
                type="text"
                v-model="editUser.address"
                :disabled="!editable || isLoading"
              />
              <span class="hint optional">
                Optional field
              </span>
            </td>
          </tr>
        </table>
        <div class="flex full-width flex-end form-actions">
          <div v-if="!isLoading">
            <div
              v-if="editable"
              class=" flex btn-block"
            >
              <button
                class="c-pointer btn-cancel"
                type="button"
                @click="onHideModal"
              >
                Cancel
              </button>
              <button
                class="c-pointer btn-save"
                :class="{ 'btn-disabled': userHasNoChanges }"
                type="submit"
                :disabled="userHasNoChanges"
              >
                Save
              </button>
            </div>
            <div v-else>
              <button
              class="c-pointer btn-cancel"
                type="button"
                @click="onHideModal"
              >
                Close
              </button>
            </div>
          </div>
          <div v-else>
            loading...
          </div>
        </div>
      </form>
    </div>
</template>
<style scoped lang="scss">
.modal-outer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #495057a3;
}
.modal-inner {
  background-color: #fff;
  padding: 2rem;
  border-radius: 5px;
  position: fixed;
  top: 20%;
  min-width: 70%;

  button {
    background-color: #fff;
    border: 1px solid #495057a3;
    padding: 5px 8px;
    margin: 1rem 1rem 0;
  }

  .btn-save {
    color: #0d6efd;
  }
  
  .btn-cancel {
    color: #fd7e14;
  }

  .btn-disabled {
    color: #495057;
    cursor: not-allowed;
  }
}

tr {
  td {
    padding-bottom: 1rem;

    img {
      width: 30px;
      border-radius: 50%;
    }
  }
}

.hint {
  font-size: 8px;
}
.validated {
  color: #dc3545;
}

@media screen and (max-width: 570px) {
  .modal-inner {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>