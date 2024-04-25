const { SlashCommandBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const db = require('../../common/db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register user for rich presence checking')
        .addStringOption(option =>
            option.setName("steam_id")
                .setDescription("User steam id")
                .setRequired(true)
        ),
    async execute(interaction) {
        const steamId = interaction.options.get("steam_id").value;
        db.register(
            interaction.guildId,
            interaction.user.id,
            steamId
        )
        await interaction.reply('Registered!');
    }
};