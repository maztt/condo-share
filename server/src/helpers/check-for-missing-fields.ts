export const checkForMissingFields = (request: any, args: string[]): Promise<string> => {
    const fields = [...args]
    const missingFields = []
    for (const field of fields) {
        if (!(field in request)) {
            missingFields.push(` ${field}`)
        }
    }
    if (missingFields.length > 0) {
        return Promise.reject(`Please, inform the following fields: ${missingFields.join(",")}.`)
    }
    return Promise.resolve('')
}
