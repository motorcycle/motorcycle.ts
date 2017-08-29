if (typeof module !== 'undefined') (global as any).fetch = require('node-fetch')

export * from './types'
export * from './Fetch'
export * from './requests'
