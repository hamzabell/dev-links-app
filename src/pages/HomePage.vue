<template>
    <div class="container">
        <img class="container__image" src="@/assets/logo.png" alt="">

        <div class="container-form">
            <h1 class="container-form__title">Login</h1>
            <h6 class="container-form__description">Add your details below to get back into the app</h6>

            <form class="container-form__body" @submit.prevent="onSubmit">

                <div class="form-group">
                    <label class="form-group__label" >Email Address</label>
                    <TextField class="form-group__input" v-bind="email" placeholder-text="e.g alex@email.com" input-type="email" :error-message="'Wrong Email!'" :has-error="Boolean(errors.email)" :icon-name="'mail'" />
                </div>

                <div class="form-group">
                    <label class="form-group__label" >Password</label>
                    <TextField class="form-group__input" v-bind="password"  placeholder-text="Enter your Password" input-type="password" :error-message="'Please Check again!'" :has-error="Boolean(errors.password)"  :icon-name="'password'" />
                </div>

                <AppButton class="container-form__submit" :disabled="!meta.valid || isSubmitting || isLoading" >Login</AppButton>
            </form>

            <div class="container-form__footer">
                    <p class="container-form__footer--message">Don't have an account?</p>
                    <a @click="$router.replace({ name: 'signup' })" class="container-form__footer--link">Create an Account</a>
                </div>
        </div>
    </div>
</template>

<script setup >
    import AppButton from '@/components/AppButton.vue';
    import TextField from '@/components/TextField.vue';
    import { ref } from 'vue';

    import { useForm } from 'vee-validate';
    import * as yup from 'yup';
    import { toTypedSchema } from '@vee-validate/yup';

    import useAuthStore from '@/store/useAuthStore';
    import { useRouter  } from 'vue-router';

    const isLoading = ref(false);
    const store = useAuthStore();
    const router = useRouter();


    const validationSchema = toTypedSchema(
        yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(6).required()
        })
    );

    const { defineComponentBinds, errors, meta, isSubmitting, handleSubmit } = useForm({ validationSchema });

    const email = defineComponentBinds('email', { validateOnBlur: true });
    const password = defineComponentBinds('password', { validateOnBlur: true });

    const onSubmit = handleSubmit(async values => {
        isSubmitting.value = true;
        const response = await store.login({ ...values });

        if (response) {
            router.replace({ name: 'dashboard' })
        }
        
        isSubmitting.value = false;
    })
</script>


<style lang="scss">
    @use '../scss/partials' as pp;
    @import '../scss/variables.scss';

    .container {
        padding: 5rem 2rem !important;

        .container__image {
            width: 18.2rem;
            height: 4rem;
        }

        .container-form {
            margin-top: 5rem;
            &__title {
                @include typography(heading-sm, 600);
                margin: 0;
            }
            &__description {
                @include typography(body-md);
                color: pp.$grey;
                margin: 1rem 0;

            }

            &__submit {
                min-width: 28.1rem;
                height: 4.6rem;
                padding-left: 1rem;
            }

            &__body {
                display: flex;
                flex-direction: column;
                row-gap: 2.5rem;
                margin-top: 5rem;

                


                .form-group {
                    display: flex;
                    flex-direction: column;
                    row-gap: .8rem;

                    &__label {
                        @include typography(body-sm);
                        color: pp.$grey;

                        &[data-error='true'] {
                            color: pp.$red;
                        }
                    }

                   
                }

                &__button {
                    margin-top: .5rem;
                }
            }

            &__footer {
                display: flex;
                flex-direction: column;
                align-items: center;

                &--message {
                    @include typography(body-md);
                    margin: 0;
                    margin-top: 2rem;
                    color: pp.$grey;
                }

                &--link {
                    @include typography(body-md);
                    text-decoration: none;
                    margin: 0;
                    margin-top: .5rem;
                    color: pp.$purple;
                }
            }
        }


        @media screen and (min-width: pp.$tablet) {
            background: pp.$grey-light;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100vh;

            &-form {
                background: white;
                padding: 4rem;
                min-width: 47.6rem;
            }
        }

    }

</style>