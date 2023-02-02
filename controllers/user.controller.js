const bcryptservice = require('../services/bcrypt.service');
const userService = require('../services/user.service');

module.exports = {

    async signup(ctx) {
        if (!ctx.request.body.username, !ctx.request.body.password) {
            ctx.throw(400, 'please provide appropiate data for signup a user');
        }

        const alias = ctx.request.body.alias;
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;

        try {
            const encryptedPassword = await bcryptservice.hashPassword(password);
            const newUserSignUp = await userService.create(alias, username, encryptedPassword);
            const response = {};
            response.user = newUserSignUp.username;
            response.msg = 'Signup successful';
            ctx.body = response;
        } catch (err) {
            let msg = err.errors[0].message;
            const error = new Error(msg);
            error.status = 400;
            ctx.throw(error);
            // ctx.throw(err);
        }
    },
    // login method for frontend
    async login(ctx) {

        if (!ctx.request.body.username || !ctx.request.body.password) {
            ctx.throw(400, 'please provide appropiate data for login');
        }

        let [username, password] = [ctx.request.body.username, ctx.request.body.password];

        try {
            const user = await userService.findOne();
            
            if (!user) {
                ctx.throw(400, `username is invalid: ${username}`);
            }

            const passwordMatch = await bcryptservice.comparedPassword(password, user.password);

            if (passwordMatch) {
                const response = {};
                response.user = user.username;
                response.msg = 'login successful';
                ctx.body = response;
            } else {
                ctx.throw(500, 'invalid password');
            }

        } catch (err) {
            ctx.throw(err);
        }
    },

    async create(ctx) {

        if (!ctx.request.body.roleId) {
            ctx.throw(400, 'please provide the roleId')
        }

        try {
            const newUser = await userService.createWithRole(alias, username, encryptedPassword, roleId);
            ctx.body = newUser;
        } catch (err) {
            let msg = err.errors[0].message;
            const error = new Error(msg);
            error.status = 400;
            ctx.throw(400, msg);
        }
    },

    async findAll(ctx) {
        try {
            const users = await userService.findAll();
            ctx.body = users;
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async findOne(ctx) {
        const userId = ctx.params.id;
        try {
            const user = await userService.findOneWithoutPass(userId);
            
            if (!user) {
                ctx.throw(404, 'user id is invalid');
            }

            ctx.body = user;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async update(ctx) {
        try {
            const userUpdate = {};
            userUpdate.alias = ctx.request.body.alias,
                userUpdate.username = ctx.request.body.username,
                userUpdate.password = ctx.request.body.password,
                userUpdate.roleId = ctx.request.body.roleId

            const updatedUser = await userService.update(userUpdate);

            updatedUser === 0 ? ctx.throw(404, 'invalid id provided')
                : ctx.body = `user updated with id ${ctx.params.id}`;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async destroy(ctx) {
        const id = ctx.params.id;
        try {
            const result = await userService.destroy(id);
            
            result === 0 ? ctx.throw(404, 'invalid id provided')
                : ctx.body = `user deleted with id ${ctx.params.id}`;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },
}
