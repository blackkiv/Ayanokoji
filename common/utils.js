const fetch = require('node-fetch');
const cheerio = require('cheerio');

const MAGICAL_CONSTANT = 76561197960265728n;

module.exports = {
    async getSteamUserStatus(steamId) {
        var requestId = BigInt(steamId) - MAGICAL_CONSTANT;
        const response = await fetch(`https://steamcommunity.com/miniprofile/${requestId}}`, {
            method: 'get'
        });
        const responseText = await response.text();
        const $ = cheerio.load(responseText);
        const gameName = $('.miniprofile_game_name').html();
        const richPresence = $('.rich_presence').html();
        if (richPresence === null && gameName === null) {
            return "no data";
        } else {
            return richPresence === null ? gameName : `${gameName} | ${richPresence}`;
        }
    }
}