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
    input = "b88267c6,query,,42"
    printer.print input

    expectedAll = 'field(count-not-null count-null) sessionId(1 0) page(1 0) latency(0 1) timeOnPage(1 0)'
    console.log.args[0][0].should.equal expectedAll

    expectedField = 'field(min max avg) sessionId(8 8 8) page(5 5 5) latency(0 0 0) timeOnPage(42 42 42)'
    console.log.args[1][0].should.equal expectedField
