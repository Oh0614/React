const userKnex = require('../db/userKnex');
/**
 * menu list Get
 * NAVIGATION json 형태로 변환
 *
 * use_yn : true && (
 *  depse: 1 && (json 구성)
 *  depse: 2이상 && (json의 parent id 하위 json 구성)
 *  뿌릴때, id, icon, name, url (json)
 * )
 */

exports.getMenuList = async (req, res) => {
    try{
        const result = await userKnex('menu').select('*');

        res.json(result);
        console.log(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Database query failed', details: err.message });
    }
};
