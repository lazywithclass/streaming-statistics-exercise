should = require 'should'

describe 'number', ->

  number = require '../../lib/counters/number'

  it 'could be required', ->
    should.exist number

  describe 'min', ->

    it 'compares the current value with the running min', ->
      runningTotal =
        latency: 50
        timeOnPage: 5
      input = 'b88267c6,query,100,3.993'
      output = number.min runningTotal, input
      output.should.eql
        latency: 50
        timeOnPage: 3.993

    it 'compares correctly whenever a value is first found', ->
      runningTotal =
        latency: -1
        timeOnPage: 5
      input = 'b88267c6,query,100,3.993'
      output = number.min runningTotal, input
      output.should.eql
        latency: 100
        timeOnPage: 3.993

    it 'compares correctly whenever a field does not have a value', ->
      runningTotal =
        latency: 50
        timeOnPage: 5
      input = 'b88267c6,query,100,'
      output = number.min runningTotal, input
      output.should.eql
        latency: 50
        timeOnPage: 5

  describe 'max', ->

    it 'compares the current value with the running min', ->
      runningTotal =
        latency: 50
        timeOnPage: 5
      input = 'b88267c6,query,100,3.993'
      output = number.max runningTotal, input
      output.should.eql
        latency: 100
        timeOnPage: 5

  describe 'average', ->

    it 'computes the running average', ->
      runningAverage =
        latency:
          count: 4
          sum: 12
          average: 3
        timeOnPage:
          count: 6
          sum: 24
          average: 4
      input = 'b88267c6,query,3,4'
      output = number.average runningAverage, input
      output.should.eql
        latency:
          count: 5
          sum: 15
          average: 3
        timeOnPage:
          count: 7
          sum: 28
          average: 4

    it 'computes correctly whenever a field does not have a value', ->
      runningAverage =
        latency:
          count: 2
          sum: 3
          average: 1.5
        timeOnPage:
          count: 2
          sum: 3
          average: 1.5
      input = 'b88267c6,query,,'
      output = number.average runningAverage, input
      output.should.eql
        latency:
          count: 3
          sum: 3
          average: 1
        timeOnPage:
          count: 3
          sum: 3
          average: 1
