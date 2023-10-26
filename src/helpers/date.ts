export const formatHour = (base: string | null) => {
    if (!base) return
    const splited = base?.split(':')
    console.log({ base, splited })
    console.log(splited)
    return `${splited[0].replace('null', "Journée")}${splited[1] ? `${splited}h` : ""}`

} 