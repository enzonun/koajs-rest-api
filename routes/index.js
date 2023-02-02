const Router = require('koa-router');
const {
    HelloController,
    RoleController,
    UserController,
    ArtistController,
    GenreController,
    AlbumController
} = require('../controllers');
const router = new Router();
const isAuthenticated = require('../services/isAuthenticated');

router.get('/', HelloController.hello);

/**
 * roles routes
 */
router.post('/api/v1/roles', isAuthenticated, RoleController.create);
router.get('/api/v1/roles', isAuthenticated, RoleController.find);
router.get('/api/v1/roles/:id', isAuthenticated, RoleController.findOne);
router.put('/api/v1/roles/:id', isAuthenticated, RoleController.update);
router.delete('/api/v1/roles/:id', isAuthenticated, RoleController.destroy);

/**
 * users routes
 */
// create user for the first time without rol
router.post('/api/v1/users/signup', UserController.signup);
// login user
router.post('/api/v1/users/login', UserController.login);
// create user requires rol
router.post('/api/v1/users', isAuthenticated, UserController.create);
router.get('/api/v1/users', isAuthenticated, UserController.findAll);
router.get('/api/v1/users/:id', isAuthenticated, UserController.findOne);
// if user was signup can update for set his rol
router.put('/api/v1/users/:id', isAuthenticated, UserController.update);
router.delete('/api/v1/users/:id', isAuthenticated, UserController.destroy);

//  /**
//  * Artists routes
//  */
router.post('/api/v1/artists', ArtistController.create);
router.get('/api/v1/artists', ArtistController.find);
router.get('/api/v1/artists/:id', ArtistController.findOne);
router.put('/api/v1/artists/:id', ArtistController.update);
router.delete('/api/v1/artists/:id', ArtistController.destroy);

// /**
//  * Genre routes
//  */
router.post('/api/v1/genres', GenreController.create);
router.get('/api/v1/genres', GenreController.find);
router.get('/api/v1/genres/:id', GenreController.findOne);
router.put('/api/v1/genres/:id', GenreController.update);
router.delete('/api/v1/genres/:id', GenreController.destroy);

//  /**
//  * Album routes
//  */
router.post('/api/v1/albums', AlbumController.create);
router.get('/api/v1/albums', AlbumController.find);
router.get('/api/v1/albums/:id', AlbumController.findOne);
router.put('/api/v1/albums/:id', AlbumController.update);
router.delete('/api/v1/albums/:id', AlbumController.destroy);

// /**
//  * Roles routes
//  */
//  router.post('/api/v1/roles', RoleController.create);
//  router.get('/api/v1/roles', RoleController.find);
//  router.get('/api/v1/roles/:id', RoleController.findOne);
//  router.put('/api/v1/roles/:id', RoleController.update);
//  router.delete('/api/v1/roles/:id', RoleController.destroy);
//  /**
//  * Roles routes
//  */
// router.post('/api/v1/roles', RoleController.create);
// router.get('/api/v1/roles', RoleController.find);
// router.get('/api/v1/roles/:id', RoleController.findOne);
// router.put('/api/v1/roles/:id', RoleController.update);
// router.delete('/api/v1/roles/:id', RoleController.destroy);

module.exports = router;