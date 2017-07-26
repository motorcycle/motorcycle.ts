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
