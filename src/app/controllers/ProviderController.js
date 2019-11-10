import User from '../models/User';
import File from '../models/File';
import Subject from '../models/Subject';
import { Sequelize } from 'sequelize';

class ProviderController {
    async index(req, res) {

        const { name } = req.query;
        const Op = Sequelize.Op;

        var conditionsProvider = {
            provider: true,
        }

        var conditionsProviderName = {
            provider: true,
            name: {
                [Op.like]: '%' + name + '%'
            }
        }

        if (name) {
            conditionsProvider = conditionsProviderName;
        }


        const providers = await User.findAll({
            where: conditionsProvider,
            include: [{
                model: File,
                as: 'avatar',
                attributes: [
                    'name',
                    'path',
                    'url'
                ]
            }]
        });

        const retorno = [];
        providers.map(provider => {
            const { id, name: nameUser, email, registration, avatar } = provider;
            retorno.push({
                id, name: nameUser, email, registration, avatar
            })
        });

        return res.json(retorno);
    }
}

export default new ProviderController();
