const express = require('express')
const router = express.Router()
const Place = require('../models/place')

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
router.get('/new', (req, res) => {
    res.render('places/new', {
        place: new Place()
    })
})


// Create Place Route
router.post('/', async (req, res) => {
    const place = new Place({
        placeName: req.body.placeName
    })
    try {
        const newPlace = await place.save()
        // res.redirect(`places/${newPlace.id}`)
        res.redirect(`places`)
    } catch {
        res.render('places/new', {
            place: place,
            errorMessage: 'Error create a Place'
        })
    }
})


module.exports = router