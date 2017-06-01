import { id } from '../../function'
import { chain } from '../chain'
import { UnnestArity1 } from './types'

export const unnest: UnnestArity1 = chain(id) as any as UnnestArity1
