<script setup lang="ts">
import router from "@/router";
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

function handleClick() {
  const user = {
    username: inputData.username,
    password: inputData.password,
  }

  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('accessToken', data.token);
    })
    .catch(err => console.log(err));

  function useEffect() {

  }
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
            label="Login"
            icon="pi pi-plus"
            class="button p-button-success p-button p-button-sm"
            @click="handleClick"
        />
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
