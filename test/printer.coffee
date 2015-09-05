should = require 'should'
sinon = require 'sinon'

describe 'printer', ->

  printer = require '../lib/printer'

  beforeEach ->
    sinon.stub console, 'log'

  afterEach ->
    console.log.restore()

  it 'could be required', ->
    should.exist printer

  it 'should print a line with the requested statistics', ->
    input = 'b88267c6,query,,42'
    printer.print input
    expectedAll = 'field(count-not-null count-null) sessionId(1 0) page(1 0) latency(0 1) timeOnPage(1 0)'
    console.log.args[0][0].should.equal expectedAll
    expectedField = 'field(min max avg) sessionId(8 8 8) page(5 5 5) latency(0 0 0) timeOnPage(42 42 42)'
    console.log.args[1][0].should.equal expectedField

  it 'keeps track of running statistics', ->
    input = 'b882,qu,,'
    printer.print input

    input = 'b88267,hiya-there,70,30'
    printer.print input

    input = 'b8,,20,'
    printer.print input

    expectedAll = 'field(count-not-null count-null) sessionId(3 0) page(2 1) latency(2 1) timeOnPage(2 1)'
    console.log.args[5][0].should.equal expectedAll
    expectedField = 'field(min max avg) sessionId(2 6 4) page(2 10 4) latency(20 70 30) timeOnPage(30 30 10)'
    console.log.args[6][0].should.equal expectedField

  it 'prints numbers rounded to the third decimal', ->
    input = 'b88f17d5,welcome,30,28.772'
    printer.print input

    input = '39332eb6,explore,215,91.903'
    printer.print input

    input = '39392ddb,query,24,440.365'
    printer.print input

    expectedField = 'field(min max avg) sessionId(8 8 8) page(5 7 6.333) latency(24 215 89.667) timeOnPage(28.772 440.365 187.013)'
    console.log.args[1][0].should.equal expectedField
