import { CssSelector, Dom, StandardEventTypes } from './'

import { Stream } from '@motorcycle/types'
import { empty } from '@motorcycle/stream'

export interface FakeDomFrom {
  <A, B>(cfg: FakeConfig<A, B>): FakeDom<A, B>
}

export const fakeDomFrom: FakeDomFrom = <A, B>(cfg: FakeConfig<A, B>) => new FakeDom<A, B>(cfg, [])

export type FakeConfig<A, B> = FakeEvents<A, B> & FakeElements<A>

export interface FakeElements<A> {
  readonly elements?: Stream<ReadonlyArray<A>>
}

export interface FakeEvents<A, B> {
  readonly [k: string]: Stream<ReadonlyArray<A>> | Stream<B> | FakeConfig<A, B>
}

export class FakeDom<A, B> implements Dom<A, B> {
  private _cfg: FakeConfig<A, B>
  private _cs: ReadonlyArray<CssSelector>

  constructor(cfg: FakeConfig<A, B>, cs: ReadonlyArray<CssSelector>) {
    this._cfg = cfg
    this._cs = cs
  }

  public query<C = A>(c: CssSelector): Dom<C, B> {
    const cfg = (this._cfg[c] || {}) as FakeConfig<C, B>

    return new FakeDom<C, B>(cfg, this._cs.concat(c.trim()))
  }

  public elements(): Stream<ReadonlyArray<A>> {
    return this._cfg.elements || empty()
  }

  public event(et: StandardEventTypes) {
    const cfg = this._cs.reduce((cfg, k) => cfg[k] || {}, this._cfg) as FakeConfig<A, B>

    return (cfg[et] as Stream<B>) || empty()
  }

  public cssSelectors(): ReadonlyArray<CssSelector> {
    return this._cs
  }
}
