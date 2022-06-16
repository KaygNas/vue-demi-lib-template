# Create Bidirectional Map

创建双向的映射方法，在希望方便地将两各集合之间互相映射时会非常有用。  

比如：将 `0 | 1 | 2` 的枚举值映射成可读的 `'small' | 'medium' | 'large'` 值。

## Usage

### 基本使用

#### 基本值
```ts
const mapPrimitive = createBiMap([
  [0, 'small'],
  [1, 'medium'],
  [2, 'large'],
])

mapPrimitive(0) // 'small'
mapPrimitive('small') // 0
```
#### 引用值
```ts

const collectionA = [{ value: 'A' }, { value: 'A' }]
const collectionB = [{ value: 'B' }, { value: 'B' }]
const mapNotPrimitive = createBiMap([
  [collectionA[0], collectionB[0]],
  [collectionA[1], collectionB[1]],
])

mapNotPrimitive(collectionA[0]) // { value: 'B' }
mapNotPrimitive({ value: 'A' }) // undefined
```

### 字面量类型收窄
在直接使用字面量数组作为参数时，TS 并不一定能将每个元素收窄到期望的程度，例如上方的示例[基本值](#基本值)，TS 推导出的类型为：
```ts
const mapTo: {
  (key: number): string
  (key: string): number
  (key: unknown): undefined
}
```

然而，我们实际希望的是更窄的类型推导，如下：
```ts
const mapTo: {
  (key: 0 | 1 | 2): 'small' | 'medium' | 'large'
  (key: 'small' | 'medium' | 'large'): 0 | 1 | 2
  (key: unknown): undefined
}
```

此时，我们需要通过 `[] as const` 告诉 TS 使用最严格的推导，这时 `mapTo` 的推导结果就能如我们所愿了。
```ts
const map = createBiMap([
  [0, 'small'],
  [1, 'medium'],
  [2, 'large'],
] as const)
```

### 注意
- `createBiMap` 创建的映射函数类型在对引用值进行映射时，映射结果可能为 `undefined`，这是符合预期的，因为即使输入的 key 类型相同，他们的引用可能也是不同的。见上方例子：[引用值](#引用值)。
- 在对基本值进行映射时，若类型不是 Union，映射结果也可能为 `undefined`, 但是结果的类型并不包含 `undefined`，因为 TS 无法知道该类型的具体值是否存在集合中。
