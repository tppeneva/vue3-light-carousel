# vue3-light-carousel

<h1>vue3-light-carousel</h1>
A simple carousel slider for Vue 3 with slide and navigation customization options.

## Quick Start

```
$ npm install vue3-light-carousel
```

## Usage

Import component and css styles:

```vue
//main.ts import { createApp } from 'vue' import App from './App.vue' import
Vue3LightCarousel from
'../node_modules/vue3-light-carousel/dist/vue3-light-carousel.mjs' import
"../node_modules/vue3-light-carousel/dist/style.css" createApp(App)
.use(Vue3LightCarousel) .mount('#app')
```

```vue
//Component.vue
<script setup lang="ts">
const items = [];
</script>

<template>
  <Vue3LightCarousel
    v-if="items"
    :showNavigation="true"
    :items="items"
    navigationStyles=""
    transitionStyles=""
    innerStyles=""
    :perPage="1"
    :gap="20"
    buttonStyles=""
  >
    <template v-slot:slideItem="{ slideItem }">
      <!-- insert and style slides view -->
    </template>
    <template v-slot:v3l-carousel__icon-prev>
      <!-- insert and style icon -->
    </template>
    <template v-slot:v3l-carousel__icon-next>
      <!-- insert and style icon -->
    </template>
  </Vue3LightCarousel>
</template>

<style scoped></style>
```

## Props

The component accepts the following props:

- items: [{}] | Accepts and array of objects/items to display.
- showNavigation: boolean |
  - Default true, shows navigation buttons to navigate left/right. Could be styled with the buttonStyles prop.
  - If false, creates an array of dots navigation that could be styled with the navigationStyles prop.
- perPage: number | Number of items to display.
- gap: number | Padding between each slide.
- navigationStyles: string | Accepts class names for further customization. Recommended to use with Tailwind.
- buttonStyles: string | Accepts class names for further customization. Recommended to use with Tailwind.
- transitionStyles: string | Used for styling the transition animation. Accepts class names for further customization. Recommended to use with Tailwind.

## Showcase

https://vue3-light-carousel.netlify.app/
