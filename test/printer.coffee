should = require 'should'
sinon = require 'sinon'

describe 'printer', ->

  beforeEach ->
    sinon.stub console, 'log'

  afterEach ->
    console.log.restore()

  it 'could be required', ->
    printer = require '../lib/printer'
    should.exist printer

  it 'prints statistics with numbers rounded to the third decimal', ->
    printer = require '../lib/printer'

    input = 'b88f17d5,welcome,30,28.772'
    printer.print input

    input = '39332eb6,explore,215,91.903'
    printer.print input

    input = '39392ddb,query,24,440.365'
    printer.print input

    expectedField = 'field(count-not-null count-null) sessionId(3 0) page(3 0) latency(3 0) timeOnPage(3 0)'
    console.log.args[4][0].should.equal expectedField
    expectedField = 'field(min max avg) sessionId(8 8 8) page(5 7 6.333) latency(24 215 89.667) timeOnPage(28.772 440.365 187.013)'
    console.log.args[5][0].should.equal expectedField
