// Constants
// const F = 96485 // c/mol
// const n = 2
// const rho = 1.738 // gr/ml
// const T = 20
// const m = 
// const b1 = 
// const b2 = 

// Functions
// const model = (N, I, m) => b1 * T * I - Math.pow((b1 * T * I - b2 * m * N), 1 / (b2 * m))

// const Img = (W) => W / (n * rho * F)
// const dImgdt = (i, Img) => -i * Img
// const dNdt = (i, Img, c, N) => i * Img - c * N
// const dRdt = (c) => -c

const rungeKutta4 = (f, x0, y0, h, maxIter) => {

  const iterator = (x, y, set, currentIter) => {
    if (currentIter === maxIter) {
      return set
    }

    const k1 = h * f(x, y)
    const k2 = h * f(x + h * 0.5, y + k1 * 0.5)
    const k3 = h * f(x + h * 0.5, y + k2 * 0.5)
    const k4 = h * f(x + h, y + k3)

    const nextX = x + h
    const nextY = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6

    return iterator(nextX, nextY, [...set, [nextX, nextY]], currentIter + 1)
  }

  return iterator(x0, y0, [[x0, y0]], 0)
}

// const h = Array(10).fill(0.2)
// console.log(rungeKutta4((x, y) => (x - y) / 2, 0, 1, h, 10))

export default rungeKutta4