<template>
    <div class="profile">
        <AppNavBar  class="profile__navbar"/>


        <div class="profile__desktop-wrapper">
            <div class="profile__desktop-previewer">
                <DesktopPreviewer :links-list="linksForPreview" />
            </div>
     
            <div class="profile__customizer">
                <div class="profile__header">
                    <h1 class="profile__title">Profile Details</h1>
                    <p class="profile__subtitle">
                        Add your details to create a personal touch to your profile.
                    </p>
                </div>
    
                <div class="profile__pic-upload">
                    <h5 class="profile__pic-upload-title">Profile Picture</h5>
    
    
                    <div class="profile__pic-upload-action-wrapper">
                        <ImageUpload class="profile__pic-upload-display" @click="openFileExplorer"  v-model="imageUrl"/>
                        <input type="file"  id="upload-image" style="display: none;" accept="image/*" @change="onChangeImage">
        
                        <h6 class="profile__pic-upload-sub-title">Image must be below 1024x1024px. Use PNG or JPG format.</h6>
                    </div>
    
                </div>
    
                <div class="profile__form-wrapper">
                    <div class="profile__form-group">
                        <label class="profile__form-label" >First Name*</label>
                        <input type="text" class="profile__form-input" v-bind="firstName"  placeholder="Ben" />
                    </div>
    
                    <div class="profile__form-group">
                        <label class="profile__form-label">Last Name*</label>
                        <input type="text" class="profile__form-input"  v-bind="lastName" placeholder="Stiller" />
                    </div>
    
                    <div class="profile__form-group">
                        <label class="profile__form-label">Email</label>
                        <input type="text" class="profile__form-input"  v-bind="email" placeholder="e.g alex@email.com" :disabled="true"  />
                    </div>
    
                </div>
                <div class="profile__save-wrapper">
                    <AppButton class="profile__save"  @click="onSubmit">Save</AppButton>
                </div>
    
            </div>
        </div>

    </div>
</template>
<script setup>
    import AppNavBar from '@/components/AppNavBar.vue';
    import AppButton from '@/components/AppButton.vue';
    import ImageUpload from '@/components/ImageUpload.vue';
    import DesktopPreviewer from '@/components/DesktopPreviewer.vue';


    import useAuthStore from '@/store/useAuthStore';
    import useLinkStore from '@/store/useLinkStore';

    import { onMounted, ref } from 'vue';
    import * as yup from 'yup';
    import { toTypedSchema } from '@vee-validate/yup';
    import { useForm } from 'vee-validate';

    const validationSchema = toTypedSchema(yup.object({
        firstName: yup.string(),
        lastName: yup.string(),
        email: yup.string()
    }));

    const imageUrl = ref();
    const links = useLinkStore();

    const linksForPreview = ref([null, null, null, null, null])

    const { defineInputBinds, resetForm, handleSubmit } = useForm({ validationSchema });

    const firstName = defineInputBinds('firstName');
    const lastName = defineInputBinds('lastName');
    const email = defineInputBinds('email');

    const openFileExplorer = () => document.getElementById('upload-image').click();

    const reader = new FileReader();

    reader.onloadend = () => {
        imageUrl.value = reader.result;
    }

    const onChangeImage = (e) => {
        reader.readAsDataURL(e.target.files[0])
    }

    const auth = useAuthStore();

    onMounted(() => {
        imageUrl.value = auth.user.profileImage;

       resetForm({ values: { 
            firstName: auth.user.firstName ?? null,
            lastName: auth.user.lastName ?? null,
            email: auth.user.email ?? null
        }});


        links.links.forEach((link, idx) => {
            if (idx < 5) {
                linksForPreview.value[idx]= link
            }
        })
    })



    const onSubmit = handleSubmit(async values => {
        const profileImage = imageUrl.value;
        const { firstName, lastName } = values;
        await auth.updateUser({ firstName, lastName, profileImage }).then(res => res)
    })

    

</script>

<style lang="scss">
    @use '../scss/partials';


.profile {
    width: 100%;
    height: 100vh;
    background-color: partials.$grey-light !important;
    overflow-y: scroll;

    &__navbar {
        position: fixed;
        top: 0;
        width: 100%;
    }


    &__customizer {
        @include partials.flex-column;
        margin: 1.6rem 1.6rem;
        background: white;
        border-radius: 8px;
        padding: 1.6rem 0;
        
        display: flex;
        justify-content: center;
    }

    &__header {
        margin-left: 1.6rem;
        margin-right: 1.6rem;
    }



    &__addlink {
        height: 4.6rem;
        width: 100%;
        margin-top: 3rem;
    }

    &__title {
        @include partials.small-header;
    }

    &__subtitle {
        @include partials.medium-body;
        margin-top: .8rem;
    }


    &__form-group {
        display:  flex;
        flex-direction: column;
        row-gap: .4rem;
    }

    &__form-input {
        height: 4.8rem;
        background: partials.$white;
        border-radius: 8px;
        border: 1px solid partials.$grey-normal;
        padding-left: .8rem;
        padding-right: .8rem;
        color: partials.$dark-grey;

        &:disabled {
            background: partials.$grey-light;
        }
    }


    &__form-label {
        @include partials.small-body;
    }

    &__pic-upload {
        height: 33.3rem;
        background: partials.$grey-light;
        border-radius: 12px;
        padding: 2rem;
        margin-left: 1.6rem;
        margin-right: 1.6rem;

        &-title {
            @include partials.medium-body;
        }

        &-sub-title {
            @include partials.small-body;
            margin-top: 2.4rem;

        }

        &-display {
            width: 19.3rem;
            height: 19.3rem;
            margin-top: 1.6rem;
        }

    }
    &__form-wrapper {
        height: 27.4rem;
        background: partials.$grey-light;
        border-radius: 12px;
        padding: 2rem;
        margin-top: 2.4rem;

        display: flex;
        flex-direction: column;
        row-gap: 1.2rem;
        margin-bottom: 2.4rem;
        margin-left: 1.6rem;
        margin-right: 1.6rem;


    }

    &__save-wrapper {
        border-top: 1px solid partials.$grey-normal;
        height: 7.9rem;
        display: flex;
        justify-content: center;
        padding: 1.6rem;
        margin-top: auto;
        
    }

    &__save {
        width: 31.1rem;
        height: 4.6rem;
    }

    &__desktop-wrapper {
        margin-top: 9rem;
    }

    &__desktop-previewer {
            display: none;
    }


    @media screen and (min-width: partials.$tablet) {
        &__save {
            &-wrapper {
                justify-content: flex-end;
            }
            width: 9.1rem;
        }

        &__customizer {
            padding: 4rem;
        }

        &__pic-upload {
            display: flex;
            justify-content: space-between;
            min-height: 23.3rem;
            padding: 2rem;

            &-title {
                margin-top: 8.4rem;
            }

            &-action-wrapper {
                display: flex;
                column-gap: 2.4rem;
            }

            &-sub-title {
                width: 21.7rem;
                margin-top: 8.4rem;
            }
        }

        &__form {

            &-group {
                flex-direction: row;
                row-gap: 0;
                justify-content: space-between;
            }

            &-input {
                width: 34.4rem;
            }

            &-label {
                margin-top: 1.2rem;
            }

            &-wrapper {
                height: 20.8rem;
            }

        }
        
    }


    @media screen and (min-width: partials.$desktop) {

        &__customizer {
            width: 80.8rem;
            margin: 0;
        }
        &__desktop {
            &-wrapper {
                display: flex;
                column-gap: 2.4rem;
                justify-content: center;
                padding: 2.4rem;
            }

            &-previewer {
               display: flex;
               justify-content: center;
               align-items: center;
               background: partials.$white;
               width: 56rem;
               height: 83.4rem;
               border-radius: 12px;
               padding: 4rem;
            }
        }
    }
}
</style>