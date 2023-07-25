<template>
    <a :href="link" target="__blank" class="preview-button" :class="{ 'preview-button--white-variant': isVariant }" :style="{ backgroundColor: bgColor }">
       <div class="preview-button__logo-wrapper">
        <img :src="require('@/assets/logos/' + buttonType + '.svg')" alt="Preview button logo" class="preview-button__logo">
        <p class="preview-button__name">{{ name }}</p>
       </div>

       <svg class="preview-button__nav-icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.666748 5.33355V6.66688H8.66675L5.00008 10.3335L5.94675 11.2802L11.2267 6.00022L5.94675 0.720215L5.00008 1.66688L8.66675 5.33355H0.666748Z" fill="white"/>
       </svg>
    </a>
</template>

<script setup>
    import { defineProps, ref } from 'vue';


    const props = defineProps({
        buttonType: {
            validator(value) {
                return ["github", "frontendmentor", "twitter", "linkedin", "youtube", "facebook", "devto", "codewars", "freecodecamp", "gitlab", "hashnode", "stackoverflow", "twitch"].includes(value);
            }
        },
        link: String
    })

    const button_states = {
        github: {
            color: '#1A1A1A',
            name: 'GitHub',
        },
        frontendmentor: {
            color: '#fff',
            name: "Frontend Mentor",
            borderColor: '#D9D9D9',
            textColor: '#333333'
        },
        Twitter: {
            color: '#43B7E9',
            name: "Twitter",
        },
        linkedin: {
            color: '#2D68FF',
            name: "LinkedIn",
        },
        youtube: {
            color: '#EE3939',
            name: "YouTube",
        },
        facebook: {
            color: '#2442AC',
            name: 'Facebook'
        },
        twitch: {
            color: '#EE3FC8',
            name: 'Twitch'
        },
        devto: {
            color: '#333333',
            name: 'Dev.to'
        },
        codewars: {
            color: '#8A1A50',
            name: 'Codewars'
        },
        freecodecamp: {
            color: '#302267',
            name: 'freeCodeCamp'
        },
        gitlab: {
            color: '#EB4925',
            name: 'GitLab'
        },
        hashnode: {
            color: '#0330D1',
            name: 'HashNode'
        },
        stackoverflow: {
            color: '#EC7100',
            name: 'Stack Overflow'
        }
    }


    const bgColor = ref(button_states[props.buttonType].color);
    const name = ref(button_states[props.buttonType].name);

    const isVariant = ref(Object.hasOwn(button_states[props.buttonType], "borderColor") && Object.hasOwn(button_states[props.buttonType], "textColor") ) 


</script>

<style lang="scss">
    @use '../scss/partials';
    .preview-button {
        width: 23.7rem;
        height: 5.6rem;
        border-radius: 8px;
        display: flex;
        padding: 1.6rem 2rem;
        justify-content: space-between;
        text-decoration: none;

        &__name {
            @include partials.medium-body;
            color: partials.$white;
            margin: 0;
        }

        &__logo{
            width: 2rem;
            height: 2rem;

            &-wrapper{
                display: flex;
                column-gap: .8rem;
            }
        }

        &__nav-icon {
            width: 1.6rem;
            height: 1.6rem;
            margin-top: .3rem
        }

        &--white-variant {
            border: 1px solid#d9d9d9;

            .preview-button__name {
                color: #333;
            }

            .preview-button__nav-icon {
                filter: partials.$grey-filter;
            }

        }

    }
</style>