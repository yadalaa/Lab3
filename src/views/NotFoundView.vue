<script setup lang="ts">
    defineProps({
        resource:{
            type: String,
            required: true,
            default: 'page'
        }
    })
</script>
<template>
    <h1>Oop!</h1>
    <!-- <h3>The page you're looking for is no here</h3> -->
    <h3>{{ resource }} you're looking for is no here</h3>
    <RouterLink :to="{name: 'event-list'}">Back to home page</RouterLink>
</template>