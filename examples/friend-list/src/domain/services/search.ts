import { filter, toLowerCase } from '167'

import { Friends } from '../model'

const includes = (query: string = '') => (value: string = '') =>
  toLowerCase(value).includes(toLowerCase(query))

export function search(query: string, friends: Friends): Friends {
  const containsQuery = includes(query)

  return filter(({ name, username }) => containsQuery(name) || containsQuery(username), friends)
}
