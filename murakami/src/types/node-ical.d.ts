declare module 'node-ical' {
  interface ICalEvent {
    type: string
    uid: string
    summary: string
    start: Date
    end: Date
  }

  interface ICalData {
    [key: string]: ICalEvent
  }

  interface ICalOptions {
    defaultRepeats?: number
    skipInvalidDates?: boolean
  }

  function fromURL(
    url: string,
    options: ICalOptions,
    callback: (err: Error | null, data: ICalData) => void
  ): void

  export { fromURL, ICalEvent, ICalData, ICalOptions }
} 