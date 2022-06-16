export type X = number
export type Y = number
export type Width = number
export type Height = number
export type Point = [X, Y]

export type ViewBox = ViewBox1
export type AlternativeViewBox = ViewBox1 | ViewBox2 | ViewBox3 | ViewBox4

/** 视窗盒子 */
export interface ViewBox1 {
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
