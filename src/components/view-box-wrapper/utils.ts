import type { AlternativeViewBox, Point, ViewBox, ViewBox1, ViewBox2, ViewBox3, ViewBox4 } from './interface'

/**
 * 获取 url 图片的 ViewBox
 */
export function resovleImageBBox(url: string): Promise<ViewBox> {
  return new Promise<ViewBox>((resolve) => {
    const image = new Image()
    image.onload = () => resolve({ x: 0, y: 0, width: image.width, height: image.height })
    image.onerror = () => resolve({ x: 0, y: 0, width: 0, height: 0 })
    image.src = url
  })
}

export function adaptToViewBox(input: AlternativeViewBox): ViewBox {
  const viewBox: ViewBox = { x: 0, y: 0, width: 0, height: 0 }
  if (isViewBox1(input)) {
    Object.assign(viewBox, input)
  }
  else if (isViewBox2(input)) {
    const { left, top, width, height } = input
    viewBox.x = left
    viewBox.y = top
    viewBox.width = width
    viewBox.height = height
  }
  else if (isViewBox3(input)) {
    const [leftTop, rightTop, leftBottom] = input
    viewBox.x = leftTop[0]
    viewBox.y = leftTop[1]
    viewBox.width = rightTop[0] - leftTop[0]
    viewBox.height = leftBottom[1] - leftTop[1]
  }
  else if (isViewBox4(input)) {
    const [x, y, width, height] = input
    Object.assign(viewBox, { x, y, width, height })
  }
  return viewBox
}

function isViewBox1(input: AlternativeViewBox): input is ViewBox1 {
  if (isObject(input)) {
    const { x, y, width, height } = input as ViewBox1
    return [x, y, width, height].every(isNumber)
  }
  return false
}
function isViewBox2(input: AlternativeViewBox): input is ViewBox2 {
  if (isObject(input)) {
    const { left, top, width, height } = input as ViewBox2
    return [left, top, width, height].every(isNumber)
  }
  return false
}
function isViewBox3(input: AlternativeViewBox): input is ViewBox3 {
  if (Array.isArray(input))
    return (input.slice(0, 4) as any).every(isPoint)

  return false
}
function isViewBox4(input: AlternativeViewBox): input is ViewBox4 {
  if (Array.isArray(input))
    return (input.slice(0, 4) as any).every(isNumber)

  return false
}

function isObject(input: unknown): input is Object {
  return typeof input === 'object' && input !== null
}

function isPoint(input: unknown): input is Point {
  if (Array.isArray(input))
    return input.slice(0, 2).every(isNumber)

  return false
}

function isNumber(input: unknown): input is number {
  return typeof input === 'number' && !Number.isNaN(input)
}
