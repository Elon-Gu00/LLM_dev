export async function toSHA256(str) {
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)))).map(byte => byte.toString(16).padStart(2, '0')).join('')
}

export function identityToChinese(str) {
    if (str === "student") return "学生"
    if (str === "teacher") return "教师"
    if (str === "administrator") return "管理员"
    return null
}