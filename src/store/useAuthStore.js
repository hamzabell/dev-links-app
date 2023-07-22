import { defineStore } from "pinia";
import { authenticationService } from "@/services";
import { useErrorToast, useSuccessToast  } from "@/services/toast.service";
import useLinkStore from './useLinkStore';
import firebaseService from "@/services/firebase.service";

const AuthStore = defineStore('AuthStore', {
    state: () => {
        return {
            user: null,
            expires_at: null
        }
    },
    getters: {
        isAuthenticated: (state) => Boolean(state.user),
    },
    actions: {
        async login({ email, password }) {
            const  link = useLinkStore();
            return await new Promise((resolve) => {
                authenticationService().login({ email, password }).then(user => {
                    this.user = user;
    
                    // Expires in 2 hours
                    this.expires_at = new Date(new Date().setHours(new Date().getHours() + 2));
                    
                    (async () => {
                        await link.getLinks({ userId: user.id })
                    })()
                    useSuccessToast('Login Successful!');
                    resolve(true);
                })
                .catch(err => {
                    useErrorToast(err);
                    resolve(false);
                })
            })
         },

         async updateUser({ firstName, lastName, profileImage }) {

            const tableName = 'User';
            return await new Promise((resolve, reject) => {
                firebaseService(tableName).update(this.user.id, { 
                    email: this.user.email,
                    firstName,
                    lastName,
                    profileImage
                }).then(() => {
                    useSuccessToast("User Info updated successffully");
                    this.user = { ...this.user, firstName, lastName, profileImage };
                    resolve(this.user);
                })
                .catch(err => {
                    useErrorToast('An Error Occurred!');
                    reject(err)
                })
            })
         },
        logout() {
            this.$reset();
        }
    },
    persist: true
});

export default AuthStore;