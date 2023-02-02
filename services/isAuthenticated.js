const bcryptservice = require('./bcrypt.service');

module.exports = async (ctx, next) => {
    let basicAuth = '';

    if (ctx.request.header && ctx.request.header.authorization) {
        basicAuth = ctx.request.header.authorization;
    } else {
        ctx.throw(401, 'Authorization header is missing');
    }

    const base64Credentials = basicAuth.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    console.log(username, password);

    try {
        const user = await ctx.db.user.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            ctx.throw(401, 'Unauthorized');
        }

        const passwordMatch = await bcryptservice.comparedPassword(password, user.password);

        if (passwordMatch) {
            ctx.state.user = user.id;
            await next();
        } else {
            ctx.throw(401, 'Unauthorized');
        }

    } catch (err) {
        ctx.throw(err);
    }
}
