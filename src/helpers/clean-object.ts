
const numbers = ["equipmentId", "code", "workOrderId", "managerId", "invoiceId", "recordedById", 'paymentId', "contractId", "visitId", "commercialId", "customerCategoryId", "equipmentCategoryId", "categoryId", "benefitId", "customerId", "siteId", "id", "userId", "targetUserId", "openedById"]
const decimals = ["amount", "price", "taxPrice"]

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
    const parsed: any = {}
    const cleaned = cleanObject(object)
    Object.keys(cleaned).forEach((key: any) => {

        if (numbers.includes(key) && object[key] !== null) {
            try {
                parsed[key] = parseInt(object[key]);
            } catch (e) { }
        }
        else if (decimals.includes(key)) {
            try {
                parsed[key] = parseFloat(object[key]);
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
    const parsed: any = {}
    object.forEach((value: any, key: any) => {
        if (numbers.includes(key)) {
            try {
                parsed[key] = parseInt(value);
            } catch (e) { }
        }
        else if (decimals.includes(key)) {
            try {
                parsed[key] = parseFloat(value);
            } catch (e) { }
        }
        else if (value == "true" || value == "false") {
            parsed[key] = value == "true" ? true : false
        }

        else if (key === "search" && value.length < 1) {

        }
        else {
            parsed[key] = value
        }

    });

    return parsed
} 