export const combinedData = (agents, forms) => {
    let allCombined = []
    const objkeys = Object.keys(agents)
    const formKeys = Object.keys(forms)
    let formarray = []
    for (let j = 0; j < formKeys.length; j++) {
        const element1 = formKeys[j];
        let form = forms[element1]
        let newform = Object.keys(form)
        for (let index = 0; index < newform.length; index++) {
            const element2 = newform[index];
            let single = form[element2]
            formarray.push(single)
            // console.log('form', single)

        }

    }
    for (let index = 0; index < objkeys.length; index++) {
        const element = objkeys[index];
        let agent = agents[element]
        // console.log('agent', agent)
        let claimed = 0
        let submitted = 0
        for (let j = 0; j < formarray.length; j++) {
            const form = formarray[j];
            if (agent.userId === form.selected) {
                if (form.submitted) {
                    submitted++
                } else if (form.claimed) {
                    claimed++
                }
                // console.log('match', agent, element1)

            }
        }
        if (agent.userId) {
            agent.claimed = claimed
            agent.submitted = submitted
            allCombined.push(agent)
        }

    }
    return allCombined

}