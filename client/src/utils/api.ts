const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5029/api'

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  })

  const rawBody = await response.text()
  const data = rawBody ? (JSON.parse(rawBody) as T & { message?: string; title?: string }) : null

  if (!response.ok) {
    throw new Error(data?.message || data?.title || 'Something went wrong.')
  }

  return data as T
}
