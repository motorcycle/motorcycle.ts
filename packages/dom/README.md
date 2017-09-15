# @motorcycle/dom -- 16.1.0

Declarative, functional, reactive abstractions for the DOM

## Get it
```sh
yarn add @motorcycle/dom
# or
npm install --save @motorcycle/dom
```

## API Documentation

All functions are curried!

#### DomSource

<p>

A DOM source interface for objects to declaratively query the DOM.

</p>


```typescript

interface DomSource {
  query(cssSelector: CssSelector): DomSource
  elements<El extends Element = Element>(): Stream<ReadonlyArray<El>>
  events<Ev extends Event = Event>(eventType: StandardEvents, options?: EventListenerOptions): Stream<Ev>
  cssSelectors(): ReadonlyArray<CssSelector>
}

```


#### DomSource.cssSelectors(): ReadonlyArray\<CssSelector\>

<p>

Retrieves a list of all previously queried CSS selectors.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
const queriedDomSource = domSource.query(`.myCssSelector`)
const cssSelectors = queriedDomSource.cssSelectors()

console.log(cssSelectors[0]) // .myCssSelector
```

</details>

<details>
  <summary>See the code</summary>

```typescript

cssSelectors(): ReadonlyArray<CssSelector>
}

export type CssSelector = string

```

</details>

<hr />


#### DomSource.elements\<El extends Element = Element\>(): Stream\<ReadonlyArray\<El\>\>

<p>

Retrieves a stream of a list of elements matching previous queries.

NOTE: Elements will emit every single time the DOM is updated.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
const queriedDomSource = domSource.query(`.myCssSelector`)
const elements$ = queriedDomSource.elements()
```

</details>

<details>
  <summary>See the code</summary>

```typescript

elements(): Stream<ReadonlyArray<A>>

```

</details>

<hr />


#### DomSource.events\<Ev extends Event = Event\>(eventType: StandardEvents, options?: EventListenerOptions): Stream\<Ev\>

<p>

Retrieves a stream of events from elements matching previous queries.

`DomSource.events` optionally takes a second parameter of `EventListernerOptions`,
which specifies whether event listeners will listen to events during the 
capturing phase. If not provided, all event listeners will use bubbling phase.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
const queriedDomSource = domSource.query(`.myCssSelector`)
const clickEvent$: Stream<MouseEvent> = queriedDomSource.events<MouseEvent>('click')
```

</details>

<details>
  <summary>See the code</summary>

```typescript

events<Ev extends B = B>(eventType: StandardEvents, options?: EventListenerOptions): Stream<Ev>

```

</details>

<hr />


#### DomSource.query(cssSelector: CssSelector): DomSource

<p>

Queries for elements and events for a specified CSS selector.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
const queriedDomSource = domSource.query(`.myCssSelector`)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

query<C extends A = A>(cssSelector: CssSelector): DomSource<C, B>

```

</details>

<hr />


#### HistoryEffect

<p>



</p>


```typescript

export type HistoryEffect = (history: History) => void

```


#### HistorySinks

<p>



</p>


```typescript

export type HistorySinks = {
  readonly history$: Stream<HistoryEffect>
}

```


#### HistorySources

<p>



</p>


```typescript

export type HistorySources<State = any> = {
  readonly location$: Stream<Readonly<Location>>
  readonly state$: Stream<State>
}

```


#### StandardEvents

<p>

Standard event types defined by MDN. All browser should have these 
implemented the same.

</p>


```typescript

export type StandardEvents =
// name -    Event Types
 | 'abort' // UIEvent, ProgressEvent, Event
 | 'afterprint' // Event;
 | 'animationend' // AnimationEvent
 | 'animationiteration' // AnimationEvent
 | 'animationstart' // AnimationEvent
 | 'audioprocess' // AudioProcessingEvent
 | 'audioend' // Event
 | 'audiostart' // Event
 | 'beforprint' // Event
 | 'beforeunload' // BeforeUnloadEvent
 | 'beginEvent' // TimeEvent
 | 'blocked' // Event
 | 'blur' // FocusEvent
 | 'boundary' // SpeechsynthesisEvent
 | 'cached' // Event
 | 'canplay' // Event
 | 'canplaythrough' // Event
 | 'change' // Event
 | 'chargingchange' // Event
 | 'chargingtimechange' // Event
 | 'checking' // Event
 | 'click' // MouseEvent
 | 'close' // Event
 | 'complete' // Event, OfflineAudioCompletionEvent
 | 'compositionend' // CompositionEvent
 | 'compositionstart' // CompositionEvent
 | 'compositionupdate' // CompositionEvent
 | 'contextmenu' // MoustEvent
 | 'copy' // ClipboardEvent
 | 'cut' // ClipboardEvent
 | 'dblclick' // MouseEvent
 | 'devicechange' // Event
 | 'devicelight' // DeviceLightEvent
 | 'devicemotion' // DeviceMotionEvent
 | 'deviceorientation' // DeviceOrientationEvent
 | 'deviceproximity' // DeviceProximityEvent
 | 'dischargingtimechange' // Event
 | 'DOMActivate' // UIEvent
 | 'DOMAttributeNameChanged' // MutationNameEvent
 | 'DOMAttrModified' // Mutationevent
 | 'DOMCharacterDataModified' // MutationEvent
 | 'DOMContentLoaded' // Event
 | 'DOMElementNamedChanged' // MutationNameEvent
 | 'DOMNodeInserted' // MutationEvent
 | 'DOMNodeInsertedIntoDocument' // MutationEvent
 | 'DOMNodeRemoved' // MutationEvent
 | 'DOMNodeRemovedFromDocument' // MutationEvent
 | 'DOMSubtreeModified' // MutationEvent
 | 'downloaded' // Event
 | 'drag' // DragEvent
 | 'dragend' // DragEvent
 | 'dragenter' // DragEvent
 | 'dragleave' // DragEvent
 | 'dragover' // DragEvent
 | 'dragstart' // DragEvent
 | 'drop' // DragEvent
 | 'durationchange' // Event
 | 'emptied' // Event
 | 'end' // Event, SpeechSynthesisEvent
 | 'ended' // Event
 | 'endEvent' // TimeEvent
 | 'error' // UIEvent | ProgressEvent | Event
 | 'focus' // FocusEvent
 | 'fullscreenchange' // Event
 | 'fullscreenerror' // Event
 | 'gamepadconnected' // GamepadEvent
 | 'gamepaddisconnected' // GamepadEvent
 | 'gotpointercapture' // PointerEvent
 | 'hashchange' // HashChangEvent
 | 'lostpointercapture' // PointerEvent
 | 'input' // event
 | 'invalid' // Event
 | 'keydown' // KeyboardEvent
 | 'keypress' // KeyboardEvent
 | 'keyup' // KeyboardEvent
 | 'languagechange' // Event
 | 'levelchange' // Event
 | 'load' // UIEvent, ProgressEvent
 | 'loadeddata' // Event
 | 'loadedmetadata' // Event
 | 'loadend' // ProgressEvent
 | 'loadstart' // ProgressEvent
 | 'mark' // SpeechSynthesisEvent
 | 'message' // MessageEvent, ServiceWorkerMessageEvent, ExtendableMessageEvent
 | 'mousedown' // MouseEvent
 | 'mouseenter' // MouseEvent
 | 'mouseleave' // MouseEvent
 | 'mousemove' // MouseEvent
 | 'mouseout' // MouseEvent
 | 'mouseover' // Mouseevent
 | 'nomatch' // SpeechRecognitionEvent
 | 'notificationclick' // NotificationEvent
 | 'noupdate' // event
 | 'obsolete' // Event
 | 'offline' // event
 | 'online' // Event
 | 'open' // event
 | 'orientationchange' // Event
 | 'pagehide' // PageTransitionEvent
 | 'pageshow' // PageTransitionEvent
 | 'paste' // ClipboardEvent
 | 'pause' // Event, SpeechSynthesisEvent
 | 'pointercancel' // PointerEvent
 | 'pointerdown' // PointerEvent
 | 'pointerenter' // PointerEvent
 | 'pointerleave' // PointerEvent
 | 'pointerlockchange' // Event
 | 'pointerlockerror' // Event
 | 'pointermove' // PointerEvent
 | 'pointerout' // PointerEvent
 | 'pointerover' // PointerEvent
 | 'pointerup' // PointerEvent
 | 'play' // Event
 | 'playing' // Event
 | 'popstate' // PopStateEvent
 | 'progress' // ProgressEvent
 | 'push' // PushEvent
 | 'pushsubscriptionchange' // PushEvent
 | 'ratechange' // Event
 | 'readystatechange' // Event
 | 'repeatEvent' // TimeEvent
 | 'reset' // Event
 | 'resize' // UIEvent
 | 'resourcetimingbufferfull' // Performance
 | 'result' // SpeechRecognitionEvent
 | 'resume' // SpeechSynthesisEvent
 | 'scroll' // UIEvent
 | 'seeked' // Event
 | 'seeking' // Event
 | 'select' // UIEvent
 | 'selectstart' // UIEvent
 | 'selectionchange' // Event
 | 'show' // MouseEvent
 | 'soundend' // Event
 | 'soundstart' // Event
 | 'speechend' // Event
 | 'speechstart' // Event
 | 'stalled' // Event
 | 'start' // SpeechSynthesisEvent
 | 'storage' // StorageEvent
 | 'submit' // Event
 | 'success' // Event
 | 'suspend' // Event
 | 'SVGAbort' // SvgEvent
 | 'SVGError' // SvgEvent
 | 'SVGLoad' // SvgEvent
 | 'SVGResize' // SvgEvent
 | 'SVGScroll' // SvgEvent
 | 'SVGUnload' // SvgEvent
 | 'SVGZoom' // SvgEvent
 | 'timeout' // ProgressEvent
 | 'timeupdate' // Event
 | 'touchcancel' // TouchEvent
 | 'touchend' // TouchEvent
 | 'touchenter' // TouchEvent
 | 'touchleave' // TouchEvent
 | 'touchmove' // TouchEvent
 | 'touchstart' // TouchEvent ;
 | 'transitionend' // Transitionevent
 | 'unload' // UIEvent
 | 'updateready' // Event
 | 'upgradeneeded' // Event
 | 'userproximity' // UserProximityEvent
 | 'voiceschanged' // Event
 | 'versionchange' // Event
 | 'visibilitychange' // Event
 | 'volumechange' // Event
 | 'vrdisplayconnected' // Event
 | 'vrdisplaydisconnected' // Event
 | 'vrdisplaypresentchange' // Event
 | 'waiting' // Event
 | 'wheel' // WheelEvent

```


#### createDocumentDomSource(document$: Stream\<Document\>): DocumentDomSource

<p>

Takes in `Stream\<Document\>` and produces a DocumentDomSource.
`Stream\<Document\>` is required and allows for the developer to decide which
events cause the stream to emit.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { createDocumentDomSource } from '@motorcycle/dom'
import { makeDomComponent } from '@motorcycle/mostly-dom'
import { constant } from '@motorcycle/stream'
import { UI } from './UI'

const element = document.querySelector('#app-container') as Element

const Dom = makeDomComponent(element)

function Effects(sinks) {
  const { view$ } = sinks
  
  const document$ = constant(document, view$)

  const { dom } = Dom({ view$ })
  
  return {
    dom,
    document: createDocumentDomSource(document$)
  }
}
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function createDocumentDomSource(document$: Stream<Document>): DomSource<Document, Event> {
  return new DocumentDomSource(document$)
}

```

</details>

<hr />


#### createDomSource(element$: Stream\<Element\>): DomSource

<p>

Takes a stream of DOM Elements an returns a DomSource. This DomSource
makes use of event delegation. 

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { createDomSource } from '@motorcycle/dom'

const dom = createDomSource(element$)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function createDomSource(element$: Stream<Element>): DomSource {
  return new EventDelegationDomSource(element$, [])
}

```

</details>

<hr />


#### elements\<A = Element, B = Event\>\>(dom: DomSource\<A, B\>): Stream\<ReadonlyArray\<A\>\>

<p>

Takes a DomSource and returns a stream of Array of elements matches 
previous queries.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { DomSource, elements } from '@motorcycle/dom'

type Sources = { dom: DomSource } 

function Component(sources: Sources) {
  const { dom } = sources

  const elements$ = elements(dom)

  ...
}
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function elements<A = Element, B = Event>(dom: DomSource<A, B>): Stream<ReadonlyArray<A>> {
  return dom.elements()
}

```

</details>

<hr />


#### event\<A = Element, B = Event\>\>(type: StandardEvents, dom: DomSource\<A, B\>): Stream\<B\>

<p>

Takes an event type and a DomSource and returns a stream of events.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { events } from '@motorcycle/dom'

const click$ = events('click', dom)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export const events: Events = curry2(function<A = Element, B = Event>(
  eventType: StandardEvents,
  dom: DomSource<A, B>
): Stream<B> {
  return dom.events<B>(eventType)
})

export interface Events {
  <A = Element, B = Event>(eventType: StandardEvents, dom: DomSource<A, B>): Stream<B>
  <A = Element, B = Event>(eventType: StandardEvents): (dom: DomSource<A, B>) => Stream<B>
  (eventType: StandardEvents): <A = Element, B = Event>(dom: DomSource<A, B>) => Stream<B>
}

export const abortEvent = events<Element, UIEvent | ProgressEvent | Event>('abort')
export const afterPrintEvent = events<Element, Event>('afterprint')
export const animationEndEvent = events<Element, AnimationEvent>('animationend')
export const animationIterationEvent = events<Element, AnimationEvent>('animationiteration')
export const animationStartEvent = events<Element, AnimationEvent>('animationstart')
export const audioProcessEvent = events<Element, AudioProcessingEvent>('audioprocess')
export const audioEndEvent = events<Element, Event>('audioend')
export const audioStartEvent = events<Element, Event>('audiostart')
export const beforeUnloadEvent = events<Element, BeforeUnloadEvent>('beforeunload')
export const beginEvent = events<Element, Event>('beginEvent')
export const blockedEvent = events<Element, Event>('blocked')
export const blurEvent = events<Element, FocusEvent>('blur')
export const boundaryEvent = events<Element, SpeechSynthesisEvent>('boundary')
export const cachedEvent = events<Element, Event>('cached')
export const canPlayThroughEvent = events<Element, Event>('canplaythrough')
export const changeEvent = events<Element, Event>('change')
export const chargingChangeEvent = events<Element, Event>('chargingchange')
export const chargingTimeChangeEvent = events<Element, Event>('chargingtimechange')
export const checkingEvent = events<Element, Event>('checking')
export const clickEvent = events<Element, MouseEvent>('click')
export const closeEvent = events<Element, Event>('close')
export const completeEvent = events<Element, OfflineAudioCompletionEvent | Event>('complete')
export const compositionEndEvent = events<Element, CompositionEvent>('compositionend')
export const compositionStartEvent = events<Element, CompositionEvent>('compositionstart')
export const compositionUpdateEvent = events<Element, CompositionEvent>('compositionupdate')
export const contextMenuEvent = events<Element, MouseEvent>('contextmenu')
export const copyEvent = events<Element, ClipboardEvent>('copy')
export const cutEvent = events<Element, ClipboardEvent>('cut')
export const dblclickEvent = events<Element, MouseEvent>('dblclick')
export const deviceChangeEvent = events<Element, Event>('devicechange')
export const deviceLightEvent = events<Element, DeviceLightEvent>('devicelight')
export const deviceMotionEvent = events<Element, DeviceMotionEvent>('devicemotion')
export const deviceOrientationEvent = events<Element, DeviceOrientationEvent>('deviceorientation')
export const deviceProximityEvent = events<Element, DeviceMotionEvent>('deviceproximity')
export const dischargingTimeChangeEvent = events<Element, Event>('dischargingtimechange')
export const downloadedEvent = events<Element, Event>('downloaded')
export const dragEvent = events<Element, DragEvent>('drag')
export const dragEndEvent = events<Element, DragEvent>('dragend')
export const dragEnterEvent = events<Element, DragEvent>('dragenter')
export const dragLeaveEvent = events<Element, DragEvent>('dragleave')
export const dragOverEvent = events<Element, DragEvent>('dragover')
export const dragstartEvent = events<Element, DragEvent>('dragstart')
export const dropEvent = events<Element, DragEvent>('drop')
export const durationChangeEvent = events<Element, Event>('durationchange')
export const emptiedEvent = events<Element, Event>('emptied')
export const endEvent = events<Element, Event | SpeechSynthesisEvent>('end')
export const endedEvent = events<Element, Event>('ended')
export const focusEvent = events<Element, FocusEvent>('focus')
export const fullScreenChangeEvent = events<Element, Event>('fullscreenchange')
export const fullScreenErrorEvent = events<Element, Event>('fullscreenerror')
export const gamepadConnectedEvent = events<Element, GamepadEvent>('gamepadconnected')
export const gamepadDisconnectedEvent = events<Element, GamepadEvent>('gamepaddisconnected')
export const hashChangeEvent = events<Element, HashChangeEvent>('hashchange')
export const lostPointerCaptureEvent = events<Element, PointerEvent>('lostpointercapture')
export const inputEvent = events<Element, Event>('input')
export const invalidEvent = events<Element, Event>('invalid')
export const keyDownEvent = events<Element, KeyboardEvent>('keydown')
export const keyPressEvent = events<Element, KeyboardEvent>('keypress')
export const keyUpEvent = events<Element, KeyboardEvent>('keyup')
export const languageChangeEvent = events<Element, Event>('languagechange')
export const levelChangeEvent = events<Element, Event>('levelchange')
export const loadEvent = events<Element, UIEvent | ProgressEvent>('load')
export const loadedDataEvent = events<Element, Event>('loadeddata')
export const loadedMetadataEvent = events<Element, Event>('loadedmetadata')
export const loadEndEvent = events<Element, ProgressEvent>('loadend')
export const loadStartEvent = events<Element, ProgressEvent>('loadstart')
export const markEvent = events<Element, SpeechSynthesisEvent>('mark')
export const messageEvent = events<Element, MessageEvent | ServiceWorkerMessageEvent>('message')
export const mouseDownEvent = events<Element, MouseEvent>('mousedown')
export const mouseEnterEvent = events<Element, MouseEvent>('mouseenter')
export const mouseLeaveEvent = events<Element, MouseEvent>('mouseleave')
export const mouseMoveEvent = events<Element, MouseEvent>('mousemove')
export const mouseOutEvent = events<Element, MouseEvent>('mouseout')
export const mouseOverEvent = events<Element, MouseEvent>('mouseover')
export const noMatchEvent = events<Element, SpeechSynthesisEvent>('nomatch')
export const notificationClickEvent = events<Element, Event>('notificationclick')
export const noUpdateEvent = events<Element, Event>('noupdate')
export const obsoleteEvent = events<Element, Event>('obsolete')
export const offlineEvent = events<Element, Event>('offline')
export const onlineEvent = events<Element, Event>('online')
export const openEvent = events<Element, Event>('open')
export const orientationChangeEvent = events<Element, Event>('orientationchange')
export const pageShowEvent = events<Element, PageTransitionEvent>('pageshow')
export const pasteEvent = events<Element, ClipboardEvent>('paste')
export const pauseEvent = events<Element, Event | SpeechSynthesisEvent>('pause')
export const pointerCancelEvent = events<Element, PointerEvent>('pointercancel')
export const pointerDownEvent = events<Element, PointerEvent>('pointerdown')
export const pointerLockChangeEvent = events<Element, Event>('pointerlockchange')
export const pointerLockErrorEvent = events<Element, Event>('pointerlockerror')
export const pointerMoveEvent = events<Element, PointerEvent>('pointermove')
export const pointerOutEvent = events<Element, PointerEvent>('pointerout')
export const pointerOverEvent = events<Element, PointerEvent>('pointerover')
export const pointerUpEvent = events<Element, PointerEvent>('pointerup')
export const playEvent = events<Element, Event>('play')
export const playingEvent = events<Element, Event>('playing')
export const popStateEvent = events<Element, PopStateEvent>('popstate')
export const progressEvent = events<Element, ProgressEvent>('progress')
export const pushEvent = events<Element, Event>('push')
export const pushSubscriptionChangeEvent = events<Element, Event>('pushsubscriptionchange')
export const rateChangeEvent = events<Element, Event>('ratechange')
export const readyStateChangeEvent = events<Element, Event>('readystatechange')
export const resetEvent = events<Element, Event>('reset')
export const resizeEvent = events<Element, UIEvent>('resize')
export const resourceTimingBufferFullEvent = events<Element, Event>('resourcetimingbufferfull')
export const resultEvent = events<Element, Event>('result')
export const resumeEvent = events<Element, SpeechSynthesisEvent>('resume')
export const scrollEvent = events<Element, UIEvent>('scroll')
export const seekedEvent = events<Element, Event>('seeked')
export const seekingEvent = events<Element, Event>('seeking')
export const selectEvent = events<Element, UIEvent>('select')
export const selectStartEvent = events<Element, UIEvent>('selectstart')
export const selectionChangeEvent = events<Element, Event>('selectionchange')
export const showEvent = events<Element, MouseEvent>('show')
export const soundEndEvent = events<Element, Event>('soundend')
export const soundStartEvent = events<Element, Event>('soundstart')
export const speechEndEvent = events<Element, Event>('speechend')
export const stalledEvent = events<Element, Event>('stalled')
export const startEvent = events<Element, SpeechSynthesisEvent>('start')
export const storageEvent = events<Element, StorageEvent>('storage')
export const submitEvent = events<Element, Event>('submit')
export const successEvent = events<Element, Event>('success')
export const suspendEvent = events<Element, Event>('suspend')
export const timeoutEvent = events<Element, ProgressEvent>('timeout')
export const timeUpdateEvent = events<Element, Event>('timeupdate')
export const touchCancelEvent = events<Element, TouchEvent>('touchcancel')
export const touchEndEvent = events<Element, TouchEvent>('touchend')
export const touchEnterEvent = events<Element, TouchEvent>('touchenter')
export const touchLeaveEvent = events<Element, TouchEvent>('touchleave')
export const touchMoveEvent = events<Element, TouchEvent>('touchmove')
export const touchStartEvent = events<Element, TouchEvent>('touchstart')
export const transitionEndEvent = events<Element, TransitionEvent>('transitionend')
export const unloadEvent = events<Element, UIEvent>('unload')
export const updateReadyEvent = events<Element, Event>('updateready')
export const upgradeNeededEvent = events<Element, Event>('upgradeneeded')
export const userProximityEvent = events<Element, Event>('userproximity')
export const voicesChangedEvent = events<Element, Event>('voiceschanged')
export const versionChangeEvent = events<Element, Event>('versionchange')
export const visibilityChangeEvent = events<Element, Event>('visibilitychange')
export const volumeChangeEvent = events<Element, Event>('volumechange')
export const vrDisplayConnectedEvent = events<Element, Event>('vrdisplayconnected')
export const vrDisplayDisconnectedEvent = events<Element, Event>('vrdisplaydisconnected')
export const waitingEvent = events<Element, Event>('waiting')
export const wheelEvent = events<Element, WheelEvent>('wheel')

```

</details>

<hr />


#### makeHistoryComponent\<State = any\>(location: Location, history: History): EffectfulComponent\<HistorySinks, HistorySources\<State\>\>

<p>

Given implementations of the `Location` and `History` interfaces, it returns
an EffectfulComponent function which facilitates performing side-effects with 
the history API.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { run } from '@motorcycle/run'
import { makeDomComponent, makeHistoryComponent } from '@motorcycle/dom'
import { UI } from './ui'

const rootElementSelector = '#app'
const element = document.querySelector(rootElementSelector)

if (!element) throw new Error(`Unable to find element by '${rootElementSelector}'`)

const Dom = makeDomComponent(element)
const History = makeHistoryComponent(location, history)

function Effects(sinks) {
  return {
    ...Dom(sinks),
    ...History(sinks),
  }
}

run(UI, Effects)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function makeHistoryComponent<State = any>(
  location: Location,
  history: History
): EffectfulComponent<HistorySinks, HistorySources<State>> {
  const popState$: Stream<PopStateEvent> =
    typeof window === void 0 ? empty() : new EventStream('popstate', window, {})

  return function History(sinks: HistorySinks): HistorySources {
    const { history$ } = sinks

    const performHistoryEffect$ = multicast(tap(historyEffect => historyEffect(history), history$))
    const updateSignal$ = multicast(merge<any>(performHistoryEffect$, popState$))

    const location$ = hold(startWith(location, constant(location, updateSignal$)))
    const state$ = hold(
      map(({ state }) => state, startWith(history, constant(history, updateSignal$)))
    )

    drain(performHistoryEffect$)

    return { location$, state$ }
  }
}

```

</details>

<hr />


#### query\<A, B, C\>(cssSelector: CssSelector, domSource: DomSource\<A, B\>): DomSource\<C, B\>

<p>

A curried function for building more specific queries for elements.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { DomSource, query, events } from '@motorcycle/dom'

type Sources = { dom: DomSource }

function Component(sources: Sources) {
  const { dom } = sources

  const button: DomSource = query('button', dom)
  const event$ = events('click', button)

  ...
}
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export const query: Query = curry2(function queryWrapper<A = Element, B = Event, C extends A = A>(
  cssSelector: CssSelector,
  domSource: DomSource<A, B>
): DomSource<C, B> {
  return domSource.query<C>(cssSelector)
})

export interface Query {
  <A = Element, B = Event, C = Element>(
    cssSelector: CssSelector,
    domSource: DomSource<A, B>
  ): DomSource<C, B>
  <A = Element, B = Event, C = Element>(cssSelector: CssSelector): (
    domSource: DomSource<A, B>
  ) => DomSource<C, B>
  (cssSelector: CssSelector): <A = Element, B = Event, C = Element>(
    domSource: DomSource<A, B>
  ) => DomSource<C, B>
}

```

</details>

<hr />


#### useCapture\<A = Element, B = Event\>(dom: DomSource\<A, B\>): DomSource\<A, B\>

<p>

Creates a new DomSource that will default to using 
capture when using `events()`.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { useCapture, events } from '@motorcycle/dom'

export function Component(sources) {
  const { dom } = sources

  const click$ = events('click', useCapture(dom))

  ...
}
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function useCapture<A = Element, B = Event>(dom: DomSource<A, B>): DomSource<A, B> {
  const useCaptureDomSource: DomSource<A, B> = {
    query(cssSelector: CssSelector): DomSource<A, B> {
      return dom.query(cssSelector)
    },

    elements(): Stream<ReadonlyArray<A>> {
      return dom.elements()
    },

    events<Ev extends B = B>(
      eventType: StandardEvents,
      options: EventListenerOptions = { capture: true }
    ): Stream<Ev> {
      return dom.events(eventType, options)
    },

    cssSelectors(): ReadonlyArray<CssSelector> {
      return dom.cssSelectors()
    },
  }

  return useCaptureDomSource
}

```

</details>

<hr />
