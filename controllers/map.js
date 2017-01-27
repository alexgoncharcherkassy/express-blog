/**
 * GET /google-maps
 */
exports.getGoogleMaps = (req, res) => {
    res.render('map/google-maps', {
        title: 'Google Map'
    });
};