const { Pool } = require('pg')

class PlaylistsService {
  constructor () {
    this._pool = new Pool()
  }

  async getPlaylistById (playlistId) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username
      FROM playlists
      JOIN users ON playlists.owner = users.id
      WHERE playlists.id = $1`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)

    return result.rows[0]
  }

  async getSongsByPlaylistId (playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlists
      JOIN playlist_songs ON playlists.id = playlist_songs.playlist_id
      JOIN songs ON playlist_songs.song_id = songs.id
      WHERE playlists.id = $1`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)

    return result.rows
  }
}

module.exports = PlaylistsService
