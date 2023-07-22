<template>
    <div class="container">
        <img class="container__image" src="@/assets/logo.png" alt="">

        <div class="container-form">
            <h1 class="container-form__title">Create Account</h1>
            <h6 class="container-form__description">Let’s get you started sharing your links!</h6>

            <form @submit.prevent="onSubmit" class="container-form__body">
                <div class="form-group">
                    <label class="form-group__label">Email Address</label>
                    <TextField class="form-group__input" :icon-name="'mail'"  v-bind="email" placeholder-text="e.g alex@email.com" input-type="email" :error-message="'Wrong Email!'" :has-error="Boolean(errors.email)" />
                </div>

                <div class="form-group">
                    <label class="form-group__label">Create Password</label>
                    <TextField class="form-group__input" :icon-name="'password'" v-bind="password" placeholder-text="At least 8 characters" input-type="password" :error-message="'Please Check again!'" :has-error="Boolean(errors.password)" />
                </div>

                <div class="form-group">
                    <label class="form-group__label">Confirm Password</label>
                    <TextField class="form-group__input"  :icon-name="'password'" v-bind="confirmPassword" placeholder-text="At least 8 characters" input-type="password" :error-message="'Please Check again!'" :has-error="Boolean(errors.confirmPassword)" />
                </div>

                <p class="container-form__message">Password must contain at least 8 characters</p>

                <AppButton class="container-form__submit" :disabled="!meta.valid || isSubmitting || isLoading"  >Create Account</AppButton>
            </form>

            <div class="container-form__footer">
                    <p class="container-form__footer--message">Don't have an account?</p>
                    <a @click="$router.replace({ name: 'home' })" class="container-form__footer--link">Login</a>
            </div>
        </div>
    </div>
</template>

<script setup>
    import AppButton from '@/components/AppButton.vue';
    import TextField from '@/components/TextField.vue';
    import { ref } from 'vue';


    import { useForm } from 'vee-validate';
    import * as yup from 'yup';
    import { toTypedSchema } from '@vee-validate/yup';
    import { authenticationService  } from '@/services';
    import { useSuccessToast, useErrorToast } from '@/services/toast.service';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const isLoading = ref(false);

    //eslint-disable-next-line
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

    const validationSchema = toTypedSchema(
        yup.object({
            email: yup.string().email().required(),
            password: yup.string().matches(regex).required(),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null]).required()
        })
    );

    const { defineComponentBinds, errors, meta, isSubmitting, handleSubmit } = useForm({ validationSchema });

    const email = defineComponentBinds('email', { validateOnBlur: true });
    const password = defineComponentBinds('password', { validateOnBlur: true });
    const confirmPassword = defineComponentBinds('confirmPassword', { validateOnBlur: true });


    const onSubmit = handleSubmit(values => {
        isLoading.value = true;
        authenticationService().createAccount({ ...values })
            .then(() => {
                router.replace({ name: 'home' })
                useSuccessToast('Account Created!')
            })
            .catch((err) => {
               useErrorToast(`${err}`)
            })
            .finally(() => isLoading.value = false);
    })



</script>


<style lang="scss">
    @use '../scss/partials' as pp;
    @import '../scss/variables.scss';

    .container {
        padding: 5rem 2rem !important;

        .conatiner__image {
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


            &__message {
                @include typography(body-sm);
                margin-bottom: 0;
                margin-top: 0;
                color: pp.$grey;
            }

            &__body {
                @include pp.flex-column;
                row-gap: 2.5rem;
                margin-top: 5rem;


                .form-group {
                    display: flex;
                    flex-direction: column;
                    row-gap: .8rem;


                    &__label {
                        @include typography(body-sm);
                        color: pp.$grey;
                    }

                    &__input {
                        min-width: 28.1rem;
                        height: 4.6rem;
                        padding-left: 1rem;
                    }
                }

                

                /* &__button {
                    margin-top: .1rem;
                } */
            }

            &__footer {
                @include pp.flex-column;
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

    }

</style>