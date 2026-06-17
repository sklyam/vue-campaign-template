export default {
  validDuration() {
    const current = Date.now()

    const startTimeString = new Date(import.meta.env.VITE_START_TIME)
    const startTime = startTimeString.getTime()

    const endTimeString = new Date(import.meta.env.VITE_END_TIME)
    const endTime = endTimeString.getTime()

    if (startTime > current) {
      return 'before'
    }
    if (endTime < current) {
      return 'after'
    }
    return 'valid'
  },
}
