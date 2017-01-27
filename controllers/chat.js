/**
 * GET /chat
 */
exports.chat = (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public/chat') });
};