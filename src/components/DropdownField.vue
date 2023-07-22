<template>
     <div class="input-select-container" >
        <img v-if="iconName" :src="require('@/assets/' + iconName + '.png')" alt="icon">
        <select class="form-select" @change="e => $emit('update:modelValue', e.target.value)" >
            <slot></slot>
        </select>
     </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';

    const $emit = defineEmits(['update:modelValue']);

    defineProps({
        modelValue: String,
        iconName: {
            type: String,
        }
    });

</script>

<style lang="scss">
    @use '../scss/partials' as pp;
   

    .input-select-container {
        border: 1px solid pp.$dark-grey;
        height: 4.8em;
        border-radius: .8em;
        padding-left: 2em;
        padding-right: 1em;
        display: flex;
        align-items: center;
        column-gap: .5rem;

        .form-select {
            width: 100%;
            border: none;
            outline: none;

            
        }


        &:focus, &:active, &:hover {
            border: 1px solid pp.$purple;
            box-shadow: 0px 0px 6px 0px pp.$purple;
        }
    }
</style>


<docs lang="md">
  Dropdown Field

  ```jsx
    <DropdownField>
        <option>Value 1</option>
        <option>Value 2</option>
        <option>Value 3</option>
        <option>Value 4</option>
    </DropdownField>
  ```
</docs>