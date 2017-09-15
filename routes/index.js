var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Bands = mongoose.model('Items');
var Names = mongoose.model('Names');

router.get('/', (req, res, next) => { res.render('index') });

router.get('/band', function(req, res, next) {

    Bands.find().populate("fans").exec(function(err, band) {
        if (err) { return next(err); };
        console.log("band")
        res.json(band);
    })
})

router.get('/names', function(req, res, next) {
    Names.find(function(err, name) {
        if (err) { return next(err); };
        res.json(name);
    })
})

router.post('/band', (req, res, next) => {
    var band = new Bands(req.body);
    console.log(band)
    band.save(function(err, band) {
        if (err) { return next(err); }
        res.json(band);

    })
});

router.post('/addFan', (req, res, next) => {
  
   

    
    var fan = req.body;
    console.log("fan = ", fan);

    let conditions = {
        _id:fan.band_id,
        'fans':{$ne: fan.name_id}
    }

    Bands.findOneAndUpdate(conditions, { $push: { fans:fan.name_id } }, function(err,bands){
      console.log(bands);
      res.json(bands);
    })
});

router.post('/name', (req, res, next) => {

    var name = new Names(req.body);
    console.log("in routes", name)
    name.save(function(err, name) {
        if (err) { return next(err); }
        res.json(name);

    })
});


router.post('/deleteOneBand', (req, res, next) => {
    Bands.deleteOne({ _id: req.body.id }, function(err, bands) {
        console.log(bands)
        res.json(bands);
    })
});

router.post('/deleteAllBands', (req, res, next) => {
    Bands.remove({}, function(err, band) {
        res.json(band);
    })
});


router.post('/removeAllNames', (req, res, next) => {
    Names.remove({}, function(err, name) {
        res.json(name);
    })
});


module.exports = router;