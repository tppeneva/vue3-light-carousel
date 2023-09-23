<script setup lang="ts">
import { onMounted, ref } from 'vue';

export interface Props {
  items: [{}];
  showNavigation: boolean;
  perPage: number;
  gap: number;
  navigationStyles: string;
  buttonStyles: string;
  transitionStyles: string;
}

const props = withDefaults(defineProps<Props>(), {
  showNavigation: true,
});

let translateOffset = 0;
let _items = ref<any | null>(null);
let _navItems = ref(0);
let transitioning = false;
let innerStyles = ref({});
let activeSlide = ref(0);

const sliderSlide = ref<any | null>(null);

function getItems() {
  _items.value = props.items;
  _navItems.value = Math.ceil(_items.value.length / props.perPage);
}

function increaseStep() {
  const offsetWidth = sliderSlide.value[0].offsetWidth * props.perPage;
  translateOffset = offsetWidth * (activeSlide.value * 1);
}

function reduceStep() {
  const offsetWidth = sliderSlide.value[0].offsetWidth * props.perPage;
  translateOffset = translateOffset - offsetWidth;
}

function prev() {
  if (transitioning) return;
  transitioning = true;
  activeSlide.value--;
  reduceStep();
  moveSlider();
  transitioning = false;
}

function next() {
  if (transitioning) return;
  transitioning = true;
  activeSlide.value++;
  increaseStep();
  moveSlider();
  transitioning = false;
}

function moveSlider() {
  innerStyles.value = {
    transform: `translateX(-${translateOffset}px)`,
  };
}

function getWidth(): number {
  return 100 / props.perPage;
}

function goToSlide(index: number) {
  if (transitioning) return;
  transitioning = true;
  console.log(index);
  activeSlide.value = index;
  increaseStep();
  moveSlider();
  transitioning = false;
}

onMounted(() => {
  getItems();
  setTimeout(() => {
    moveSlider();
  }, 1000);
});
</script>

<template>
  <div class="v3l-carousel">
    <div
      class="v3l-carousel__track"
      :class="transitionStyles"
      :style="innerStyles"
    >
      <div
        v-for="(item, index) in _items"
        :key="index"
        class="v3l-carousel__slide"
        :class="{ 'v3l-carousel__active-slide': index === activeSlide }"
        ref="sliderSlide"
        :style="{
          'min-width': `${getWidth()}%`,
          'padding-right': `${gap}px`,
        }"
      >
        <slot
          name="slideItem"
          v-bind:slideItem="item"
          v-bind:index="index"
        ></slot>
      </div>
    </div>
    <div
      v-if="showNavigation"
      class="v3l-carousel__navigation"
      :class="navigationStyles"
    >
      <button
        @click="prev()"
        :class="[buttonStyles, { disabled: activeSlide === 0 }]"
      >
        <slot name="v3l-carousel__icon-prev"></slot>
      </button>
      <button
        @click="next()"
        :class="[buttonStyles, { disabled: activeSlide === _navItems - 1 }]"
      >
        <slot name="v3l-carousel__icon-next"></slot>
      </button>
    </div>
    <div
      v-if="!showNavigation"
      class="v3l-carousel__dots"
      :class="navigationStyles"
    >
      <div
        v-for="(item, index) in _navItems"
        :key="index"
        @click="goToSlide(index)"
        class="v3l-carousel__dot"
        :class="[buttonStyles, { active: activeSlide === index }]"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.v3l-carousel {
  overflow: hidden;
}

.v3l-carousel__track {
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
  white-space: nowrap;
}

.v3l-carousel__navigation {
  display: flex;
  justify-content: center;
}

.v3l-carousel__navigation .disabled {
  opacity: 0.5;
  pointer-events: none;
}

.v3l-carousel__dots {
  display: flex;
  justify-content: center;
}

.v3l-carousel__dot {
  cursor: pointer;
  opacity: 0.5;
}

.v3l-carousel__dot.active {
  opacity: 1;
}
</style>
