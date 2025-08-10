export function groupBy<T, K extends string | number>(arr: T[], getKey: (item: T) => K) {
  return arr.reduce((acc, item) => {
    const k = getKey(item)
    ;(acc as any)[k] = (acc as any)[k] || []
    ;(acc as any)[k].push(item)
    return acc
  }, {} as Record<K, T[]>)
}
