const sqlite3 = require('sqlite3').verbose();

const DB = new sqlite3.Database(':memory:')

module.exports = {
    init() {
        DB.serialize(() => {
            DB.run(`create table if not exists UserSteamId (
                id integer primary key autoincrement,
                guild_id text not null,
                user_id text not null,
                steam_id text not null,
                unique(guild_id, user_id, steam_id) on conflict ignore
            );`)
        })
    },
    register(guild_id, user_id, steam_id) {
        const stmt = DB.prepare('insert into UserSteamId(guild_id, user_id, steam_id) values (?, ?, ?)')
        stmt.run(guild_id, user_id, steam_id)
        stmt.finalize()
    },
    getSteamId(guild_id, user_id) {
        return new Promise((resolve, reject) =>
            DB.get('select steam_id from UserSteamId where guild_id = $guildId and user_id = $userId',
                { '$guildId': guild_id, '$userId': user_id },
                (err, result) => {
                    if (err) {
                        reject(err.message)
                    } else {
                        resolve(result.steam_id)
                    }
                }
            ))
    }
}