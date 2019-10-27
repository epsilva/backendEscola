import * as Yup from 'yup';
import Subject from '../../app/models/Subject';


class SubjectController {

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

        const subjectExistes = await Subject.findOne({ where: { name: req.body.name } });

        if (subjectExistes) {
            return res.status(400).json({ error: 'Subject already exists' });
        }

        const { id, name } = await Subject.create(req.body);
        return res.json({
            id,
            name
        });
    }

    async update(req, res) {
        return res.json();
    }

}

export default new SubjectController();
