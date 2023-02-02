const sequelize = require('../config/database');
const data = require('./data.json');
const bcryptService = require("../services/bcrypt.service");
const Role = require('../models/role.model');
const User = require('../models/user.model');
const Artist = require('../models/artist.model');
const Album = require('../models/album.model');
const Genre = require('../models/genre.model');
const Musictrack = require('../models/musictrack.model');

const insertRoles = () => {
    data.roles.forEach(async item => {
        try {
            // await db.role.create(item);
            await Role.create(item);
        }
        catch (err) {
            console.log(err); 
        }
    });
}

const insertUsers = () => {
    data.users.forEach(async item => {
        try {
            const encryptedPassword = await bcryptservice.hashPassword(item.password);

            await User.create({
                alias: item.alias,
                username: item.username,
                password: encryptedPassword,
                roleId: item.roleId
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}

const insertArtists = () => {
    data.artists.forEach(async item => {
        try {
            await Artist.create(item);
        }
        catch (err) {
            console.log(err);
        }
    });
}

const insertAlbums = () => {
    data.albums.forEach(async item => {
        try {
            await Album.create(item);
        }
        catch (err) {
            console.log(err);
        }
    });
}


const insertGenres = () => {
    data.genres.forEach(async item => {
        try {
            await Genre.create(item);
        }
        catch (err) {
            console.log(err);
        }
    });
}

const insertTracks = () => {
    data.musictracks.forEach(async item => {
        try {
            await Musictrack.create(item);
        }
        catch (err) {
            console.log(err);
        }
    });
}

module.exports = {
    async insertAllData() {
        await Promise.all([
            insertRoles(),
            insertUsers(),
            insertArtists(),
            insertAlbums(),
            insertGenres(),
            insertTracks()
        ]);
    }
}
