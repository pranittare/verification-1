import {combinedData} from './utils'
export const onFilter = (e,allData,agents,forms) => {
    let data = allData
    if (e.currentTarget.value) {
        return data.filter(item => {
            if (item[e.currentTarget.name]) {
                let rval = item[e.currentTarget.name].toLocaleLowerCase().includes(e.currentTarget.value)
                return rval
            }
        }
        )
    } else {
      return combinedData(agents, forms)
    }

}