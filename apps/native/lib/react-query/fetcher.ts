type ApiFetchOptions = {
    method?: RequestInit["method"]
    body?: BodyInit | Record<string, unknown> | null
    headers?: HeadersInit
}

export async function apiFetch(url: string, options: ApiFetchOptions = {}) {
    const { method = "GET", body, headers } = options

    const mergedHeaders = new Headers(headers)

    const hasJsonBody =
        body != null &&
        typeof body === "object" &&
        !(body instanceof FormData) &&
        !(body instanceof URLSearchParams) &&
        !(body instanceof Blob) &&
        !(body instanceof ArrayBuffer) &&
        !ArrayBuffer.isView(body)

    if (hasJsonBody && !mergedHeaders.has("Content-Type")) {
        mergedHeaders.set("Content-Type", "application/json")
    }

    const res = await fetch(`${process.env.SERVER_URL}/api${url}`, {
        method,
        headers: mergedHeaders,
        body: hasJsonBody ? JSON.stringify(body) : body ?? undefined,
        credentials: "include"
    })

    if (!res.ok) throw new Error("API error")

    if (res.status === 204) return null

    const rawBody = await res.text()
    if (!rawBody) return null

    return JSON.parse(rawBody)
}