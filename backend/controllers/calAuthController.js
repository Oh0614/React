const knex = require('../db/knex');
const userKenx = require('../db/userKnex');

exports.getCalAuth = async (req, res) => {
    try {

        const result = await knex('CalAuth').select('*');
        res.json(result);

    } catch (err) {
        res.status(500).json({ message: 'Database query failed' });
    }
};

exports.getCalAuthDemo = async (req, res) => {
    try {

        const result = await userKenx('CalAuth').select('*');
        res.json(result);

    } catch (err) {
        res.status(500).json({ message: 'Database query failed' });
    }
};

exports.insertCalAuth = async (req, res) => {
    try{
        const value = req.body.params.value; //req.body는 post/put의 본문 params를 의미

        const result= await userKenx('CalAuth').insert(value);    //테스트용 임시 TABLE

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({ message: 'Database query failed'});
    }
};


exports.updateCalAuth = async (req, res) => {
    try{
        const value = req.body.params.value; //req.body는 post/put의 본문 params를 의미0
        console.log( value );

        const result= await userKenx('CalAuth').update(value.value).where(value.key, value[value.key]);    //테스트용 임시 TABLE

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Database query failed'});
    }
};

exports.deleteCalAuth = async (req, res) => {
    try{
        const value = req.body.params.value;
        console.log(value);

        const result = await userKenx('CalAuth').whereIn('CAL_INFO_ID', value).del();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Database query failed'});
    }
}