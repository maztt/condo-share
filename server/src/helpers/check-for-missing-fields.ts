export const checkForMissingFields = (request: any, args: string[]) => {
    const fields = [...args]
    const missingFields = []
    for (const field of fields) {
        if (!(field in request)) {
            missingFields.push(` ${field}`)
        }
    }
    if (missingFields.length > 0) {
        return missingFields.join(",")
    }
}
