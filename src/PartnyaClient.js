import Discord, { Client } from 'discord.js'
import Database from './Database.js'
import CommandManager from './CommandManager.js'
import PollManager from './PollManager.js'
import Poll from './Poll.js'
import Rule from './Rule.js'
import { Logger } from './Logger.js'
import RuleManager from './RuleManager.js'

export default class PartnyaClient extends Client {
  constructor (data) {
    super(data)
    this.db = new Database()
    this.polls = new PollManager(this)
    this.commands = new CommandManager(this)
    this.rules = new RuleManager(this)
  }

  async load () {
    Logger.info('Loading PartnyaClient')
    Logger.info('Initalizing commands')
    await this.rest.put(Discord.Routes.applicationCommands(this.user.id), { body: this.commands.all().map((command) => command.data) })
    Logger.info(`Commands loaded (${this.commands.all().length})`)
    Logger.info('Restoring polls from database')
    this.polls.set((await this.db.session.query('SELECT * FROM polls')).rows.map(poll => new Poll(this, poll)))
    Logger.info(`Polls loaded (${this.polls._polls.length})`)
    Logger.info('Restoring rules from database')
    this.rules.set((await this.db.session.query('SELECT * FROM rules')).rows.map(rule => new Rule(this, rule)))
    Logger.info(`Rules loaded (${this.rules._rules.length})`)
  }
}
