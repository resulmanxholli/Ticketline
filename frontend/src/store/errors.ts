type ErrorBody = { error?: string; details?: Record<string, string[]> }

export type ReadableError = { message: string; fieldErrors: Record<string, string[]> }

export function readError(err: unknown): ReadableError {
  if (typeof err === 'object' && err !== null && 'status' in err) {
    const { status, data } = err as { status: number | string; data?: ErrorBody | null }
    if (status === 'FETCH_ERROR' || (typeof status === 'number' && status >= 500 && !data?.error)) {
      return { message: "Can't reach the server. Is the backend running?", fieldErrors: {} }
    }
    const fieldErrors = data?.details ?? {}
    return {
      message: Object.keys(fieldErrors).length ? 'Please correct the highlighted fields.' : data?.error ?? 'Request failed.',
      fieldErrors,
    }
  }
  return { message: 'Something went wrong. Please try again.', fieldErrors: {} }
}