module.exports = {

    async create(ctx) {
        try {
            ctx.body = await ctx.db.role.create({
                rolename: ctx.request.body.rolename,
                description: ctx.request.body.description,
            });
        } catch (err) {
            let msg = err.errors[0].message;
            const error = new Error(msg);
            error.status = 400
            ctx.throw(error);
        }

    },

    async find(ctx) {
        try {
            ctx.body = await ctx.db.role.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ]
            });
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async findOne(ctx) {
        try {
            const role = await ctx.db.role.findOne({
                where: { id: ctx.params.id }
            });
            if (!role) {
                ctx.throw(404, 'role id is invalid');
            }
            ctx.body = role;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async update(ctx) {
        try {

            const results = await ctx.db.role.update({
                rolename: ctx.request.body.rolename,
                description: ctx.request.body.description,
            }, {
                where: {
                    id: ctx.params.id
                }
            });

            results === 0 ? ctx.throw(404, 'invalid id provided') : ctx.body = `role updated with id ${ctx.params.id}`;

        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async destroy(ctx) {
        try {
            const results = await ctx.db.role.destroy({
                where: {
                    id: ctx.params.id
                }
            });
            results === 0 ? ctx.throw(404, 'invalid id provided') : ctx.body = `role deleted with id ${ctx.params.id}`;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

}