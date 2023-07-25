<template>
    <div class="mobile-preview">
        <div class="mobile-preview__inner-wrapper">
            <div class="mobile-preview__profile">
                <img class="mobile-preview__profile-image" v-if="auth.user.profileImage" :src="auth.user.profileImage" alt="User Image">
                <svg v-else  width="97" height="96" viewBox="0 0 97 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="48.5" cy="48" r="48" fill="#EEEEEE"/>
                </svg>
                <div class="mobile-preview__profile-details">
                    <h6 class="mobile-preview__profile-details-name" v-if="auth.user.firstName">{{ auth.user.firstName }} {{ auth.user.lastName }}</h6>
                    <svg v-else width="161" height="16" viewBox="0 0 161 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" width="160" height="16" rx="8" fill="#EEEEEE"/>
                    </svg>


                    <p class="mobile-preview__profile-details-email" v-if="auth.user.email">{{ auth.user.email }}</p>
                    <svg v-else width="73" height="8" viewBox="0 0 73 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" width="72" height="8" rx="4" fill="#EEEEEE"/>
                    </svg>


                </div>
            </div>


            <div class="mobile-preview__links">
                <div class="mobile-preview__link-wrapper" v-for="(link, idx) in linksList" :key="idx">
                    <PreviewButton class="mobile-preview__link-button" v-if="link" :button-type="link.platform" :link="link.link"/>
                    <svg v-else width="237" height="44" viewBox="0 0 237 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="237" height="44" rx="8" fill="#EEEEEE"/>
                    </svg>


                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import useAuthStore from '@/store/useAuthStore';
    import {  defineProps } from 'vue';
    import PreviewButton from './PreviewButton.vue';

    const auth = useAuthStore();

    defineProps({
        linksList: {
            type: Array,
            default: () => [null, null, null, null, null]
        }
    })

    
</script>

<style lang="scss">
    @use '../scss/partials';
    .mobile-preview {
        width: 30.7rem;
        height: 63.1rem;
        border-radius: 5.3rem;
        border: 1px solid partials.$grey;
        padding: 1.1rem;

        &__inner-wrapper {
            border: 1px solid partials.$grey;
            height: 61.1rem;
            width: 28.5rem;
            border-radius: 5.3rem;
            position: relative;
            padding: 4.3rem 2.3rem;
            display: flex;
            flex-direction: column;

            &::after {
                content: '';
                display: block;
                height: 3rem;
                width: 13.2rem;
                border: 1px solid partials.$grey;
                border-top: 2px solid partials.$white;
                position: absolute;
                top: -1.5px;
                left: 24.6%;
                z-index: 2;
                border-bottom-right-radius: 2rem;
                border-bottom-left-radius: 2rem;
            }
        }

        &__profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 2.5rem;

            &-image {
                width: 9.7rem;
                height: 9.6rem;
                border-radius: 999px;
            }

            &-details {
                display: flex;
                flex-direction: column;
                row-gap: .8rem;
                &-name {
                    @include partials.xs-heading;
                    text-align: center;
                    margin: 0;
                }

                &-email {
                    margin:0;
                    @include partials.regular;

                }
            }
        }

        &__links {
            margin-top: 5.6rem;
            display: flex;
            flex-direction: column;
            row-gap: 2rem;
            overflow-y: scroll ;

        }

        &-link {
            &-button {
                width: 23.7rem;
                height: 4.4rem;
            }
        }
    }

</style>