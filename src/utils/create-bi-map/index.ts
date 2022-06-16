import type { Primitive } from 'type-fest'

/**
 * 创建双向的映射函数
 */
export const createBiMap = <K, V>(entries: Readonly<Readonly<[K, V]>[]>) => {
  const reversedEntries = entries.map<[V, K]>(([k, v]) => [v, k])
  const map = new Map<K, V>(entries)
  const reversedMap = new Map<V, K>(reversedEntries)
  const maps = [map, reversedMap]

  function mapTo(key: K): K extends Primitive? V: (V | undefined)
  function mapTo (key: V): V extends Primitive? K: (K | undefined)
  function mapTo (key: unknown): undefined // 非 K | V 值时为 undefined
  function mapTo(key: any) {
    const result = maps.reduce<{ done: boolean; value?: K|V }>((result, map) => {
      if (!result.done && map.has(key))
        return { done: true, value: map.get(key)! }
      return result
    }, { done: false, value: undefined })
    return result.value
  }
  return mapTo
}
