export default class Rule {
  constructor (data) {
    this.id = data.id || new Date().getTime()
    this.rule = data.rule || ''
    this.guild_id = data.guild_id || ''
    this.message_id = data.message_id || null
  }
}
