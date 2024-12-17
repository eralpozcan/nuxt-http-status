<script setup>
const { OK, NOT_FOUND } = useHttpStatus()
const response = await $fetch('/api/status')
</script>

<template>
  <div>
    <h1>HTTP Status Codes Test</h1>
    <p>OK: {{ OK }}</p>
    <p>NOT_FOUND: {{ NOT_FOUND }}</p>
    <p>Check the console for API response.</p>
    <p> API Response: {{ response }}</p>
  </div>
</template>
