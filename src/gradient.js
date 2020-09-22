import { clone, Color } from './color'
import { isArray, numberRange, percentage2Value } from './util'
import Big from 'big.js/big.mjs'

function color2Array(color, gamma) {
  return color.toArray().map((channel, k) => {
    return Math.pow(k == 3 ? channel : channel / 255, gamma)
  })
}

function getStepColor(p, colors, gamma) {
  let start
  let end

  for (let i = 0, len = colors.length; i < len; i++) {
    const item = colors[i]

    if (p === item.percentage) {
      return clone(item.color)
    } else if (p < item.percentage) {
      const prevItem = colors[i - 1]
      start = color2Array(prevItem.color, gamma)
      end = color2Array(item.color, gamma)
      p = (p - prevItem.percentage) / (item.percentage - prevItem.percentage)
      break
    }
  }

  const arr = []

  for (let i = 0; i < 3; i++) {
    arr[i] = Math.round(
      Math.pow(start[i] * (1 - p) + end[i] * p, 1 / gamma) * 255
    )
  }
  arr[3] = Math.pow(start[3] * (1 - p) + end[3] * p, 1 / gamma)

  return Color({
    r: arr[0],
    g: arr[1],
    b: arr[2],
    a: arr[3]
  })
}

class GradientSteps extends Array {
  toRgbs() {
    return this.map(color => {
      return color.toRgb()
    })
  }

  toHexs() {
    return this.map(color => {
      return color.toHex()
    })
  }

  toHsls() {
    return this.map(color => {
      return color.toHsl()
    })
  }

  toRgbas() {
    return this.map(color => {
      return color.toRgba()
    })
  }

  toHexas() {
    return this.map(color => {
      return color.toHexa()
    })
  }

  toHslas() {
    return this.map(color => {
      return color.toHsla()
    })
  }

  toString() {
    return this.toRgbas().join(', ')
  }
}

class Gradient {
  constructor(startColor, endColor, gamma = 1) {
    if (isArray(startColor)) {
      this.colors = startColor
      this.gamma = endColor
    } else {
      this.colors = [
        {
          percentage: 0,
          color: startColor
        },
        {
          percentage: 1,
          color: endColor
        }
      ]
      this.gamma = gamma
    }
  }

  steps(len) {
    const output = new GradientSteps()

    if (len >= 2) {
      for (let i = 0; i < len; i++) {
        output.push(getStepColor(i / (len - 1), this.colors, this.gamma))
      }
    }

    return output
  }

  step(value) {
    const p = numberRange(percentage2Value(value))

    return getStepColor(p, this.colors, this.gamma)
  }
}

export default function gradient(color1, color2, gamma = 1) {
  return new Gradient(Color(color1).rgba(), Color(color2).rgba(), gamma)
}

/**
 * 线性渐变
 * @param  {...string|string[]} args
 */
export function linearGradient(...args) {
  const colors = []
  let unknownPercentageIndexs = []
  let minPercentage = 0

  for (let i = 0, len = args.length; i < len; i++) {
    const item = { percentage: null }

    if (isArray(args[i])) {
      item.color = Color(args[i][0]).rgba()
      item.percentage = numberRange(
        percentage2Value(args[i][1]),
        minPercentage,
        1
      )
    } else {
      item.color = Color(args[i]).rgba()
    }

    if (i === 0) {
      item.percentage = 0
    } else if (i === len - 1) {
      item.percentage = 1
    }

    if (item.percentage === null) {
      unknownPercentageIndexs.push(i)
    } else if (i > 0) {
      minPercentage = item.percentage
      if (unknownPercentageIndexs.length > 0) {
        const step =
          (item.percentage -
            colors[unknownPercentageIndexs[0] - 1].percentage) /
          (unknownPercentageIndexs.length + 1)

        unknownPercentageIndexs.forEach((colorIndex, k) => {
          colors[colorIndex].percentage =
            item.percentage - (unknownPercentageIndexs.length - k) * step
        })
        unknownPercentageIndexs = []
      }
    }

    colors.push(item)
  }

  return new Gradient(colors, 1)
}
