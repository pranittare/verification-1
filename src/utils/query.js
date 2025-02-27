import React from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from "../App";
const storage = React.lazy(() => import('../index'));

// console.log('store', store.getState())
const branch = storage?.store?.getState()?.branch

const getQueryData = async (q) => {
    try {
        let value = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            value.push(doc.data())
        });
        console.log('value', value)
        storage?.store?.getState().dispatch({ type: 'OLDCASES', data: value })
        return value
    } catch (err) {
        console.log('err', err)
    }
    return
}
export const databaseUpdateQueryExactSingle = async (from, what) => {
    const q = query(collection(db, "forms/"), where(`${from}`, '==', `${what}`), where('branch', '==', `${branch ? branch : 'branch-1'}`));
    return getQueryData(q)
}
export const databaseUpdateQueryExactMultiple = async (from1, what1, from2, what2) => {
    const q = query(collection(db, "forms/"), where(`${from1}`, '==', `${what1}`), where(`${from2}`, '==', `${what2}`), where('branch', '==', `${branch ? branch : 'branch-1'}`));
    return getQueryData(q)
}
export const databaseUpdateQueryRangeSingle = async (from, what) => {
    const q = query(collection(db, "forms/"), where(`${from}`, '>=', what), where('branch', '==', `${branch ? branch : 'branch-1'}`));
    return getQueryData(q)
}
export const databaseUpdateQueryRangeMultiple = async (from1, what1, from2, what2) => {
    const q = query(collection(db, "forms/"), where(`${from1}`, '>=', what1), where(`${from2}`, '<=', what2), where('branch', '==', `${branch ? branch : 'branch-1'}`));
    return getQueryData(q)
}
export const databaseUpdateQueryCasesToday = async () => {
    let today = new Date().getTime()
    const q = query(collection(db, "forms/"), where(`tat1`, '>=', today - 86400000), where('branch', '==', `${branch ? branch : 'branch-1'}`));
    return getQueryData(q)
}