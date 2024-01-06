import { SlashCommandBuilder } from 'discord.js'

const RuleCommand = {
  data: new SlashCommandBuilder()
    .setName('rule')
    .setDescription('Display the contents of a specific rule')
    .setDefaultMemberPermissions(0x2000)
    .addIntegerOption(option =>
      option
        .setAutocomplete(true)
        .setName('number')
        .setDescription('The rule number to quote')
    ),
  async execute (interaction) {
    const rule = interaction.client.rules.get(command => command.name === interaction.options.getInteger('number'))
    interaction.reply(rule.rule)
  }
}

export default RuleCommand
