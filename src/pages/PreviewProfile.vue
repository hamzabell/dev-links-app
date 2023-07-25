<template>
    <div class="preview">
        <div class="preview__action-wrapper">
            <AppButton class="preview__button" :button-type="'secondary'" @click="$router.go(-1)">Back to Editor</AppButton>
            <AppButton class="preview__button">Share Link</AppButton>
        </div>

        <div class="preview__user-links-wrapper">
            <div class="preview__user-details">
                <div class="preview__user-image">
                    <img :src="userImage" alt="User Profile Photo">
                </div>
                <div class="preview__user-info">
                    <h1 class="preview__user-name">{{  auth.user.firstName || "[FirstName]" }}</h1>
    
                    <p class="preview__user-email">{{ auth.user.email || "" }}</p>
                </div>
            </div>
    
            <div class="preview__user-links">
                 <PreviewButton v-for="link in newLinks" :key="link.id" :button-type="link.platform" :link="link.link"/>
            </div>
        </div>

    </div>
    
</template>

<script setup>
    import AppButton from '@/components/AppButton.vue';
    import PreviewButton from '@/components/PreviewButton.vue';
    import { useRouter } from 'vue-router';
    import useLinkStore from '@/store/useLinkStore';
    import useUserStore from '@/store/useAuthStore';
    import { onMounted, ref } from 'vue';
    import placeholder from '@/assets/placeholder';

    const links = useLinkStore();
    const auth = useUserStore();
    const $router = useRouter();

    const newLinks = ref()
    const userImage = ref()


    onMounted(() => {
        userImage.value = auth.user.profileImage ?? placeholder;
        newLinks.value = links.links;
    })
</script>

<style lang="scss">

    @use '../scss/partials';
    .preview {
        &__action-wrapper {
            width: 100%;
            padding: 1.6rem 2.4rem;
            display: flex;
            column-gap: 1.6rem;
            justify-content: center;
        }
        &__button {
            width: 15.95rem;
            height: 4.6rem;
        }
        &__user{
            
        &-details {
            margin-top: 6rem;
            display: flex;
            flex-direction: column;
            align-items: center;
        } 

        &-info {
            margin-top: 2.5rem;
        }

        &-name {
            @include partials.medium-heading;
            text-align: center;
        }

        &-email {
            @include partials.medium-body;
            text-align: center;
            margin-top: .8rem;
        }


        &-image {
            width: 10.4rem;
            height: 10.4rem;
            border-radius: 99px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 4px solid partials.$purple;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: inherit;
                
            }
        
        }
        &-links {
            margin-top: 5.6rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 2rem;
            height: 40rem;
            overflow-y: scroll;
            margin-bottom: 3rem;
        }

      
        }


        @media screen and (min-width: partials.$tablet) {
            background: partials.$grey-light;
            height: 100vh;
            display: flex;
            align-items: center;
            flex-direction: column;
            z-index: 1;
            position: relative;

            &-links {
                overflow-y: hidden ;
            }

            &__action-wrapper {
                align-self: center;
                display: flex;
                justify-content: space-between;
                background: partials.$white;
                width: 80%;
                margin-top: 2.4rem;
                border-radius: 12px;

                &:after {
                    content: '';
                    display: flex;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 35.7rem;
                    background: partials.$purple;
                    z-index: -1;
                    border-bottom-left-radius: 32px;
                    border-bottom-right-radius: 32px;
                }
            }
            &__user-links-wrapper {
                background: partials.$white;
                width: 34.5rem;
                align-self: center;
                border-radius: 24px;
                margin-top: 10.2rem;
                height: 56.9rem;
                overflow-y: scroll ;
            }


            
        }
    }
</style>