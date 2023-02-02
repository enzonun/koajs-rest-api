
module.exports = {

    async create(ctx) {
        console.log('test');
        try {
            ctx.body = await ctx.db.artist.create({
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
            ctx.body = await ctx.db.artist.findAll({
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
            const artist = await ctx.db.artist.findOne({
                where: { id: ctx.params.id }
            });
            if (!artist) {
                ctx.throw(404, 'artist id is invalid');
            }
            ctx.body = artist;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async update(ctx) {
        try {

            const results = await ctx.db.artist.update({
                name: ctx.request.body.name,
                description: ctx.request.body.description,
            }, {
                where: {
                    id: ctx.params.id
                }
            });

            results === 0 ? ctx.throw(404, 'invalid id provided') : ctx.body = `artist updated with id ${ctx.params.id}`;

        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async destroy(ctx) {
        try {
            const results = await ctx.db.artist.destroy({
                where: {
                    id: ctx.params.id
                }
            });
            results === 0 ? ctx.throw(404, 'invalid id provided') : ctx.body = `artist deleted with id ${ctx.params.id}`;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

}