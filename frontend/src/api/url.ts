export function apiUrl(path: string): string {
    if (import.meta.env.PROD) {
        return `/api/${path}`
    } else {
        return `http://localhost:8081/${path}`
    }
}

export function authApiUrl(path: string): string {
    if (import.meta.env.PROD) {
        return `/api/auth/${path}`
    } else {
        return `http://localhost:8080/${path}`
    }
}
