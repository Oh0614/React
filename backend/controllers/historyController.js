const knex = require("../db/knex");

exports.getHistory = async (req, res) => {
    try {
        const result = await knex('History').select('*');

        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Database query failed' });
    }
};
