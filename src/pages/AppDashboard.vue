<template>
    <div class="dashboard-container">
        <AppNavBar />

        <div class="dashboard-container__customizer">
            <div class="dashboard-container__header">
                <h1 class="dashboard-container__title">Customize your links</h1>
                <p class="dashboard-container__subtitle">
                    Add/edit/remove links below and then share all your profiles with the world!
                </p>

                <AppButton class="dashboard-container__addlink" :button-type="'secondary'" @click="push(INIT_NEW_LINK)">+ Add New Link</AppButton>

            </div>
            <div class="dashboard-container__empty" v-if="values.links.length == 0">
                <img class="dashboard-container__empty-icon" src="@/assets/empty.svg" alt="empty state icon">
                <h1 class="dashboard-container__empty-title">Let’s get you started</h1>
                <p class="dashboard-container__empty-message">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
            </div>

            <div class="dashboard-container__links" v-else>
                <div class="dashboard-container__links-wrapper" v-for="(field, idx) in fields" :key="field.key">
                    <div class="dashboard-container__link-header">
                        <div class="dashboard-container__link-header-left">
                            <svg class="dashboard-container__link-header-left-icon" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="12" height="1" fill="#737373"/>
                                <rect y="5" width="12" height="1" fill="#737373"/>
                            </svg>

                            <p class="dashboard-container__link-header-left-title">Link #{{ idx + 1 }}</p>
                        </div>

                        <a class="dashboard-container__link-header-right" @click="remove(idx)">Remove</a>
                    </div>
                    <div class="dashboard-container__link-form">
                        <div class="dashboard-container__link-form-group">
                            <label class="dashboard-container__link-form-label">Platform</label>
                            <select v-model="field.value.platform" class="dashboard-container__link-form-input" >
                                <option value="null">Please Select Platform </option>
                                <option v-for="(platform, idx) in platforms" :key="idx" :value="platform.value">
                                    {{ platform.name }}
                                </option>
                            </select>
                        </div>
                        <div class="dashboard-container__link-form-group">
                            <label class="dashboard-container__link-form-label">Link</label>
                            <input v-model="field.value.link" class="dashboard-container__link-form-input" type="text"  />
                        </div>
                    </div>
                </div>

            </div>
            <div class="dashboard-container__save-wrapper">
                <AppButton @click="onSubmit" class="dashboard-container__save" :disabled="values.links.length == 0">Save</AppButton>
            </div>

        </div>
    </div>
</template>

<script setup>
    import AppNavBar from '@/components/AppNavBar.vue';
    import AppButton from '@/components/AppButton.vue';
    import { reactive, toRaw, watch, onMounted } from 'vue';
    import * as yup from 'yup';
    import { useForm, useFieldArray } from 'vee-validate';
    import useLinkStore from '@/store/useLinkStore';

    const links = useLinkStore();

    onMounted(() => {
        resetForm({ values: {links: links.links}})
    })




    const platforms = reactive([
        {
            name: 'GitHub',
            value: 'github'
        },
        {
            name: 'Frontend Mentor',
            value: 'frontendmentor'
        },
        {
            name: 'twitter',
            value: 'Twitter'
        }, 
        {
            name: 'LinkedIn',
            value: 'linkedin'
        },
        {
            name: 'YouTube',
            value: 'youtube'
        },
        {
            name: 'Facebook',
            value: 'facebook'
        }, 
        {
            name: 'Dev.to',
            value: 'devto'
        }, 
        {
            name: 'Twitch',
            value: 'twitch'
        }, 
        {
            name: 'Codewars',
            value: 'codewars'
        },
        {
            name: 'FreeCodeCamp',
            value: 'freecodecamp'
        },
        {
            name: 'GitLab',
            value: 'gitlab'
        },
        {
            name: 'HashNode',
            value: 'hashnode'
        },
        {
            name: 'Stack Overflow',
            value: 'stackoverflow'
        }
    ]);

    const INIT_NEW_LINK = {
        id: null,
        userId: null,
        platform: "",
        link: ""
    }

    const validationSchema = yup.object().shape({
        links: yup.array().of(
            yup.object().shape({
                platform: yup.string().required(),
                link: yup.string().required()
            })
        ).strict()
    })


    const {  handleSubmit, values, resetForm } = useForm({ validationSchema, initialValues:{ links: [] } });


    const { fields, push, remove } = useFieldArray('links');

    watch(links.links, (newLink) => {
        resetForm({ values: { links: toRaw(newLink) } })

    })


    const onSubmit = handleSubmit(async values => {
        await links.updateLinks({ updatedLinks: values.links })
    })
    
</script>

<style lang="scss">
    @use '../scss/partials';


    .dashboard-container {
        width: 100%;
        height: 100vh;
        background-color: partials.$grey-light !important;

        &__customizer {
            @include partials.flex-column;
            margin: 1.6rem 1.6rem;
            background: white;
            border-radius: 8px;
            height: 85%;
        }

        &__empty-icon {
            width: 12.48rem;
            height: 8rem;
        }

        &__empty-title {
            @include partials.small-header;
            margin-top: 2.4rem;
            margin-left: -.8rem;
        }

        &__empty-message {
            @include partials.medium-body;
            margin-top: 2.4rem;
        }

        &__header {
            padding: 1.6rem;
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


        &__empty {
            margin: 1.6rem;
            height: 37.7rem;
            background: partials.$grey-light;
            border-radius: 8px;
            padding: 0 2rem;
            @include partials.flex-row-center-all-col;
        }


        &__save-wrapper {
            border-top: 1px solid partials.$grey-normal;
            height: 7.9rem;
            display: flex;
            justify-content: center;
            padding: 1.6rem 0;
            margin-top: auto;
        }

        &__save {
            width: 31.1rem;
            height: 4.6rem;
        }

        &__links {
            padding: 0 2rem;
            margin-top: 1.6rem;
            height: 37.7rem;
            overflow-y: scroll;


            &-wrapper {
                width: 100%;
                height: 22.8rem;
                border-radius: 12px;
                background: partials.$grey-light;
                margin-bottom: 2.4rem;
                padding: 2rem;
            }
        }

        &__link {

            &-header {
                width: 100%;
                height: 2.4rem;
                display: flex;
                justify-content: space-between;
    
                &-left {
                    display: flex;
                    column-gap: .8rem;
    
                    &-title {
                        margin: 0;
                        @include partials.medium-body;
                        font-weight: bold;
                    }
    
                    &-icon {
                        margin-top: .7rem;
                    }

                    
                }

                &-right  {
                    @include partials.medium-body;
                    cursor: pointer;
                }

            }

            &-form {
                margin-top: 1.2rem;
                display: flex;
                flex-direction: column;
                row-gap: 1.2rem;

                &-label {
                    @include partials.small-body-dark;
                }

                &-group {
                   display: flex;
                   flex-direction: column;
                   row-gap: .3rem;
                }
            }

            &-form-input {
                width: 100%;
                height: 4.8rem;
                background: partials.$white;
                border-radius: 8px;
                border: 1px solid partials.$grey-normal;
                padding-left: .8rem;
                padding-right: .8rem;
            }
        }
        
    }
</style>