should = require 'should'

describe 'text', ->

  text = require '../../lib/counters/text'

  it 'could be required', ->
    should.exist text

  describe 'shortest', ->

    it 'keeps a running count of the shortest string', ->
      runningTotal =
        sessionId: 1
        page: 8
      input = 'b88267c6,query,100,3.993'
      output = text.shortest runningTotal, input
      output.should.eql
        sessionId: 1
        page: 'query'.length

    it 'computes correctly whenever a field does not have a value', ->
      runningTotal =
        sessionId: 1
        page: 2
      input = ',,100,3.993'
      output = text.shortest runningTotal, input
      output.should.eql
        sessionId: 1
        page: 2

  describe 'longest', ->

    it 'keeps a running count of the longest string', ->
      runningTotal =
        sessionId: 1
        page: 2
      input = 'b88267c6,query,100,3.993'
      output = text.longest runningTotal, input
      output.should.eql
        sessionId: 'b88267c6'.length
        page: 'query'.length

  describe 'average', ->

    it 'computes the running average', ->
      runningAverage =
        sessionId:
          count: 4
          sum: 12
          average: 3
        page:
          count: 6
          sum: 24
          average: 4
      input = 'b88,home,3,4'
      output = text.average runningAverage, input
      output.should.eql
        sessionId:
          count: 5
          sum: 15
          average: 3
        page:
          count: 7
          sum: 28
          average: 4
