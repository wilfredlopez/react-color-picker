export type SelectorClasss = { [key: string]: boolean }

export default function selectClass(classes: [SelectorClasss]) {
    let output = ''

    //ONLY ACCEPTING ONE SelectorClasss
    const el = classes[0]
    for (let key in el) {
        if (el[key]) {
            output += key
        }
    }
    //IF ACCEPTING MORE THAN ONE SelectorClasss
    // for (let i = 0; i < classes.length; i++) {
    //     const el = classes[i]
    //     for (let key in el) {
    //         if (el[key]) {
    //             output += key
    //         }
    //     }
    // }
    return output
}