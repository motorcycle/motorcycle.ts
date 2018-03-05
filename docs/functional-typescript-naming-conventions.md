# Functional TypeScript naming convention

## Motivation
Giving names in a language that doesn't support function overloading is a challenging task. It is, however, important to follow some standards to avoid naming conflicts, misleading names, and also to maintain a unified style. The following rules were developed to encourage programming in a functional style in TypeScript, but can also be used anywhere else where it makes sense.

## Disclaimer
The following rules are work in progress, and far from being complete, your questions and ideas are welcome. Please leave a comment.

## Goals
- Avoid naming conflicts and misleading names.
- Save developers time to make up names that make sense to everyone.
- Make a line of code to look like an understandable English sentence.
- Improve readability across the application.
- Impose a standard for consistency.

## Main principle
- Use **modal verbs**, **prepositions**, **determiners**,  and **particles** for:
  - *primitives*,
  - *basic manipulations*, and
  - *data transformations*.
- Use **verbs**, **nouns**, **adjectives**, **adverbs** for:
  - *business domain entities*, and
  - *higher level operations*.

## Rules

#### The Default Rule
Any of the following rules can be waived in favor of the default rule:
> a name of a function can be anything as long as it starts with a verb.

So anytime you are having a hard time finding an appropriate rule, feel free to use the default rule instead.

Examples: `requestData`, `isValid`, `canUndo`, `transformToDate`, `parseAsNumber`, `formatInUtc`

#### **toBe...**
A  signal for communicating an intent to the outside code. Something needs to completion, but the component that fires the signal is not capable of doing it. That is why it's delegated to the outside code.

Examples: `toBeRemoved`, `toBeConsideredPetition`

#### **just...**
A signal that fires right after an action that just took place. There is nothing the listening part can do to stop that action from happening because it has finished. The only thing the listening code can do is to acknowledge the fact of the action happened.

Examples: `justScrolled`, `justDisposed`

#### **...From**
A constructor function that builds an object immediately from the passed values without doing any calculations and transformations on them.

Example: `boxFrom(x, y, width, height)`

#### **to...**
A constructor function that builds a new object or objects out of passed values, creating and wiring new objects along the way as necessary.

Example: `toDesktop(settings, repository)`

#### **from...**
A constructor function for a single data type of the module. 

Example: one can create an array using one of the following functions: `fromFew`, `fromOne`, `fromTwo`

#### **outOf...**
A destructuring function for sum-types  (enums, unions, tagged unions) that addresses each possible case with a continuation callback passed as a parameter.

Example:
```typescript
function outOfBoolean<R>(value: boolean, haveTrue: () => R, haveFalse: () => R) : R {
  return value ? haveTrue() : haveFalse()
}
```

#### **via..**
A destructuring function for sum-types (enums, unions, tagged unions) that addresses each possible case with a method of the given resolver object.

Example:
```typescript
enum YesNoMaybe { Yes, No, Maybe }
/** Resolver object interface. */
interface ViaYesNoMaybe<R> {
  caseOfYes(value: YesNoMaybe): R
  caseOfNo(value: YesNoMaybe): R
  caseOfMaybe(value: YesNoMaybe): R
}

/** Destructuring function. */
function viaYesNoMaybe<R>(value: YesNoMaybe, via: ViaYesNoMaybe<R>) {
   switch (value) {
    case YesNoMaybe.Yes: return via.caseOfYes(value)
    case YesNoMaybe.No: return via.caseOfNo(value)
    case YesNoMaybe.Maybe: return via.caseOfMaybe(value)
  }
}

const something = Math.random() > 0.33 ? YesNoMaybe.Yes : (Math.random() > 0.5 ? YesNoMaybe.No : YesNoMaybe.Maybe)
console.log('value: ' + viaYesNoMaybe(something, {
  caseOfYes() { return 'yes' },
  caseOfNo() { return 'no' },
  caseOfMaybe() { return 'maybe') }
}))
```

#### **with...**
A destructuring function which focuses on one single case. It takes a continuation callback for one certain case of what the value can be and another continuation callback for everything else.

Example:
```typescript
function withFirst<A, R>(values: Array<A>, haveFirst: (value: R) => r, haveNone: (reason: string) => R) : R {
  return values.length > 0 ? haveFirst(values[0]) : haveNone('Array is empty.')
}
```

#### **will...**
An asyncronous function that returns a `Promise` or a `Future`.

Example: `willBeSettings`, `willLoadDesktop`

#### **...ToBe**
A value of a `Promise`/`Future` type (or simply a `Promise` or a `Future`).

Example: `settingsTobe.then(settings => { /* ... */ })`

#### **...Over**
A function returning a function closed over the passed values. A closure factory or higher-order function.

Example:
```typescript
function willBeSettingsOver(repository: Repository) {
  return function willBeSettings(userId: string) : Promise<UserSettings> {
     return repository.requestUserSettings(userId)
  }
}
```

#### **...Unsafe**
A function that might crash or provide unexpected results if passed inconsistent arguments. A comment explaining why a function might be unsafe is required. An unsafe function must be accompanied with a safe version of it.

Example:
```typescript
/** UNSAFE: Doesn't check if there is a value at the given key. Might return undefined. */
function atUnsafe<A>(map: { values: { [key: string]: A }, key: string) : A | void {
   return values[key]
}

function at<A>(map: { values: { [key: string]: A }, key: string) : Optional<A> {
  return key in values ? someOf(values[key]) : noneOf<A>('There is nothing at the \'' + key + '\' key.');
}
```

#### **...OrDie**
A function that is expected to throw. A message describing a step that might fail is required.

Example:
```typescript
function atOrDie<A>(values: { [key: string]: A }, key: string, failed: string) : A {
  if (key in values) {
    return values[key]
  } else {
    throw new Error(failed + ' There is no value at the \'' + key + '\' key.')
  }
}
```

#### **always...**
A function returninig a constant.

Example:
```typescript
function alwaysEmptyString() { return '' }
function alwaysFalse() { return false }
function alwaysVoid() : void { return void 0 }
```