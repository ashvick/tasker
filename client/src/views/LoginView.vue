<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth.store";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { reactive, ref, type Ref } from 'vue';

interface LoginInputData {
  username: string,
  password: string,
}

const inputData: LoginInputData = reactive({
  username: '',
  password: '',
});

const authStore = useAuthStore();

function handleSubmit() {
  authStore.login(inputData.username, inputData.password);
}

</script>

<template>
  <main>
    <div class="input-form">
        <div class="field">
          <h5>Username</h5>
          <InputText type="text" v-model="inputData.username" />
        </div>
        <div class="field">
          <h5>Password</h5>
          <Password v-model="inputData.password" toggleMask />
        </div>

        <Button
            label="Submit"
            icon="pi pi-plus"
            class="button p-button-success p-button p-button-sm"
            @click="handleSubmit"
        />
        <RouterLink to="/register">Create account</RouterLink>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
}
.input-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > .button {
    margin-top: 1rem;
  }
}
</style>
