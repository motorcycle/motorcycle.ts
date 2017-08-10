import { DomSinks, DomSources, VNode } from '@motorcycle/mostly-dom'

import { ApplicationSources } from '@base/application'

export type TrafficLightSources = DomSources & ApplicationSources

export type TrafficLightSinks = DomSinks

export type LightBulbs = [VNode, VNode, VNode]

export type Color = 'black' | 'red' | 'yellow' | 'green'
