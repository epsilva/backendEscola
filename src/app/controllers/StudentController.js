import User from '../models/User';
import File from '../models/File';
import Subject from '../models/Subject';

class StudentController {

    async index(req, res) {

        const providers = await User.findAll({
            where: {
                provider: false
            },
            attributes: [
                'id',
                'name',
                'email',
                'avatar_id'
            ],
            include: [{
                model: Subject,
                as: 'subject',
                attributes: [
                    'name'
                ]
            }, {
                model: File,
                as: 'avatar',
                attributes: [
                    'name',
                    'path',
                    'url'
                ]
            }]
        });

        return res.json(providers);

    }

}

export default new StudentController();
