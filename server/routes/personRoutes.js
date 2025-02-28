const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// CREATE
router.post('/', async (req, res) => {
    try {
        const person = new Person(req.body);
        const savedPerson = await person.save();
        res.status(201).json(savedPerson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) return res.status(404).json({ message: 'Person not found' });
        res.json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!person) return res.status(404).json({ message: 'Person not found' });
        res.json(person);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) return res.status(404).json({ message: 'Person not found' });
        res.json({ message: 'Person deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;