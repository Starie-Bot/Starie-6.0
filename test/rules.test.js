import { describe, it } from 'mocha'
import assert from 'assert'
import Poll from '../src/Poll.js'
import PartnyaClient from '../src/PartnyaClient.js'
import { IntentsBitField } from 'discord.js'
import Rule from '../src/Rule.js'

const sampleData = {
  rule: 'Test rule',
  guild_id: '123'
}

describe('RuleManager', function () {
  const client = new PartnyaClient({ intents: [IntentsBitField.Flags.Guilds] })

  describe('#all', function () {
    const rule = new Rule(client, sampleData)
    client.rules._rules.push(rule)
    it('should return an array size of 1', function () {
      assert.equal(client.rules.all().length, 1)
    })
  })

  describe('#add', function () {
    const poll = new Poll(client, sampleData)
    poll.votes.add(new Vote('123', '123'))

    it('should have an array size of 1', function () {
      assert.equal(poll.votes._votes.length, 1)
    })

    it('first entry should be by user \'123\'', function () {
      assert.equal(poll.votes._votes[0].member, '123')
    })

    it('first entry should be responding with \'123\'', function () {
      assert.equal(poll.votes._votes[0].option, '123')
    })

    poll.votes.add(new Vote('123', '123'))

    it('should not allow identical votes to be added', function () {
      assert.equal(poll.votes._votes.length, 1)
    })
  })

  describe('#remove', function () {
    const poll = new Poll(client, sampleData)
    poll.votes.remove(new Vote('123', '123'))

    it('should have an array size of 0', function () {
      assert.equal(poll.votes._votes.length, 0)
    })
  })

  describe('#replace', function () {
    const poll = new Poll(client, sampleData)
    poll.votes.add(new Vote('123', '123'))
    poll.votes.add(new Vote('123', '124'))

    it('should not increase in size when replaced', function () {
      assert.equal(poll.votes._votes.length, 1)
    })

    it('should equal the new value when replaced', function () {
      assert.equal(poll.votes._votes[0].option, '124')
    })

    it('should have the same original member', function () {
      assert.equal(poll.votes._votes[0].member, '123')
    })
  })

  describe('#has', function () {
    const poll = new Poll(client, sampleData)

    it('should be false when looking for an absent vote', function () {
      assert.equal(poll.votes.has(new Vote('123', '123')), false)
    })

    it('should be true when looking for a present vote', function () {
      poll.votes.add(new Vote('123', '123'))
      assert.equal(poll.votes.has(new Vote('123', '123')), true)
    })
  })

  describe('#hasAny', function () {
    const poll = new Poll(client, sampleData)
    poll.votes.add(new Vote('123', '123'))

    it('should be true for user \'123\'', function () {
      assert.equal(poll.votes.hasAny(new Vote('123', '123')), true)
    })

    it('should be false for user \'124\'', function () {
      assert.equal(poll.votes.hasAny(new Vote('124', '123')), false)
    })
  })

  describe('#total', function () {
    const poll = new Poll(client, sampleData)
    poll.votes.add(new Vote('123', '123'))
    poll.votes.add(new Vote('124', '123'))

    it('should return 2 for the option \'123\'', function () {
      assert.equal(poll.votes.total('123'), 2)
    })

    it('should return 0 for the option \'124\'', function () {
      assert.equal(poll.votes.total('124'), 0)
    })
  })
})
