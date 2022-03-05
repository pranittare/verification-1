import { getDatabase, ref, onValue } from "firebase/database";



export const getFormData = (pincode, formId) => {
    const promise  = new Promise((resolve, reject) => {
        const db = getDatabase()
        const formRef = ref(db, `form/${pincode}/${formId}`)
        onValue(formRef, (snapshot) => {
            console.log(snapshot.val());
            // if(snapshot)
            resolve(snapshot.val())
        })

    })
    return promise
}