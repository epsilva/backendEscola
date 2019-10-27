import User from '../models/User';
import * as Yup from 'yup';
import Subject from '../models/Subject';

class UserSubjectController {

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
        const userUpdate = await User.findOne({ where: { id: userUpdateId }, include: {
            as: 'subject',
            model: Subject
        } });

        if (userUpdateId !== req.userId && !user) {
            return res.status(401).json({ error: 'User without permission for this operation' });
        }

        if (!userUpdate.provider) {
            return res.status(401).json({ error: 'Student invalid' });
        }

        userUpdate.setSubject(subjects);

        return res.json(userUpdate);
    }

}

export default new UserSubjectController();
