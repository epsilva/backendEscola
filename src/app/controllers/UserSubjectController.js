import User from '../models/User';
import * as Yup from 'yup';
import Subject from '../models/Subject';
import User from '../models/User';

class UserSubjectController {

    async indexSubjectByProvider(req, res) {

        const isProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!isProvider) {
            return res.status(401).json({ error: 'Only provider can load notifications' });
        }

        const user = await User.findAll({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Subject,
                    as: 'subject',
                    attributes: [
                        'id',
                        'name'
                    ]
                }
            ]
        });

        return res.json(user[0].subject);
    }


    async store(req, res) {

        const schema = Yup.object().shape({
            userId: Yup.number().required(),
            subjects: Yup.array().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' })
        }

        const { userId: userUpdateId, subjects } = req.body;

        const user = await User.findOne({ where: { id: req.userId, provider: true } });
        const userUpdate = await User.findOne({
            where: { id: userUpdateId }, include: {
                as: 'subject',
                model: Subject,
                attributes: [
                    'id',
                    'name'
                ]
            }
        });

        if (userUpdateId !== req.userId && !user) {
            return res.status(401).json({ error: 'User without permission for this operation' });
        }

        if (!userUpdate.provider) {
            return res.status(401).json({ error: 'Student invalid' });
        }

        userUpdate.setSubject(subjects);

        return res.json(userUpdate.subject);
    }

}

export default new UserSubjectController();
