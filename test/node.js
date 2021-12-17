const chai = require('chai')
const Colorfuls = require('../lib/index.cjs')

global.should = chai.should()
global.Colorfuls = Colorfuls

require('./tests.spec')
