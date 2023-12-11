import { SlashCommandBuilder } from 'discord.js'

const RuleCommand = {
  data: new SlashCommandBuilder()
    .setName('rule')
    .setDescription('Display the contents of a specific rule')
    .setDefaultMemberPermissions(0x2000),
  async execute (interaction) {
    const command = GetGuides().find(command => command.name === interaction.options.getSubcommand())
    interaction.reply(command.response)
  }
}

export default RuleCommand
