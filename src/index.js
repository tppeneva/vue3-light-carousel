import Vue3LightCarousel from './components/Vue3LightCarousel.vue';

export default {
  install: (app, options) => {
    app.component('Vue3LightCarousel', Vue3LightCarousel);
  },
};
