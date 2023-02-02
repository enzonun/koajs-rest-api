const Role = require('../models/role.model');

module.exports = {

    /**
     * Creates a new role
     * @param {*} rolename 
     * @param {*} description 
     */
    async create(rolename, description) {
        // const newUser = db.user.create({ alias, username, password });
        const newRole = Role.create({ rolename, password });
        console.log(newRole);
        return newRole;
    }
}

