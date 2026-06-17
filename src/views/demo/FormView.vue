<script setup>
import { ref, inject } from 'vue'

import FPhone from '@/components/form/FPhone.vue'
import FBirthday from '@/components/form/FBirthday.vue'
import Loader from '@/components/LoadingComp.vue'

import validation from '@/utils/validation'

const message = inject('$t')

const formBirthday = ref(null)
const formPhone = ref(null)
const isLoading = ref(false)

const formData = ref({
  name: '',
  phone: '',
  email: '',
  birthday: '',
  tc: false,
})

const errData = ref({
  name: '',
  phone: '',
  email: '',
  birthday: '',
  tc: '',
})

function setErrorMsg(field, code) {
  errData.value[field] = code ? message('err')[code] : ''
}

async function submitForm() {
  isLoading.value = true
  // get child component values
  if (formBirthday.value) {
    formData.value.birthday = formBirthday.value.getBirthday()
  }
  if (formPhone.value) {
    const temp = formPhone.value.getPhone()
    formData.value.phone = temp.phone
  }

  // validation
  let valid = true
  Object.entries(formData.value).forEach(([key, val]) => {
    setErrorMsg(key, '')
    if (!val) {
      setErrorMsg(key, `empty_${key}`)
      valid = false
    }
  })

  if (valid) {
    // submit logic
  }
  isLoading.value = false
}
</script>

<template>
  <div class="template-form">
    <div class="tf-header">Form</div>

    <div class="tf-field">
      <label for="name">Name</label>
      <div class="tf-input-field">
        <input id="name" v-model="formData.name" type="text" />
        <div class="tf-err-msg" v-html="errData.name"></div>
      </div>
    </div>

    <div class="tf-field">
      <label for="phone">Phone</label>
      <div class="tf-input-field">
        <FPhone ref="formPhone" :toggle="true" />
        <div class="tf-err-msg" v-html="errData.phone"></div>
      </div>
    </div>

    <div class="tf-field">
      <label for="email">Email</label>
      <div class="tf-input-field">
        <input id="email" v-model="formData.email" type="email" />
        <div class="tf-err-msg" v-html="errData.email"></div>
      </div>
    </div>

    <div class="tf-field">
      <label>Birthday</label>
      <div class="tf-input-field">
        <FBirthday ref="formBirthday" />
        <div class="tf-err-msg" v-html="errData.birthday"></div>
      </div>
    </div>

    <div class="tf-field">
      <input id="tc" v-model="formData.tc" type="checkbox" />
      <label for="tc">Agree to Terms</label>
      <div class="tf-err-msg" v-html="errData.tc"></div>
    </div>

    <button @click="submitForm()">Submit</button>
    <Loader :toggle="isLoading" />
  </div>
</template>
