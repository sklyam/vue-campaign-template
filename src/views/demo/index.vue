<script setup>
import { RouterLink } from 'vue-router'
import { language, setLanguage } from '@/utils/language'

function changeLang() {
  setLanguage(language.value === 'en' ? 'tc' : 'en')
}
</script>

<template>
  <div class="container">
    <header>
      <nav>
        <RouterLink to="/">{{ $t('nav').home }}</RouterLink>
        <RouterLink to="/form">{{ $t('nav').form }}</RouterLink>
        <RouterLink to="/user/123">{{ $t('nav').user }}</RouterLink>
        <button class="lang-btn" @click="changeLang">
          {{ language }}
        </button>
      </nav>
    </header>
    <div class="page-view">
      <RouterView />
    </div>
  </div>
</template>
