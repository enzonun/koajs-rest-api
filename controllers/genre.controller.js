
module.exports = {

    async create(ctx) {
        try {
            ctx.body = await ctx.db.genre.create({
                name: ctx.request.body.name,
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
            ctx.body = await ctx.db.genre.findAll({
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
            const genre = await ctx.db.genre.findOne({
                where: { id: ctx.params.id }
            });
            if (!genre) {
                ctx.throw(404, 'genre id is invalid');
            }
            ctx.body = genre;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async update(ctx) {
        try {

            const results = await ctx.db.genre.update({
                name: ctx.request.body.name,
                description: ctx.request.body.description,
            }, {
                where: {
                    id: ctx.params.id
                }
            });

            results === 0 ? ctx.throw(404, 'invalid id provided') : ctx.body = `genre updated with id ${ctx.params.id}`;

        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async destroy(ctx) {
        try {
            const results = await ctx.db.genre.destroy({
                where: {
                    id: ctx.params.id
                }
            });
            results === 0 ? ctx.throw(404, 'invalid id provided') : ctx.body = `genre deleted with id ${ctx.params.id}`;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

}