const express = require('express')
const router = express.Router()

const gameController = require('../controllers/game')
const userController = require('../controllers/user')
const authController = require('../controllers/authenticate')
// const roleController = require('../controllers/role')
const sexController = require('../controllers/sex')

//TODO: настроить модульную систему роутов. чтобы каждый файл отвечал за настройку роутов под своим контроллером
// и в этом файле достаточно было просто подключить модули

// [Auth - Start]

router.post('/register', authController.do('register'))

router.post('/login', authController.do('login'))

router.post('/token', authController.do('token'))

router.delete('/logout/:token', authController.do('logout'))

// [Auth - End]


// [Users - Start]

// Getting logged user data
router.get('/profile', userController.do('getProfile'))

// Getting all users
router.get('/users', userController.do('getItems'))

// Getting One user
router.get('/users/:id', userController.do('getItem'))

// Creating one user
router.post('/users', userController.do('create'))

// Updating One user
router.patch('/users/:id', userController.do('update'))

// [Users - End]

// [Games - Start]

// Getting all games that belongs authenticated user
router.get('/games/my', gameController.do('getAuthUserItems'))

// Getting all games
router.get('/games', gameController.do('getItems'))

// Getting One game
router.get('/games/:id', gameController.do('getItem'))

// Creating one game
router.post('/games', gameController.do('create'))

// Updating One game
router.patch('/games/:id', gameController.do('update'))

// Deleting One game
router.delete('/games/:id', gameController.do('delete'))

// [Games - End]

// [Sex - Start]

// Getting all sex
router.get('/sex', sexController.do('getItems'))

// // Getting One sex
// router.get('/sex/:id', sexController.do('getItem'))

// // Creating one sex
// router.post('/sex', sexController.do('create'))

// // Deleting One sex
// router.delete('/sex/:id', sexController.do('delete'))

// [Sex - End]

// [Roles - Start]

// Getting all roles
// router.get('/roles', roleController.do('getItems'))

// Getting One role
// router.get('/roles/:id', roleController.do('getItem'))

// Creating one role
// router.post('/roles', roleController.do('create'))

// Deleting One role
// router.delete('/roles/:id', roleController.do('delete'))

// [Roles - End]

module.exports = router