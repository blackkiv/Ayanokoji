const { SlashCommandBuilder } = require('discord.js');
const utils = require('../../common/utils');
const db = require('../../common/db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('richpresence')
        .setDescription('Replies with user steam rich presence')
        .addStringOption(option =>
            option.setName("steam_id")
                .setDescription("User steam id")
        ),
    async execute(interaction) {
        db.getSteamId(interaction.guildId, interaction.user.id)
            .then(async id => {
                const rawSteamId = interaction.options.get("steam_id")
                const steamId = rawSteamId ? rawSteamId.value : id;
                await interaction.reply(await utils.getSteamUserStatus(steamId));
            })
    }
};