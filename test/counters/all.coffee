should = require 'should'

describe 'all', ->

  all = require '../../lib/counters/all'

  it 'could be required', ->
    should.exist all

  it 'counts columns with and without values', ->
    input = "b88267c6,query,,352.993"
    runningTotal =
      sessionId: 0
      sessionId_null: 0
      page: 0
      page_null: 0
      latency: 0
      latency_null: 0
      timeOnPage: 0
      timeOnPage_null: 0
    output = all.count runningTotal, input
    output.should.eql
      sessionId: 1
      sessionId_null: 0
      page: 1
      page_null: 0
      latency: 0
      latency_null: 1
      timeOnPage: 1
      timeOnPage_null: 0
