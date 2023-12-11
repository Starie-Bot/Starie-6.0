import Rule from './Rule.js'

export default class RuleManager {
  constructor (client, rules) {
    this._client = client
    this._rules = rules || []
  }

  all () {
    return this._rules
  }

  dbWrite (text) {
    this._client.db.query('INSERT INTO rules (id, rule, guild_id) VALUES($1, $2) ON CONFLICT UPDATE rule = excluded.rule, message_id = excluded.message_id', [text])
  }

  dbRemove (rule) {

  }

  add (rule) {
    this._rules.push(rule)
  }

  remove (rule) {
    this._rules.splice(this._rules.indexOf(this.get(rule)), 1)
  }

  get (rule) {
    return this._rules.find(r => r.text === rule || r.id === rule)
  }
}
