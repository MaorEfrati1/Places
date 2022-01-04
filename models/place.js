const mongoose = require('mongoose')
const router = require('../routes/places')

// const placeImgBasePath = 'uploads/placeImgs'

const placeSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    // placeImgName: {
    //     type: String,
    //     required: true
    // },
    placeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Place', placeSchema)
// module.exports.placeImgBasePath = placeImgBasePath