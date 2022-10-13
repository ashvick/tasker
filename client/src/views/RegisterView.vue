<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import router from "@/router";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Dialog from 'primevue/dialog';
import { reactive, ref, type Ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';

const state = reactive({
  name: '',
  email: '',
  password: ''
});

const rules = {
    name: { required },
    email: { required, email },
    password: { required }
};

const submitted = ref(false);
const showMessage = ref(false);

const v$ = useVuelidate(rules, state);

const authStore = useAuthStore();

function handleSubmit(isFormValid: boolean) {
    submitted.value = true;

    if (!isFormValid) {
        return;
    }

    authStore.register(state.name, state.email, state.password)
        .then(() => toggleDialog())
        .catch(error => alert(error));
}

function toggleDialog() {
    showMessage.value = !showMessage.value;

    if(!showMessage.value) {
        resetState();
    }
}

function resetState() {
    state.name = '';
    state.email = '';
    state.password = '';
    submitted.value = false;
}

function handleDialogConfirmation() {
    toggleDialog();

    router.push('/login');
}
</script>

<template>
  <main>
    <Dialog v-model:visible="showMessage" :closable="false" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
        <div class="dialog-content">
            <i class="pi pi-check-circle" :style="{fontSize: '2rem', color: 'var(--green-500)', marginRight: '1rem'}"></i>
            <span>Registration successful!<br>Now you will be redirected to login. </span>
        </div>
        <template #footer>
            <div>
                <Button label="OK" @click="handleDialogConfirmation" class="p-button-text" />
            </div>
        </template>
    </Dialog>
    <div class="card">
      <h3>Register</h3>
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
              <div class="p-float-label">
                  <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" />
                  <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Name*</label>
              </div>
              <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
          </div>
          <div class="field">
              <div class="p-float-label p-input-icon-right">
                  <i class="pi pi-envelope" />
                  <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                  <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
              </div>
              <span v-if="v$.email.$error && submitted">
                  <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                  <small class="p-error">{{error.$message}}</small>
                  </span>
              </span>
              <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
          </div>
          <div class="field">
              <div class="p-float-label">
                  <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                      <template #header>
                          <h6>Pick a password</h6>
                      </template>
                  </Password>
                  <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password*</label>
              </div>
              <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
          </div>
          <Button type="submit" label="Submit" class="button" />
      </form>
    </div>
  </main>
</template>

<style lang='scss' scoped>
main {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
}

.dialog-content {
  display: flex;
  align-items: center;
}

.card {
  min-width: 450px;

  form {
    margin-top: 2rem;
  }

  .field {
    margin-bottom: 1.5rem;
  }
}

@media screen and (max-width: 960px) {
  .card {
    width: 80%;
  }
}
</style>
