# ViewBoxWrapper
在元素互相重叠时，通过相对坐标及尺寸定位盒子位置和大小。

## Feature

### 响应式调整定位及尺寸
view-box-wrapper 使用父级 wrapper 的相对坐标和尺寸，因而可以响应式地跟随容器变化，确保相对位置及相对尺寸不变。  
view-box-wrapper 的 viewBox 概念来自于 [\<svg\> 的 viewBox 属性](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)。

### 自由的嵌套组合
每个 view-box-wrapper 都是一个可以组合的组件，例如：
```vue
<view-box-wrapper>
  parent

  <view-box-wrapper>
    child1
  </view-box-wrapper>
  <view-box-wrapper>
     child2
    <view-box-wrapper>
      grandChild
    </view-box-wrapper>
  </view-box-wrapper>
</view-box-wrapper>
```

## Types
```ts
export type X = number
export type Y = number
export type Width = number
export type Height = number
export type Point = [X, Y]

export interface ViewBox {
  x: X
  y: Y
  width: Width
  height: Height
}

/** 兼容的其他类型 ViewBox */
export interface ViewBox2 {
  left: X
  top: Y
  width: Width
  height: Height
}

/** leftTop, rightTop, rightBottom, leftBottom */
export type ViewBox3 = [Point, Point, Point, Point]

export type ViewBox4 = [X, Y, Width, Height]
```