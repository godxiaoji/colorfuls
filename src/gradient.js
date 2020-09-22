import { clone, Color, rgba2RGBA } from './color'
import { isArray, numberRange, percentage2Length } from './util'

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
      console.log(
        p - prevItem.percentage,
        item.percentage - prevItem.percentage
      )
      p = (p - prevItem.percentage) / (item.percentage - prevItem.percentage)
      break
    }
  }

  const arr = []

  for (let i = 0; i < 4; i++) {
    const channel = Math.pow(start[i] * (1 - p) + end[i] * p, 1 / gamma)

    if (i === 3) {
      arr[i] = channel
    } else {
      arr[i] = Math.round(channel * 255)
    }
  }
  console.log(
    p,
    arr,
    rgba2RGBA({
      r: arr[0],
      g: arr[1],
      b: arr[2],
      a: arr[3]
    }).toHexa()
  )
  return rgba2RGBA({
    r: arr[0],
    g: arr[1],
    b: arr[2],
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
      item.percentage = numberRange(
        percentage2Length(args[i][1]),
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
            item.percentage - step * (unknownPercentageIndexs.length - k)
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
  constructor(colors, gamma = 1) {
    this.colors = parseColors(colors)
    this.gamma = gamma
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
    const p = numberRange(percentage2Length(value))

    return getStepColor(p, this.colors, this.gamma)
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
