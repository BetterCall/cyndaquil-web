
export const cleanObject = (object: any): { [k: string]: any; } => {
    const cleaned: any = {}
    Object.keys(object).forEach((key) => {
        if (object[key] !== null && object[key] !== "") {
            cleaned[key] = object[key]
        }
    });

    return cleaned
}

export const parseParams = (object: any) => {
    const numbers = ["categoryId", "customerId", "siteId", "id"]
    const parsed: any = {}
    object.forEach((value: any, key: string) => {
        if (numbers.includes(key)) {
            try {
                parsed[key] = parseInt(value);
            } catch (e) { console.log(e) }
        }
        else if (key == "search" && value.length < 3) {

        }
        else {
            parsed[key] = value;
        }

    });

    return parsed
} 