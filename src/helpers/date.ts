export const formatHour = (base: string | null) => {
    if (!base) return
    const splited = base?.split(':')
    return `${splited[0]}h${splited[1]}`

} 