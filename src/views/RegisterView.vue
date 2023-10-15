<template>
    <div class="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
  <h2 class="text-2xl font-bold pb-5">SignUp</h2>
  <form @submit.prevent="onSubmit" >
    <div class="mb-4">
      <label for="username" class="block mb-2 text-sm font-medium"> Username</label>
      <InputText type="text" v-model="username" :error="errors['username']"></InputText>

      
    </div>


    <div class="mb-4">
      <label for="first name" class="block mb-2 text-sm font-medium">First name</label>
      <InputText type="text" v-model="firstname" :error="errors['firstname']"></InputText>

      
    </div>
    <div class="mb-4">
      <label for="last name" class="block mb-2 text-sm font-medium">Last name</label>
      <InputText type="text" v-model="lastname" :error="errors['lastname']"></InputText>

      
    </div>
    <div class="mb-4">
      <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
      <InputText type="text" v-model="email" :error="errors['email']"></InputText>

    </div>
    <div class="mb-4">
      <label for="password" class="block mb-2 text-sm font-medium">Your password</label>
    <InputText type="password" v-model="password" :error="errors['password']"></InputText>
    </div>
    <div>
      <p class="text-red-500 pb-5"></p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <button
        type="submit"
        class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
      >
        Register
      </button>
      <div class="flex items-center text-sm">
        <p>Already have an account?</p>
        <p class="underline cursor-pointer ml-1">Sign in</p>
      </div>
    </div>
  </form>
</div>
</template>
<script setup lang="ts">
import InputText from '@/components/InputText.vue';
import * as yup from 'yup'
//import { ref } from 'vue'
import { useField, useForm } from 'vee-validate';
import { useAuthStore } from '@/stores/auth'
import router from '@/router';
import { useMessageStore  } from '@/stores/message';
const messageStore = useMessageStore()
const authStore = useAuthStore()
const validationSchema = yup.object({
    username: yup.string().required('The username is required'),
    firstname: yup.string().required('The first name is required'),
    lastname: yup.string().required('The last name is required'),
    email: yup.string().email('Invalid email').required('The email is required'),
    password: yup.string().required('The password is required')
})
const { errors, handleSubmit } = useForm ({
    validationSchema,
    initialValues: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    }
})
const { value: username } = useField<string>('username')
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const onSubmit = handleSubmit((values) => {
    authStore.register(values.username, values.firstname, values.lastname, values.email, values.password)
    .then(() => {
        router.push({ name: 'login' })
    }).catch(() => {
        messageStore.updateMessage('could not register')
        setTimeout(() => {
            messageStore.resetMessage()
        })
    })
})
</script>