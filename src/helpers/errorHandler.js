function handleServerError(err, res) {
    console.error(err.message);
    res.status(500).send(err.message);
}

module.exports = { handleServerError };