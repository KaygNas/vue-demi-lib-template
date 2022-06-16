import { describe, expect, it } from 'vitest'
import { createBiMap } from '../index'

describe('createBiMap', () => {
  const mapPrimitive = createBiMap([
    [0, 'small'],
    [1, 'medium'],
    [2, 'large'],
  ] as const)
  it('map should work both direction when primitive value', () => {
    expect(mapPrimitive(0)).toBe('small')
    expect(mapPrimitive(1)).toBe('medium')
    expect(mapPrimitive(2)).toBe('large')
    expect(mapPrimitive('small')).toBe(0)
    expect(mapPrimitive('medium')).toBe(1)
    expect(mapPrimitive('large')).toBe(2)
  })

  const collectionA = [{ value: 'A' }, { value: 'A' }]
  const collectionB = [{ value: 'B' }, { value: 'B' }]
  const mapNotPrimitive = createBiMap([
    [collectionA[0], collectionB[0]],
    [collectionA[1], collectionB[1]],
  ])
  it('map should work both direction when not primitive value', () => {
    expect(mapNotPrimitive(collectionA[0])).toBe(collectionB[0])
    expect(mapNotPrimitive(collectionA[1])).toBe(collectionB[1])
    expect(mapNotPrimitive(collectionB[0])).toBe(collectionA[0])
    expect(mapNotPrimitive(collectionB[1])).toBe(collectionA[1])
  })

  it('map should return undefined', () => {
    expect(mapNotPrimitive({ value: 'A' })).toBe(undefined)
    expect(mapNotPrimitive({ value: 'B' })).toBe(undefined)
  })
})
