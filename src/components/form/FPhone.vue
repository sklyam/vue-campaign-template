<script setup>
import { computed, ref } from 'vue'
import { countryPhone } from '@/constants/country-phone'

const props = defineProps({
  toggle: { type: Boolean, require: false, default: false },
  countryCode: { type: String, require: false, default: '+852' },
})

const currentCountry = ref(props.countryCode)

const phonePattern = computed(
  () =>
    `[${countryPhone[currentCountry.value].pattern}]{${
      countryPhone[currentCountry.value].strLen
    }}`,
)
const phoneLength = computed(
  () => `${countryPhone[currentCountry.value].strLen}`,
)

const targetPhone = ref('')

function selectCode() {
  if (targetPhone.value) {
    targetPhone.value = targetPhone.value.slice(0, phoneLength.value)
  }
}

const getPhone = () => {
  const tempPhone = {
    phone: '',
  }

  tempPhone.phone = targetPhone.value
  if (props.toggle) {
    tempPhone.countryCode = currentCountry.value
  }

  return tempPhone
}

defineExpose({
  getPhone,
})
</script>

<template>
  <div class="tf-field">
    <select
      v-if="props.toggle"
      v-model="currentCountry"
      class="tfb-rspace"
      @change="selectCode"
    >
      <option
        v-for="(cc, key) in Object.keys(countryPhone)"
        :key="key"
        :value="cc"
      >
        {{ cc }}
      </option>
    </select>
    <input
      id="phone"
      v-model="targetPhone"
      type="tel"
      class=""
      name="phone"
      required
      :pattern="phonePattern"
      :maxlength="phoneLength"
    />
  </div>
</template>
