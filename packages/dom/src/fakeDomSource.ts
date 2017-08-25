import { CssSelector, DomSource, StandardEvents } from './'

import { Stream } from '@motorcycle/types'
import { empty } from '@motorcycle/stream'

export function fakeDomSource<A, B>(config: FakeConfig<A, B>): DomSource<A, B> {
  return new FakeDomSource<A, B>(config, [])
}

export type FakeConfig<A, B> = FakeEvents<A, B> & FakeElements<A>

export interface FakeElements<A> {
  readonly elements?: Stream<ReadonlyArray<A>>
}

export interface FakeEvents<A, B> {
  readonly [key: string]: Stream<ReadonlyArray<A>> | Stream<B> | FakeConfig<A, B>
}

class FakeDomSource<A, B> implements DomSource<A, B> {
  private _config: FakeConfig<A, B>
  private _cssSelectors: ReadonlyArray<CssSelector>

  constructor(config: FakeConfig<A, B>, cssSelectors: ReadonlyArray<CssSelector>) {
    this._config = config
    this._cssSelectors = cssSelectors
  }

  public query<C = A>(cssSelector: CssSelector): DomSource<C, B> {
    const nestedConfig = (this._config[cssSelector] || {}) as FakeConfig<C, B>

    return new FakeDomSource<C, B>(nestedConfig, this._cssSelectors.concat(cssSelector.trim()))
  }

  public elements(): Stream<ReadonlyArray<A>> {
    return this._config.elements || empty()
  }

  public events(eventType: StandardEvents) {
    const config = this._cssSelectors.reduce(
      (config, selector) => config[selector] || {},
      this._config
    ) as FakeConfig<A, B>

    return (config[eventType] as Stream<B>) || empty()
  }

  public cssSelectors(): ReadonlyArray<CssSelector> {
    return this._cssSelectors
  }
}
