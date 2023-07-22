import { useToast } from 'vue-toast-notification';


const toast = useToast();


export function useSuccessToast(message){
    toast.success(message, { position: 'bottom' } )
}

export function useErrorToast(message) {
    toast.error(message, { position: 'bottom' })
}