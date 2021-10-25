import {combinedData} from './utils'
export const onFilter = (e,allData,agents,forms) => {
    let data = allData
    if (e.currentTarget.value) {
        return data.filter(item => {
            if (e.currentTarget.name === 'pincode') {
                // secondary pincode logic
                console.log('item', item)
                let concat = item?.secondary?.map(x => x.pincodes).join(' ')
                let concat1 = `${concat} ${item.pincode}`
                let rval = concat1.includes(e.currentTarget.value)
                return rval
            } else if (item[e.currentTarget.name]) {
                let rval = item[e.currentTarget.name].toLocaleLowerCase().includes(e.currentTarget.value)
                return rval
            }
        }
        )
    } else {
      return combinedData(agents, forms)
    }

}