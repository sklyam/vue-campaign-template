<script setup>
// Simple mode — no vue-router dependency.
// Duration check redirects to ComingView / EndView automatically.
import { ref } from 'vue'
import duration from '@/utils/duration'

import HomeView from '@/views/index.vue'
import ComingView from '@/views/event-info/ComingView.vue'
import EndView from '@/views/event-info/EndView.vue'

const status = duration.validDuration()
const initialView = status === 'before' ? 'coming' : status === 'after' ? 'end' : 'home'

const currentView = ref(initialView)
const views = {
  home: HomeView,
  coming: ComingView,
  end: EndView,
}
</script>

<template>
  <div id="root">
    <component :is="views[currentView]" />
  </div>
</template>
