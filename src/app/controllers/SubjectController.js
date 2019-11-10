import * as Yup from 'yup';
import Subject from '../../app/models/Subject';
import { Sequelize } from 'sequelize';


class SubjectController {

    async index(req, res) {

        const { name } = req.query;
        const Op = Sequelize.Op;

        var subjects = await Subject.findAll();

        if (name) {
            subjects = await Subject.findAll(
                {
                    where: {
                        name: {
                            [Op.like]: '%' + name + '%'
                        }
                    }
                }
            );
        }


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

        const subject = await Subject.findAll({
            where: {
                id: req.body.id
            }
        })

        await Subject.update({
            name: req.body.name
        }, {
            where: {
                id: req.body.id
            }
        })

        const response = await Subject.findAll();

        return res.json(response)
    }

    async delete(req, res) {

        const {id} = req.params;

        await Subject.destroy(
            {
                where: {
                    id
                }
            }
        );
        const response = await Subject.findAll();

        return res.json(response)
    }

}

export default new SubjectController();
