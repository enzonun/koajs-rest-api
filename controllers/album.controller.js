

module.exports = {

    async create(ctx) {

        if (!ctx.request.body.artistId) {
            ctx.throw(400, 'please provide the artistId')
        }

        try {
            const newAlbum = await ctx.db.album.create({
                title: ctx.request.body.title,
                description: ctx.request.body.description,
                artistId: ctx.request.body.artistId
            });
            ctx.body = newAlbum;
        } catch (err) {
            let msg = err.errors[0].message;
            const error = new Error(msg);
            error.status = 400
            ctx.throw(error);
        }

    },

    async find(ctx) {
        try {
            ctx.body = await ctx.db.album.findAll({
                include: [
                    {
                        model: ctx.db.artist
                    }
                ],
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
            const album = await ctx.db.album.findOne({
                where: { id: ctx.params.id },
                include: [
                    {
                        model: ctx.db.artist
                    }
                ],
            });
            if (!album) {
                ctx.throw(404, 'album id is invalid');
            }
            ctx.body = album;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async update(ctx) {
        try {
            const results = await ctx.db.album.update({
                title: ctx.request.body.title,
                description: ctx.request.body.description,
            }, {
                where: {
                    id: ctx.params.id
                }
            });

            results === 0 ? ctx.throw(404, 'invalid id provided') : ctx.body = `album updated with id ${ctx.params.id}`;

        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async destroy(ctx) {
        try {
            const results = await ctx.db.album.destroy({
                where: {
                    id: ctx.params.id
                }
            });
            results === 0 ? ctx.throw(404, 'invalid id provided') : ctx.body = `album deleted with id ${ctx.params.id}`;
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

}