const chai = require('chai')
const Colorfuls = require('../dist/colorfuls')

global.should = chai.should()
global.Colorfuls = Colorfuls

require('./tests.spec')