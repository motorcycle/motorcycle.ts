import { FetchRequest, Url } from './types'

export function get(url: Url, options: RequestInit = {}): FetchRequest {
  return { url, options: { ...options, method: 'GET' } }
}

export function post(url: Url, options: RequestInit = {}): FetchRequest {
  return { url, options: { ...options, method: 'POST' } }
}

export function put(url: Url, options: RequestInit = {}): FetchRequest {
  return { url, options: { ...options, method: 'PUT' } }
}

export function del(url: Url, options: RequestInit = {}): FetchRequest {
  return { url, options: { ...options, method: 'DELETE' } }
}
