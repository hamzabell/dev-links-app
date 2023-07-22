import firebase from "@/utils/firebase";
// import { Link, User } from '@/models';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';


const _db = getFirestore(firebase);



export default (tableName) => {
    const selectedCollection = collection(_db, tableName);

    async function create(data) {
        return await new Promise((resolve, reject) => {
            addDoc(selectedCollection, data).then(
                () => resolve(true)
            )
            .catch(() => reject(false))
            
        })
    }

    async function getByForeignKey(key, value) {
        return await new Promise((resolve, reject) => {
            getDocs(selectedCollection).then(res => {
                if (res.empty) {
                    resolve([])
                } else {
                    const result = [];
                    res.forEach(x => {
                        result.push({
                            id: x.id,
                            ...x.data()
                        })
                    });
    
                    const filterResults = result.filter(y => y[key] == value);
    
                    resolve(filterResults);
                }
                
            }).catch(err => {
                reject(err)
            })
        })

    }

    async function getById(id) {
        return await new Promise((resolve, reject) => {
            getDoc(doc(_db, tableName, id))
            .then(res => {
                resolve({
                    id: res.id,
                    ...res.data()
                })
            })
            .catch(err => reject(err))
        })

    } 
    async function update(id, data) {
        return await new Promise((resolve, reject) => {
            updateDoc(doc(_db, tableName, id), data)
            .then(() => {
                resolve(true);
            })  
            .catch(() => reject(false))
        })
    }

    async function remove(id) {
        return await new Promise((resolve, reject) => {
            deleteDoc(doc(_db, tableName, id))
            .then(() => {
                resolve(true)
            })
            .catch(() => reject(false))
        })
    }


    return {
        create,
        getByForeignKey,
        getById,
        update,
        remove
    }
}