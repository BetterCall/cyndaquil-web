
export const cleanObject = (object: any): { [k: string]: any; } => {
    const cleaned: any = {}
    Object.keys(object).forEach((key) => {
        if (object[key] !== null && object[key] !== "" && object[key] !== "-") {
            cleaned[key] = object[key]
        }
    });

    return cleaned
}

export const parseParams = (object: any) => {


    const numbers = ["managerId", "categoryId", "benefitId", "customerId", "siteId", "id", "userId", "amount"]
    const parsed: any = {}
    Object.keys(object).forEach((key: any) => {

        console.log(key)
        console.log(object[key])

        if (numbers.includes(key) && object[key]) {
            try {
                parsed[key] = parseInt(object[key]);
            } catch (e) { }
        }
        else if (key === "search" && object[key].length < 1) {

        }

        else if (key === "floor") {
            if (object[key].toLowerCase() === "rdc") {
                parsed[key] = 0
            } else {
                parsed[key] = parseInt(object[key]);
            }
        }

        else if (key !== "__typename") {
            parsed[key] = object[key];
        }

    });
    return parsed
}

export const parseSearchParams = (object: any) => {
    const numbers = ["categoryId", "benefitId", "customerId", "managerId", "siteId", "id", "userId", "amount"]
    const parsed: any = {}
    object.forEach((value: any, key: any) => {
        if (numbers.includes(key)) {
            try {
                parsed[key] = parseInt(value);
            } catch (e) { }
        }
        else if (key === "search" && value.length < 3) {

        }
        else {
            parsed[key] = value
        }

    });

    return parsed
} 