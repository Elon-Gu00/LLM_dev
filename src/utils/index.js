export async function toSHA256(str) {
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)))).map(byte => byte.toString(16).padStart(2, '0')).join('')
}

export function identityToChinese(str) {
    if (str === "student") return "学生"
    if (str === "teacher") return "教师"
    if (str === "administrator") return "管理员"
    return null
}

export function numberToLetter(number, upper = true) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    if (upper) {
        return letters[number % 26]
    }
    else {
        return letters[number % 26].toLowerCase()
    }
}

export function questionTypeToChinese(type) {
    if (type === 'choice') return "选择题"
    if (type === 'fill-blank') return "填空题"
    if (type === 'essay') return "问答题"
    if (type === 'programming') return "编程题"
    return null
}