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
