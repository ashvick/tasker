<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { reactive, ref } from 'vue';

const state = reactive({
  name: '',
  password: ''
});

const rules = {
    name: { required },
    password: { required },
};

const submitted = ref(false);

const v$ = useVuelidate(rules, state);

const authStore = useAuthStore();

function handleSubmit(isFormValid: boolean) {
  submitted.value = true;

  if (!isFormValid) {
      return;
  }

  authStore.login(state.name, state.password)
    .catch(error => alert(error));
}

</script>

<template>
  <main>
    <div class="card">
      <h3>Login</h3>
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
              <div class="p-float-label">
                  <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" />
                  <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Name</label>
              </div>
              <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
          </div>
          <div class="field">
              <div class="p-float-label">
                  <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" :feedback="false" toggleMask />
                  <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password</label>
              </div>
              <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
          </div>
          <Button type="submit" label="Submit" class="button" />
          <div class="link">
            <RouterLink to="/register">Create account</RouterLink>
          </div>
      </form>
    </div>
  </main>
</template>

<style lang="scss" scoped>
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
  .link {
    margin-top: 1rem;
  }
}

@media screen and (max-width: 960px) {
  .card {
      width: 80%;
  }
}
</style>
