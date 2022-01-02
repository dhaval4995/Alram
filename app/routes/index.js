module.exports = (app) => {
    const alram = require('../controllers/alram.controller.js');

    // Create a new Alram
    app.post('/alram', alram.create);

    // Retrieve all Alram
    app.get('/alram', alram.getAll);

    // Retrieve a single Alram with id
    app.get('/alram/:alramId', alram.findOne);

    // Update a Alram with id
    app.put('/alram/:alramId', alram.update);

    // Delete a Alram with if
    app.delete('/alram/:alramId', alram.delete);

    // Delete all alram
    app.delete('/alram', alram.deleteAll);
}