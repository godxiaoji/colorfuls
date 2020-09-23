import { clone, Color, rgba2RGBA } from './color'
import { isArray, numberRange, percentage2Length } from './util'
import Big from 'big.js/big.mjs'

function color2Array(color, gamma) {
  return color.toArray().map((channel, k) => {
    return (k === 3 ? new Big(channel) : new Big(channel).div(255)).pow(gamma)
  })
}

function getStepColor(p, colors, gamma) {
  let start
  let end

  for (let i = 0, len = colors.length; i < len; i++) {
    const item = colors[i]

    if (item.percentage.eq(p)) {
      return clone(item.color)
    } else if (item.percentage.gt(p)) {
      const prevItem = colors[i - 1]
      start = color2Array(prevItem.color, gamma)
      end = color2Array(item.color, gamma)

      p = p
        .minus(prevItem.percentage)
        .div(item.percentage.minus(prevItem.percentage))
      break
    }
  }

  const arr = []

  for (let i = 0; i < 4; i++) {
    const channel = start[i]
      .times(new Big(1).minus(p))
      .plus(end[i].times(p))
      .pow(1 / gamma)

    if (i === 3) {
      arr[i] = channel
    } else {
      arr[i] = channel.times(255)
    }
  }

  return rgba2RGBA({
    r: parseFloat(arr[0]),
    g: parseFloat(arr[1]),
    b: parseFloat(arr[2]),
    a: arr[3]
  })
}

function parseColors(args) {
  const colors = []
  let unknownPercentageIndexs = []
  let minPercentage = 0

  for (let i = 0, len = args.length; i < len; i++) {
    const item = { percentage: null }

    if (isArray(args[i])) {
      item.color = Color(args[i][0]).rgba()
      item.percentage = new Big(
        numberRange(percentage2Length(args[i][1]), minPercentage, 1)
      )
    } else {
      item.color = Color(args[i]).rgba()
    }

    if (i === 0) {
      item.percentage = new Big(0)
    } else if (i === len - 1) {
      item.percentage = new Big(1)
    }

    if (item.percentage === null) {
      unknownPercentageIndexs.push(i)
    } else if (i > 0) {
      minPercentage = item.percentage
      if (unknownPercentageIndexs.length > 0) {
        const step = item.percentage
          .minus(colors[unknownPercentageIndexs[0] - 1].percentage)
          .div(unknownPercentageIndexs.length + 1)

        unknownPercentageIndexs.forEach((colorIndex, k) => {
          colors[colorIndex].percentage = item.percentage.minus(
            step.times(unknownPercentageIndexs.length - k)
          )
        })
        unknownPercentageIndexs = []
      }
    }
    colors.push(item)
  }

  //   colors.forEach(v => {
  //     console.log(v.percentage.toFixed(5))
  //   })

  return colors
}

function steps2ColorArray(gs, method) {
  const arr = []

  gs.forEach(color => {
    arr.push(color[method]())
  })

  return arr
}

class GradientSteps extends Array {
  toRgbs() {
    return steps2ColorArray(this, 'toRgb')
  }

  toHexs() {
    return steps2ColorArray(this, 'toHex')
  }

  toHsls() {
    return steps2ColorArray(this, 'toHsl')
  }

  toRgbas() {
    return steps2ColorArray(this, 'toRgba')
  }

  toHexas() {
    return steps2ColorArray(this, 'toHexa')
  }

  toHslas() {
    return steps2ColorArray(this, 'toHsla')
  }

  toString() {
    return this.toRgbas().join(', ')
  }
}

class Gradient {
  constructor(colors, gamma = 1) {
    this.colors = parseColors(colors)
    this.gamma = gamma
  }

  steps(length) {
    const output = new GradientSteps()

    if (length >= 2) {
      for (let i = 0; i < length; i++) {
        output.push(
          getStepColor(new Big(i).div(length - 1), this.colors, this.gamma)
        )
      }
    }

    return output
  }

  step(value) {
    const p = numberRange(percentage2Length(value))

    return getStepColor(new Big(p), this.colors, this.gamma)
  }
}

export default function gradient(color1, color2, gamma = 1) {
  return new Gradient([color1, color2], gamma)
}

/**
 * 线性渐变
 * @param  {...string|string[]} args
 */
export function linearGradient(...args) {
  return new Gradient(args, 1)
}
