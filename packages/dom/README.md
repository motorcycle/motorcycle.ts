# @motorcycle/dom -- 11.0.0

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

elements<El extends Element = Element>(): Stream<ReadonlyArray<El>>

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

events<Ev extends Event = Event>(
  eventType: StandardEvents,
  options?: EventListenerOptions
): Stream<Ev>

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

query(cssSelector: CssSelector): DomSource

```

</details>

<hr />


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


#### elements\<El extends Element\>(dom: DomSource): Stream\<ReadonlyArray\<El\>\>

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

export function elements<El extends Element>(dom: DomSource): Stream<ReadonlyArray<El>> {
  return dom.elements<El>()
}

```

</details>

<hr />


#### event\<Ev extends Event\>(type: StandardEvents, dom: DomSource): Stream\<Ev\>

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

export const events: Events = curry2(function<Ev extends Event>(
  eventType: StandardEvents,
  dom: DomSource
): Stream<Ev> {
  return dom.events(eventType)
})

export interface Events {
  <Ev extends Event = Event>(eventType: StandardEvents, dom: DomSource): Stream<Ev>
  <Ev extends Event = Event>(eventType: StandardEvents): (dom: DomSource) => Stream<Ev>
  (eventType: StandardEvents): <Ev extends Event = Event>(dom: DomSource) => Stream<Ev>
}

```

</details>

<hr />


#### query(cssSelector: CssSelector, domSource: DomSource): DomSource

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

export const query: Query = curry2(function queryWrapper(
  cssSelector: CssSelector,
  domSource: DomSource
) {
  return domSource.query(cssSelector)
})

export interface Query {
  (cssSelector: CssSelector, domSource: DomSource): DomSource
  (cssSelector: CssSelector): (domSource: DomSource) => DomSource
}

```

</details>

<hr />
