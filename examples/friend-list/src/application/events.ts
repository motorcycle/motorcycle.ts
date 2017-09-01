import { Disposable, Scheduler, Sink, Stream } from '@motorcycle/types'

import { curry2 } from '167'

export const events: EventsArity2 = curry2<any, any, any>(function(
  type: any,
  target: any,
  options: any = {}
): any {
  return new Events(type, target, options)
})

export interface EventsArity2 {
  <Type extends keyof ElementEventMap = keyof ElementEventMap>(type: Type, target: Element, options?: EventListenerOptions): Stream<ElementEventMap[Type]>
  <Type extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(type: Type, target: HTMLElement, options?: EventListenerOptions): Stream<HTMLElementEventMap[Type]>
  <Type extends keyof DocumentEventMap = keyof DocumentEventMap>(type: Type, target: Document, options?: AddEventListenerOptions): Stream<DocumentEventMap[Type]>
  <Type extends keyof WindowEventMap = keyof WindowEventMap>(type: Type, target: Window, options?: AddEventListenerOptions): Stream<WindowEventMap[Type]>
  <Type extends keyof HTMLBodyElementEventMap = keyof HTMLBodyElementEventMap>(type: Type, target: HTMLBodyElement, options?: EventListenerOptions): Stream<HTMLBodyElementEventMap[Type]>
  <Type extends keyof HTMLFrameElementEventMap = keyof HTMLFrameElementEventMap>(type: Type, target: HTMLFrameElement, options?: EventListenerOptions): Stream<HTMLFrameElementEventMap[Type]>
  <Type extends keyof HTMLFrameSetElementEventMap = keyof HTMLFrameSetElementEventMap>(type: Type, target: HTMLFrameElement, option?: EventListenerOrEventListenerObject): Stream<HTMLFrameSetElementEventMap[Type]>
  <Type extends keyof HTMLIFrameElementEventMap = keyof HTMLIFrameElementEventMap>(type: Type, target: HTMLIFrameElement, options?: EventListenerOptions): Stream<HTMLIFrameElementEventMap[Type]>
  <Type extends keyof HTMLMarqueeElementEventMap = keyof HTMLMarqueeElementEventMap>(type: Type, target: HTMLMarqueeElement, options?: EventListenerOptions): Stream<HTMLMarqueeElementEventMap[Type]>
  <Type extends keyof HTMLMediaElementEventMap = keyof HTMLMediaElementEventMap>(type: Type, target: HTMLMediaElement, options?: EventListenerOptions): Stream<HTMLMediaElementEventMap[Type]>
  <Type extends keyof HTMLVideoElementEventMap = keyof HTMLVideoElementEventMap>(type: Type, target: HTMLVideoElement, options?: EventListenerOptions): Stream<HTMLVideoElementEventMap[Type]>
  <Type extends keyof SVGElementEventMap = keyof SVGElementEventMap>(type: Type, target: SVGElement, options?: EventListenerOptions): Stream<SVGElementEventMap[Type]>

  <Type extends keyof ElementEventMap = keyof ElementEventMap>(type: Type): (target: Element, options?: EventListenerOptions) => Stream<ElementEventMap[Type]>
  <Type extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(type: Type): (target: HTMLElement, options?: EventListenerOptions) => Stream<HTMLElementEventMap[Type]>
  <Type extends keyof DocumentEventMap = keyof DocumentEventMap>(type: Type): (target: Document, options?: AddEventListenerOptions) => Stream<DocumentEventMap[Type]>
  <Type extends keyof WindowEventMap = keyof WindowEventMap>(type: Type): (target: Window, options?: AddEventListenerOptions) => Stream<WindowEventMap[Type]>
  <Type extends keyof HTMLBodyElementEventMap = keyof HTMLBodyElementEventMap>(type: Type): (target: HTMLBodyElement, options?: EventListenerOptions) => Stream<HTMLBodyElementEventMap[Type]>
  <Type extends keyof HTMLFrameElementEventMap = keyof HTMLFrameElementEventMap>(type: Type): (target: HTMLFrameElement, options?: EventListenerOptions) => Stream<HTMLFrameElementEventMap[Type]>
  <Type extends keyof HTMLFrameSetElementEventMap = keyof HTMLFrameSetElementEventMap>(type: Type): (target: HTMLFrameElement, option?: EventListenerOrEventListenerObject) => Stream<HTMLFrameSetElementEventMap[Type]>
  <Type extends keyof HTMLIFrameElementEventMap = keyof HTMLIFrameElementEventMap>(type: Type): (target: HTMLIFrameElement, options?: EventListenerOptions) => Stream<HTMLIFrameElementEventMap[Type]>
  <Type extends keyof HTMLMarqueeElementEventMap = keyof HTMLMarqueeElementEventMap>(type: Type): (target: HTMLMarqueeElement, options?: EventListenerOptions) => Stream<HTMLMarqueeElementEventMap[Type]>
  <Type extends keyof HTMLMediaElementEventMap = keyof HTMLMediaElementEventMap>(type: Type): (target: HTMLMediaElement, options?: EventListenerOptions) => Stream<HTMLMediaElementEventMap[Type]>
  <Type extends keyof HTMLVideoElementEventMap = keyof HTMLVideoElementEventMap>(type: Type): (target: HTMLVideoElement, options?: EventListenerOptions) => Stream<HTMLVideoElementEventMap[Type]>
  <Type extends keyof SVGElementEventMap = keyof SVGElementEventMap>(type: Type): (target: SVGElement, options?: EventListenerOptions) => Stream<SVGElementEventMap[Type]>
}

class Events<Ev extends Event> implements Stream<Ev> {
  private eventType: string
  private element: EventTarget
  private options: AddEventListenerOptions

  constructor(eventType: string, element: EventTarget, options: AddEventListenerOptions) {
    this.eventType = eventType
    this.element = element
    this.options = options
  }

  public run(sink: Sink<Ev>, scheduler: Scheduler): Disposable {
    const { eventType, element, options: { capture } } = this

    const listener = (event: Ev) => sink.event(scheduler.now(), event)

    const dispose = () => element.removeEventListener(eventType, listener, capture)

    element.addEventListener(eventType, listener, capture)

    return { dispose }
  }
}