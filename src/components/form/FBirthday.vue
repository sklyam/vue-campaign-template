<script setup>
import { ref, computed } from 'vue'

const currentTime = {
  year: new Date().getFullYear() - 0, // change 0 to 18 if adult
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
}

const startYear = 1905
const endYear = currentTime.year
const startMonth = 1
const endMonth = 12
const startDate = 1
const endDate = 31

const selectedBirthday = ref({
  sYYYY: '',
  sMM: '',
  sDD: '',
})

const originDayScale = {
  yyyy: [],
  mm: [],
  dd: [],
}

originDayScale.yyyy = initBirthYearRange()
originDayScale.mm = initBirthMonthRange()
originDayScale.dd = initBirthDateRange()

const birthdayRange = computed(() => {
  const tempBirth = { ...originDayScale }

  let currentMonth = endMonth
  if (selectedBirthday.value.sYYYY == endYear) {
    currentMonth = new Date().getMonth() + 1
  }

  tempBirth.mm = originDayScale.mm.slice(0, currentMonth)

  let currentDate = endDate
  if (selectedBirthday.value.sYYYY && selectedBirthday.value.sMM) {
    currentDate = getEndDateByMonthYear(
      selectedBirthday.value.sYYYY,
      selectedBirthday.value.sMM,
    )
  }
  if (
    selectedBirthday.value.sYYYY == currentTime.year &&
    selectedBirthday.value.sMM == currentTime.month
  ) {
    currentDate = new Date().getDate()
  }

  tempBirth.dd = originDayScale.dd.slice(0, currentDate)

  return tempBirth
})

function initBirthYearRange() {
  return Array.from({ length: endYear - startYear }, (_, i) => endYear - i)
}

function initBirthMonthRange(end = endMonth) {
  return Array.from({ length: end - startMonth + 1 }, (_, i) => i + startMonth)
}

function initBirthDateRange(end = endDate) {
  return Array.from({ length: end - startDate + 1 }, (_, i) => i + startDate)
}

function getEndDateByMonthYear(year, month) {
  return new Date(year, month, 0).getDate()
}

function selectBirth(e) {
  const selectedField = e.target.id
  const selectedValue = e.target.value

  selectedBirthday.value[selectedField] = selectedValue
}

const getBirthday = () => {
  const tempBirth = selectedBirthday.value
  if (!tempBirth.sYYYY || !tempBirth.sMM || !tempBirth.sDD) {
    return ''
  }
  return `${tempBirth.sYYYY}-${tempBirth.sMM.padStart(
    2,
    '0',
  )}-${tempBirth.sDD.padStart(2, '0')}`
}

defineExpose({
  getBirthday,
})
</script>

<template>
  <div class="tf-birth-select">
    <select id="sYYYY" class="tfb-xspace" name="yyyy" @change="selectBirth">
      <option value="" selected disabled>YYYY</option>
      <option
        v-for="(yyyy, key) in birthdayRange.yyyy"
        :key="key"
        :value="yyyy"
      >
        {{ yyyy }}
      </option>
    </select>
    <select id="sMM" class="tfb-xspace" name="mm" @change="selectBirth">
      <option value="" selected disabled>MM</option>
      <option v-for="(mm, key) in birthdayRange.mm" :key="key" :value="mm">
        {{ mm }}
      </option>
    </select>
    <select id="sDD" class="tfb-xspace" name="dd" @change="selectBirth">
      <option value="" selected disabled>DD</option>
      <option v-for="(dd, key) in birthdayRange.dd" :key="key" :value="dd">
        {{ dd }}
      </option>
    </select>
  </div>
</template>

<style scoped>
#sYYYY {
  margin-left: 0;
}
</style>
