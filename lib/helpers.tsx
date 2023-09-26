const objectsToSelectOptions = (data: [index: string, string] | undefined) => {
    if (data == undefined) {
        return []
    }

    const arrayOfObj = Object.entries(data).map((e) => ({
            [e[0]]: e[1]
        }
    ));

    return arrayOfObj?.map(e => {
        const key = Object.keys(e)[0];
        return {
            key: key,
            name: e[key],
            selected: false
        }
    })
}

export default objectsToSelectOptions