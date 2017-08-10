import { Lights, Tick } from './'

export function trafficControllerService(tick: Tick): Lights {
  if (tick >= 0 && tick <= 2) return { red: false, yellow: false, green: true }

  if (tick === 3) return { red: false, yellow: true, green: false }

  if (tick >= 4 && tick <= 6) return { red: true, yellow: false, green: false }

  return { red: true, yellow: true, green: false }
}
