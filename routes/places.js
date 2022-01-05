const express = require('express')
const router = express.Router()
// const multer = require('multer')
// const path = require('path')

const Place = require('../models/place')
// const uploadPath = path.join('public', Place.placeImgBasePath)
// const imgTypes = ['images/jpeg', 'images/png', 'images/jpg']

// const upload = multer({
//     dest: uploadPath,
//     fileFilter: (req, file, callback) => {
//         callback(null, imgTypes.includes(file.mimetype))
//     }
// })


// All places Route
router.get('/', async (req, res) => {
    let searchOption = {}
    if (req.query.placeName != null && req.query.placeName !== '') {
        searchOption.placeName = new RegExp(req.query.placeName, 'i')
    }

    try {
        const places = await Place.find(searchOption)
        res.render('places/index', {
            places: places,
            searchOption: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New place Route
router.get('/new', async (req, res) => {
    try {

        const places = await Place.find({})
        res.render('places/new', {
            places: places,
            place: new Place()
        })
    } catch {
        res.redirect('/')
    }
})

// Create Place Route
router.post('/', /*upload.single('img'),*/ async (req, res) => {
    // const fileName = req.file != null ? req.file.filename : null
    // console.log(req.file)
    // console.log(fileName)
    const place = new Place({
        placeName: req.body.placeName,
        info: req.body.info,
        img1: req.body.img1,
        img2: req.body.img2,
        img3: req.body.img3,
        img4: req.body.img4
        // placeImgName: fileName
    })

    try {
        const newPlace = await place.save()
        res.redirect(`places/${newPlace.id}`)
    } catch (err) {
        res.render('places/new', {
            place: place,
            errorMessage: 'Error create a Place'
        })
        console.log(err)

    }
})

//get by id
router.get('/:id', async (req, res) => {
    try {
        const places = await Place.find({})
        const place = await Place.findById(req.params.id)
        res.render('places/show', {
            places: places,
            place: place
        })
    } catch (err) {
        res.redirect('/')
        console.log(err)
    }
})

//edit by id
router.get('/:id/edit', async (req, res) => {
    try {
        const places = await Place.find({})
        const place = await Place.findById(req.params.id)
        res.render('places/edit', {
            places: places,
            place: place
        })
    } catch {
        res.redirect('/places')
    }
})


//update by id
router.put('/:id', async (req, res) => {
    let place
    try {
        place = await Place.findById(req.params.id)
        place.placeName = req.body.placeName
        place.info = req.body.info
        place.img1 = req.body.img1,
            place.img2 = req.body.img2,
            place.img3 = req.body.img3,
            place.img4 = req.body.img4

        await place.save()
        res.redirect(`/places/${place.id}`)
    } catch (err) {
        if (place == null) {
            res.redirect('places/edit')
        } else {
            res.render('places/new', {
                place: place,
                errorMessage: 'Error updating a Place'
            })
            console.log(err)
        }
    }
})

//delete by id
router.delete('/:id', async (req, res) => {
    let place
    try {
        place = await Place.findById(req.params.id)


        await place.remove()
        res.redirect('/places')
    } catch (err) {
        if (place == null) {
            res.redirect('places/edit')
        } else {
            res.redirect(`/places/${place.id}`)
        }
    }
})

module.exports = router