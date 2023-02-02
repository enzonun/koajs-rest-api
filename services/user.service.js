const User = require('../models/user.model');
const Role = require('../models/role.model');

module.exports = {

    /**
     * Creates a new user
     * @param {*} alias 
     * @param {*} username 
     * @param {*} password 
    */
    async create(alias, username, password) {
        const newUser = await User.create({ alias, username, password });
        return newUser;
    }, 

    async createWithRole(alias, username, password, roleId) {
        const newUser = await User.create({ alias, username, password, roleId });
        return newUser;
    },

    async findOne(username) {
        const user = await User.findOne({
            where: {
                username
            } 
        });
        return user;
    },

    async findOneWithoutPass(id) {
        const user = await User.scope('withoutPassword').findOne({
            where: { id: id },
            include: [
                {
                    model: Role
                }
            ],
        });
        return user;
    },

    async findAll() {
        const users = await User.scope('withoutPassword').findAll({
            include: [
                {
                    model: Role
                }
            ],
            order: [
                ['createdAt', 'DESC'],
            ]
        });
        return users;
    },

    async update(user) {
        const updatedUser = await User.update({
            alias: user.alias,
            username: user.username,
            password: user.password,
            roleId: user.roleId
        }, {
            where: {
                id: id
            }
        });
        return updatedUser;
    },

    async destroy(id) {
        const result = await ctx.db.user.destroy({
            where: {
                id: ctx.params.id
            }
        });
        return result;
    }


}



