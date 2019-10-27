import * as Yup from 'yup';
import Profile from '../models/Profile';


class ProfileController {

    async index(req, res) {
        const subjects = await Subject.findAll();

        return res.json(subjects);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' })
        }

        const profilesExistes = await Profile.findOne({ where: { name: req.body.name } });

        if (profilesExistes) {
            return res.status(400).json({ error: 'Profile already exists' });
        }

        const { id, name } = await Profile.create(req.body);
        return res.json({
            id,
            name
        });
    }

    async update(req, res) {
        return res.json();
    }

}

export default new ProfileController();
