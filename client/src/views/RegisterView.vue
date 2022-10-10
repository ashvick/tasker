<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import router from "@/router";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import { reactive, ref, type Ref } from 'vue';

const state = reactive({
  name: '',
  email: '',
  password: '',
  accept: null,
});

const rules = {
    name: { required },
    email: { required, email },
    password: { required },
    accept: { required }
};

const submitted = ref(false);
const showMessage = ref(false);

const v$ = useVuelidate(rules, state);

function handleSubmit(isFormValid: boolean) {
    submitted.value = true;

    if (!isFormValid) {
        return;
    }

    send();
}

function toggleDialog() {
    showMessage.value = !showMessage.value;

    if(!showMessage.value) {
        resetForm();
    }
}

function resetForm() {
    state.name = '';
    state.email = '';
    state.password = '';
    state.accept = null;
    submitted.value = false;
}

function send() {
  const user = {
    username: state.name,
    email: state.email,
    password: state.password,
  }

  fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => {
      if (200 === res.status) {
        toggleDialog();
      }
    })
    .catch(err => console.log(err));
}

function handleDialogConfirmation() {
    toggleDialog();

    router.push('/login');
}

</script>

<template>
  <main>
    <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
        <div class="flex align-items-center flex-column pt-6 px-3">
            <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
            <h5>Registration Successful!</h5>
            <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                Your account is registered under name <b>{{state.name}}</b> ; it'll be valid next 30 days without activation. Please check <b>{{state.email}}</b> for activation instructions.
            </p>
        </div>
        <template #footer>
            <div class="flex justify-content-center">
                <Button label="OK" @click="handleDialogConfirmation" class="p-button-text" />
            </div>
        </template>
    </Dialog>
    <div class="card">
      <h5>Register</h5>
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
                      <template #footer="sp">
                          {{sp.level}}
                          <Divider />
                          <p class="mt-2">Suggestions</p>
                          <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                              <li>At least one lowercase</li>
                              <li>At least one uppercase</li>
                              <li>At least one numeric</li>
                              <li>Minimum 8 characters</li>
                          </ul>
                      </template>
                  </Password>
                  <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password*</label>
              </div>
              <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
          </div>
          <div class="field-checkbox">
              <Checkbox id="accept" name="accept" value="Accept" v-model="v$.accept.$model" :class="{'p-invalid':v$.accept.$invalid && submitted}" />
              <label for="accept" :class="{'p-error': v$.accept.$invalid && submitted}">I agree to the terms and conditions*</label>
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

  .card {
      min-width: 450px;

      form {
          margin-top: 2rem;
      }

      .field {
          margin-bottom: 1.5rem;
      }
  }

  .button {
    margin-top: 2rem;
  }

  @media screen and (max-width: 960px) {
      .card {
          width: 80%;
      }
  }
</style>