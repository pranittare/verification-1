import { getDatabase, ref, onValue } from "firebase/database";



export const getFormData = (pincode, formId) => {
    setTimeout(() => {
        const db = getDatabase()
        const formRef = ref(db, `form/${pincode}/${formId}`)
        onValue(formRef, (snapshot) => {
            // console.log(snapshot.val());
            if(snapshot)
            return snapshot.val()
        })

    },500)
}