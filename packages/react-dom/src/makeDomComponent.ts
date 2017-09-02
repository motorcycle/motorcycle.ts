import { Component, ReactElement, createElement } from 'react'
import { Disposable, Stream, Time } from '@motorcycle/types'
import { DomSource, createDomSource } from '@motorcycle/dom'
import { constant, hold, scheduler } from '@motorcycle/stream'

import { render } from 'react-dom'

export type VNode<Props = {}> = ReactElement<Props>

export type DomSinks<Props = {}> = Readonly<Record<'view$', Stream<VNode<Props>>>>

export type DomSources = Readonly<Record<'dom', DomSource<Element, Event>>>

/**
 * Takes an element and returns a DOM component function.
 * 
 * @name makeDomComponent(element: Element): (sinks: DomSinks) => DomSources
 * @example
 * import { makeDomComponent, DomSources, DomSinks, VNode, div, button, h1 } from '@motorcycle/react-dom'
 * import { events, query } from '@motorcycle/dom'
 * import { run } from '@motorcycle/run'
 * 
 * const element = document.querySelector('#app')
 * 
 * if (!element) throw new Error('unable to find element')
 * 
 * run(UI, makeDomComponent(element))
 * 
 * function UI(sources: DomSources): DomSinks {
 *   const { dom } = sources
 * 
 *   const click$: Stream<Event> = events('click', query('button'))
 * 
 *   const amount$: Stream<number> = scan(x => x + 1, 0, click$)
 * 
 *   const view$: Stream<VNode> = map(view, amount$)
 * 
 *   return { view$ }
 * }
 * 
 * function view(amount: number) {
 *   return div([
 *     h1(`Clicked ${amount} times`),
 *     button(`Click me`)
 *   ])
 * }
 */
export function makeDomComponent(element: Element) {
  return function Dom(sinks: DomSinks): DomSources {
    const view$ = hold(sinks.view$)

    render(createElement(Container, { view$ }), element)

    const dom = createDomSource(hold(constant(element, view$)))

    return { dom }
  }
}

class Container extends Component<DomSinks, { view: VNode }> {
  private disposable: Disposable = NONE

  componentWillMount() {
    const { view$ } = this.props

    const event = (_: Time, view: VNode) => this.setState({ view })

    this.disposable = view$.run({ event, error: noop, end: noop }, scheduler)
  }

  componentWillUnmount() {
    const { disposable } = this

    this.disposable = NONE

    disposable.dispose()
  }

  render() {
    return (this.state && this.state.view) || createElement('div')
  }
}

const NONE: Disposable = { dispose: noop }

function noop(): void {}
