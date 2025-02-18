const knex = require("../db/knex");

exports.getDdlCalAuth = async (req, res) => {
    try {
        const result = await knex('View_DDL_CalAuth').select('*');

        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Database query failed' });
    }
};
