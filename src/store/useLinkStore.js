import { defineStore } from "pinia";
import { useErrorToast, useSuccessToast } from "@/services/toast.service";
import firebase from "@/services/firebase.service";
import useAuthStore from './useAuthStore';


const LinkStore = defineStore('LinkStore', {
    state: () => ({
        links: []
    }),
    getters: {
        numberOfLinks: (state) => state.links.length,
    },
    actions: {
        async getLinks({ userId }) {
            this.links = [];
            const tableName = 'Link';
            return await new Promise((resolve) => {
                firebase(tableName).getByForeignKey('userId', userId)
                .then(res => {
                    res.forEach(link => this.links.push(link));
                    useSuccessToast("Fetched Linked Successfully!")
                    resolve(true);
                })
                .catch(err => {
                    useErrorToast("An Error Ocurred! Please try again")
                    resolve(err);
                })
            })
        },
        async updateLinks({ updatedLinks }) {
            const tableName = 'Link';
            const auth = useAuthStore();
            return new Promise((resolve, reject) => {
                
                const newLinks = updatedLinks.filter(x => x.id == null);
                const oldLinks = updatedLinks.filter(x => x.id != null);
                const linkMappping = oldLinks.reduce((acc, curr) => ({
                    ...acc,
                    [curr.id]: true
                }), {});

                const linksToBeRemoved = this.links.filter(x => x.id && !linkMappping[x.id])


                // Add New Links
                Promise.all([...newLinks.map(x => firebase(tableName).create({ platform: x.platform, link: x.link, userId: auth.user.id }))]).then(
                    () => useSuccessToast("Linked Added Successfully!")
                )
                .catch(err => {
                    reject(err);
                    useErrorToast('An Error has Occurred!')
                })

                // Remove Links
                Promise.all([...linksToBeRemoved.map(x => firebase(tableName).remove(x.id))]).then(
                    res => { 
                        console.log(res)
                    }
                )
                .catch(err => {
                    reject(err);
                    useErrorToast('An Error has Occurred!')
                });

                // Refetch Links
                (async () => {
                    await this.getLinks({ userId: auth.user.id });
                    resolve(true)
                })();
            })
        }
    },
    persist: true
})


export default LinkStore;