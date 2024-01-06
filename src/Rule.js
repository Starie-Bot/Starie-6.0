export default class Rule {
  constructor (client, data) {
    this._client = client
    this.id = data.id || new Date().getTime()
    this.rule = data.rule || ''
    this.guild_id = data.guild_id || ''
    this.message_id = data.message_id || null
  }
}
