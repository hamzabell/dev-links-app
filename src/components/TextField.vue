<template>
    <div class="input-field-container" :data-error="hasError">
        <img :src="require('@/assets/' + iconName + '.png')" alt="icon" v-if="iconName">
        <input :type="inputType" :bind="$attrs" :placeholder="placeholderText" @input="e => $emit('update:modelValue', e.target.value)">
        <p v-if="hasError">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits  } from 'vue';

 
    const $emit = defineEmits(['update:modelValue'])
    defineProps({
        modelValue: String,
        iconName: {
            type: String,
        },
        inputType: {
            validator(value) {
                return ["text", "password", "number", "email"].includes(value)
            },
            default: 'text'
        },
        errorMessage: {
            type: String,
            default: ''
        },
        hasError: {
            type: Boolean,
            default: false
        },
        placeholderText: String
    });


</script>

<style lang="scss">
    @use '../scss/partials' as pp;

    .input-field-container {
        border: 1px solid pp.$grey-normal;
        height: 4.8em;
        border-radius: 8px;
        padding-left: 2em;
        padding-right: 1em;
        display: flex;
        align-items: center;
        column-gap: .5rem;

        &:focus, &:active, &:hover {
            border: 1px solid pp.$purple;
            box-shadow: 0px 0px 2px 0px rgba(99, 60, 255, 1);
        }

        img {
            object-fit: contain;
        }
        input {
            outline: none;
            border: none;
            width: 100%;
            color: pp.$dark-grey;
        }

        &[data-error='true'] {
            border: 1px solid pp.$red;
            color: pp.$red;

            p {
                font-size: 12px;
                max-width: 19rem;
                width: 13rem;
            }

            input {
                width: 90%;
            }

            &:focus, &:active, &:hover {
                 box-shadow: 0px 0px 2px 0px pp.$red;
            
             }

        }
    }
</style>


<docs lang="md">

  ### Text Field Types
  #### Text
  ```jsx 
    <TextField />
  ```

  #### Password
  ```jsx 
    <TextField inputType="password" />
  ```

  #### Number
  ```jsx 
    <TextField inputType="number"/>
  ```

  ### Text Field States

  #### Error
  ```jsx 
    <TextField  errorMessage="Please check again"/>
  ```
</docs>