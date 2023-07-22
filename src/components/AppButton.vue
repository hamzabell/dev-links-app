<template>
  <button :class="props.class" :bind="$attrs" :data-type="buttonType">
    <!--@slot use slot to place button content-->
    <slot></slot>
  </button>
</template>
<script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    class: String,
    /**
     * The Button Type
     * @values primary, secondary
     */
    buttonType: {
      validator(value) {
        return ['primary', 'secondary'].includes(value)
      },
      default: 'primary'
    }
  })
 
  
</script>


<style lang="scss">
  @use '../scss/partials' as pp;
  

  button {
    min-height: 4.6rem;
    background-color: pp.$purple;
    color: pp.$white;
    outline: none;
    border: none;
    border-radius: .8em;
    cursor: pointer;
    padding: 0 10px 0 10px;

    &:focus {
      background: pp.$purple-hover;
    }

    &:disabled {
      opacity: 0.6;
    }

    &[data-type="secondary"] {
      background: transparent;
      border: 1px solid pp.$purple;
      color: pp.$purple;

      &:focus {
        background: pp.$purple-light;
      }


    }

  }
</style>

<docs lang="md">
  This is an example of the app button


  ### Primary Buttons

  #### default
  ```jsx 
    <AppButton>Primary Button</AppButton>
  ```
  #### disabled
  ```jsx 
    <AppButton disabled>Primary Button</AppButton>
  ```

  ### Secondary Buttons

  #### default
  ```jsx 
    <AppButton buttonType="secondary">Secondary Button</AppButton>
  ```


  #### disbaled
  ```jsx 
    <AppButton buttonType="secondary" disabled>Secondary Button</AppButton>
  ```




</docs>