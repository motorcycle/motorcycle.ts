// All events types described at
// https://developer.mozilla.org/en-US/docs/Web/Events

export type ResourceEventTypes = 'cached' | 'error' | 'abort' | 'load' | 'beforeunload' | 'unload'

export type NetworkEventTypes = 'online' | 'offline'

export type FocusEventTypes = 'focus' | 'blur'

export type WebsocketEventTypes = 'open' | 'message' | 'error' | 'close'

export type SessionHistoryEventTypes = 'pagehide' | 'pageshow' | 'popstate'

export type CssAnimationEventTypes = 'animationstart' | 'animationend' | 'animationiteration'

export type FormEventTypes = 'reset' | 'submit' | 'invalid'

export type PrintingEventTypes = 'beforeprint' | 'afterprint'

export type TextCompositionEventTypes = 'compositionstart' | 'compositionupdate' | 'compositionend'

export type ViewEventTypes = 'fullscreenchange' | 'fullscreenerror' | 'resize' | 'scroll'

export type KeyboardEventTypes = 'keydown' | 'keypress' | 'keyup'

export type MouseEventTypes =
  | 'mouseenter'
  | 'mouseover'
  | 'mousemove'
  | 'mousedown'
  | 'mouseup'
  | 'click'
  | 'dblclick'
  | 'contextmenu'
  | 'wheel'
  | 'mouseleave'
  | 'mouseout'
  | 'select'
  | 'pointerlockchange'
  | 'pointerlockerror'

export type DragAndDropEventTypes =
  | 'dragstart'
  | 'drag'
  | 'dragend'
  | 'dragend'
  | 'dragenter'
  | 'dragover'
  | 'dragleave'
  | 'drop'

export type MediaEventTypes =
  | 'durationchange'
  | 'loadedmetadata'
  | 'loadeddata'
  | 'canplay'
  | 'canplaythrough'
  | 'ended'
  | 'emptied'
  | 'stalled'
  | 'suspend'
  | 'play'
  | 'playing'
  | 'pause'
  | 'waiting'
  | 'seeking'
  | 'ratechange'
  | 'timeupdate'
  | 'volumechange'
  | 'complete'
  | 'ended'
  | 'audioprocess'

export type ProgressEventTypes =
  | 'loadstart'
  | 'progress'
  | 'error'
  | 'timeout'
  | 'abort'
  | 'load'
  | 'loaded'

export type StorageEventTypes = 'change' | 'storage'

export type UpdateEventTypes =
  | 'checking'
  | 'downloading'
  | 'error'
  | 'noupdate'
  | 'obsolete'
  | 'updateready'

export type ValueChangeEventTypes =
  | 'broadcast'
  | 'CheckboxStateChange'
  | 'hashchange'
  | 'input'
  | 'RadioStateChange'
  | 'readystatechange'
  | 'ValueChange'

export type LocalizationEventTypes = 'localized'

export type WebWorkerEventTypes = 'message'

export type ContextMenuEventTypes = 'show'

export type SvgEventTypes =
  | 'SVGAbort'
  | 'SVGError'
  | 'SVGLoad'
  | 'SVGResize'
  | 'SVGScroll'
  | 'SVGUnload'
  | 'SVGZoom'

export type DatabaseEventTypes =
  | 'abort'
  | 'blocked'
  | 'complete'
  | 'error'
  | 'success'
  | 'upgradeneeded'
  | 'versionchange'

export type NotificationEventTypes = 'AlertActive' | 'AlertClose'

export type CssEventTypes =
  | 'CssRuleViewRefreshed'
  | 'CssRuleViewChanged'
  | 'CssRuleViewCSSLinkClicked'
  | 'transitionend'

export type ScriptEventTypes = 'afterscriptexecute' | 'beforescriptexecute'

export type MenuEventTypes = 'DOMMenutItemActive' | 'DOMMenutItemInactive'

export type WindowEventTypes =
  | 'DOMWindowCreated'
  | 'DOMTitleChanged'
  | 'DOMWindowClose'
  | 'SSWindowClosing'
  | 'SSWindowStateReady'
  | 'SSWindowStateBusy'
  | 'close'

export type DocumentEventTypes =
  | 'DOMLinkAdded'
  | 'DOMLinkRemoved'
  | 'DOMMetaAdded'
  | 'DOMMetaRemoved'
  | 'DOMWillOpenModalDialog'
  | 'DOMModalDialogClosed'

export type PopupEventTypes =
  | 'popuphidden'
  | 'popuphiding'
  | 'popupshowing'
  | 'popupshown'
  | 'DOMPopupBlocked'

export type TabEventTypes =
  | 'TabOpen'
  | 'TabClose'
  | 'TabSelect'
  | 'TabShow'
  | 'TabHide'
  | 'TabPinned'
  | 'TabUnpinned'
  | 'SSTabClosing'
  | 'SSTabRestoring'
  | 'SSTabRestored'
  | 'visibilitychange'

export type BatteryEventTypes =
  | 'chargingchange'
  | 'chargingtimechange'
  | 'dischargingtimechange'
  | 'levelchange'

export type CallEventTypes =
  | 'alerting'
  | 'busy'
  | 'callschanged'
  | 'connected'
  | 'connecting'
  | 'dialing'
  | 'disconnected'
  | 'disconnecting'
  | 'error'
  | 'held'
  | 'holding'
  | 'incoming'
  | 'resuming'
  | 'statechange'

export type SensorEventTypes =
  | 'devicelight'
  | 'devicemotion'
  | 'deviceorientation'
  | 'deviceproximity'
  | 'orientationchange'
  | 'userproximity'

export type SmartcardEventTypes = 'smartcard-insert' | 'smartcard-remove'

export type SmsAndUssdEventTypes = 'delivered' | 'received' | 'sent'

export type FrameEventTypes = 'DOMFrameContentLoaded'

export type DomMutationEventTypes =
  | 'DOMAttributeNameChanged'
  | 'DOMAttrModified'
  | 'DOMCharacterDataModified'
  | 'DOMContentLoaded'
  | 'DOMElementNamedChanged'
  | 'DOMNodeInserted'
  | 'DOMNodeInsertedIntoDocument'
  | 'DOMNodeRemoved'
  | 'DOMNodeRemovedFromDocument'
  | 'DOMSubtreeModified'

export type TouchEventTypes =
  | 'touchcancel'
  | 'touchend'
  | 'touchenter'
  | 'touchleave'
  | 'touchmove'
  | 'touchstart'

export type PointerEventTypes =
  | 'pointerover'
  | 'pointerenter'
  | 'pointerdown'
  | 'pointermove'
  | 'pointerup'
  | 'pointercancel'
  | 'pointerout'
  | 'pointerleave'
  | 'gotpointercapture'
  | 'lostpointercapture'

// The events that are in the various browser specifications.
// All browsers should have these implemented the same.

/**
 * Standard event types defined by MDN. All browser should have these 
 * implemented the same.
 * 
 * @name StandardEventTypes
 * @example
 * export type StandardEventTypes =
 * // name -    Event Types
 *  | 'abort' // UIEvent, ProgressEvent, Event
 *  | 'afterprint' // Event;
 *  | 'animationend' // AnimationEvent
 *  | 'animationiteration' // AnimationEvent
 *  | 'animationstart' // AnimationEvent
 *  | 'audioprocess' // AudioProcessingEvent
 *  | 'audioend' // Event
 *  | 'audiostart' // Event
 *  | 'beforprint' // Event
 *  | 'beforeunload' // BeforeUnloadEvent
 *  | 'beginEvent' // TimeEvent
 *  | 'blocked' // Event
 *  | 'blur' // FocusEvent
 *  | 'boundary' // SpeechsynthesisEvent
 *  | 'cached' // Event
 *  | 'canplay' // Event
 *  | 'canplaythrough' // Event
 *  | 'change' // Event
 *  | 'chargingchange' // Event
 *  | 'chargingtimechange' // Event
 *  | 'checking' // Event
 *  | 'click' // MouseEvent
 *  | 'close' // Event
 *  | 'complete' // Event, OfflineAudioCompletionEvent
 *  | 'compositionend' // CompositionEvent
 *  | 'compositionstart' // CompositionEvent
 *  | 'compositionupdate' // CompositionEvent
 *  | 'contextmenu' // MoustEvent
 *  | 'copy' // ClipboardEvent
 *  | 'cut' // ClipboardEvent
 *  | 'dblclick' // MouseEvent
 *  | 'devicechange' // Event
 *  | 'devicelight' // DeviceLightEvent
 *  | 'devicemotion' // DeviceMotionEvent
 *  | 'deviceorientation' // DeviceOrientationEvent
 *  | 'deviceproximity' // DeviceProximityEvent
 *  | 'dischargingtimechange' // Event
 *  | 'DOMActivate' // UIEvent
 *  | 'DOMAttributeNameChanged' // MutationNameEvent
 *  | 'DOMAttrModified' // Mutationevent
 *  | 'DOMCharacterDataModified' // MutationEvent
 *  | 'DOMContentLoaded' // Event
 *  | 'DOMElementNamedChanged' // MutationNameEvent
 *  | 'DOMNodeInserted' // MutationEvent
 *  | 'DOMNodeInsertedIntoDocument' // MutationEvent
 *  | 'DOMNodeRemoved' // MutationEvent
 *  | 'DOMNodeRemovedFromDocument' // MutationEvent
 *  | 'DOMSubtreeModified' // MutationEvent
 *  | 'downloaded' // Event
 *  | 'drag' // DragEvent
 *  | 'dragend' // DragEvent
 *  | 'dragenter' // DragEvent
 *  | 'dragleave' // DragEvent
 *  | 'dragover' // DragEvent
 *  | 'dragstart' // DragEvent
 *  | 'drop' // DragEvent
 *  | 'durationchange' // Event
 *  | 'emptied' // Event
 *  | 'end' // Event, SpeechSynthesisEvent
 *  | 'ended' // Event
 *  | 'endEvent' // TimeEvent
 *  | 'error' // UIEvent | ProgressEvent | Event
 *  | 'focus' // FocusEvent
 *  | 'fullscreenchange' // Event
 *  | 'fullscreenerror' // Event
 *  | 'gamepadconnected' // GamepadEvent
 *  | 'gamepaddisconnected' // GamepadEvent
 *  | 'gotpointercapture' // PointerEvent
 *  | 'hashchange' // HashChangEvent
 *  | 'lostpointercapture' // PointerEvent
 *  | 'input' // event
 *  | 'invalid' // Event
 *  | 'keydown' // KeyboardEvent
 *  | 'keypress' // KeyboardEvent
 *  | 'keyup' // KeyboardEvent
 *  | 'languagechange' // Event
 *  | 'levelchange' // Event
 *  | 'load' // UIEvent, ProgressEvent
 *  | 'loadeddata' // Event
 *  | 'loadedmetadata' // Event
 *  | 'loadend' // ProgressEvent
 *  | 'loadstart' // ProgressEvent
 *  | 'mark' // SpeechSynthesisEvent
 *  | 'message' // MessageEvent, ServiceWorkerMessageEvent, ExtendableMessageEvent
 *  | 'mousedown' // MouseEvent
 *  | 'mouseenter' // MouseEvent
 *  | 'mouseleave' // MouseEvent
 *  | 'mousemove' // MouseEvent
 *  | 'mouseout' // MouseEvent
 *  | 'mouseover' // Mouseevent
 *  | 'nomatch' // SpeechRecognitionEvent
 *  | 'notificationclick' // NotificationEvent
 *  | 'noupdate' // event
 *  | 'obsolete' // Event
 *  | 'offline' // event
 *  | 'online' // Event
 *  | 'open' // event
 *  | 'orientationchange' // Event
 *  | 'pagehide' // PageTransitionEvent
 *  | 'pageshow' // PageTransitionEvent
 *  | 'paste' // ClipboardEvent
 *  | 'pause' // Event, SpeechSynthesisEvent
 *  | 'pointercancel' // PointerEvent
 *  | 'pointerdown' // PointerEvent
 *  | 'pointerenter' // PointerEvent
 *  | 'pointerleave' // PointerEvent
 *  | 'pointerlockchange' // Event
 *  | 'pointerlockerror' // Event
 *  | 'pointermove' // PointerEvent
 *  | 'pointerout' // PointerEvent
 *  | 'pointerover' // PointerEvent
 *  | 'pointerup' // PointerEvent
 *  | 'play' // Event
 *  | 'playing' // Event
 *  | 'popstate' // PopStateEvent
 *  | 'progress' // ProgressEvent
 *  | 'push' // PushEvent
 *  | 'pushsubscriptionchange' // PushEvent
 *  | 'ratechange' // Event
 *  | 'readystatechange' // Event
 *  | 'repeatEvent' // TimeEvent
 *  | 'reset' // Event
 *  | 'resize' // UIEvent
 *  | 'resourcetimingbufferfull' // Performance
 *  | 'result' // SpeechRecognitionEvent
 *  | 'resume' // SpeechSynthesisEvent
 *  | 'scroll' // UIEvent
 *  | 'seeked' // Event
 *  | 'seeking' // Event
 *  | 'select' // UIEvent
 *  | 'selectstart' // UIEvent
 *  | 'selectionchange' // Event
 *  | 'show' // MouseEvent
 *  | 'soundend' // Event
 *  | 'soundstart' // Event
 *  | 'speechend' // Event
 *  | 'speechstart' // Event
 *  | 'stalled' // Event
 *  | 'start' // SpeechSynthesisEvent
 *  | 'storage' // StorageEvent
 *  | 'submit' // Event
 *  | 'success' // Event
 *  | 'suspend' // Event
 *  | 'SVGAbort' // SvgEvent
 *  | 'SVGError' // SvgEvent
 *  | 'SVGLoad' // SvgEvent
 *  | 'SVGResize' // SvgEvent
 *  | 'SVGScroll' // SvgEvent
 *  | 'SVGUnload' // SvgEvent
 *  | 'SVGZoom' // SvgEvent
 *  | 'timeout' // ProgressEvent
 *  | 'timeupdate' // Event
 *  | 'touchcancel' // TouchEvent
 *  | 'touchend' // TouchEvent
 *  | 'touchenter' // TouchEvent
 *  | 'touchleave' // TouchEvent
 *  | 'touchmove' // TouchEvent
 *  | 'touchstart' // TouchEvent ;
 *  | 'transitionend' // Transitionevent
 *  | 'unload' // UIEvent
 *  | 'updateready' // Event
 *  | 'upgradeneeded' // Event
 *  | 'userproximity' // UserProximityEvent
 *  | 'voiceschanged' // Event
 *  | 'versionchange' // Event
 *  | 'visibilitychange' // Event
 *  | 'volumechange' // Event
 *  | 'vrdisplayconnected' // Event
 *  | 'vrdisplaydisconnected' // Event
 *  | 'vrdisplaypresentchange' // Event
 *  | 'waiting' // Event
 *  | 'wheel' // WheelEvent
 * @type
 */
export type StandardEventTypes =
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
