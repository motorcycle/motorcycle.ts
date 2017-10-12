# @motorcycle/mostly-html -- 1.0.0

Server-side rendering for Motorcycle.ts

## Get it
```sh
yarn add @motorcycle/mostly-html
# or
npm install --save @motorcycle/mostly-html
```

## API Documentation

All functions are curried!

#### 

<p>



</p>


```typescript

export type HtmlSources<A = Element, B = Event> = {
  readonly html$: Stream<HtmlString>
  readonly dom: DomSource<A, B>
}

```


#### Html\<A = Element, B = Event\>(sinks: HtmlSinks): HtmlSources\<A, B\>

<p>

Renders mostly-dom VNodes into HTML for server-side rendering.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { run } from '@motorcycle/run'
import { Html, HtmlSources, HtmlSinks } from '@motorcycle/mostly-html'
import { UI } from './UI'
import { observe } from '@motorcycle/stream'

const { sources: { html$ } } = run<HtmlSources, HtmlSinks>(UI, Html)

observe((html: string) => { /* Do something with html *\/ }, html$)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function Html<A = Element, B = Event>(sinks: HtmlSinks): HtmlSources<A, B> {
  const { view$ } = sinks

  const html$ = hold(map(toHtml, view$))
  const dom = new HtmlDomSource<A, B>([])

  return { dom, html$ }
}

```

</details>

<hr />


#### HtmlSinks

<p>



</p>


```typescript

export type HtmlSinks = {
  readonly view$: Stream<VNode>
}

```
