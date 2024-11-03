const project = require('../db/models/projects');
const user = require('../db/models/user');
const asyncErrorHanlder = require('../Utils/asyncErrorHandler');
const { cleanResult } = require('../Utils/helper');


module.exports.getProject = asyncErrorHanlder(async (req, res) => {

    const projects = await project.findAll({ include: user });
    res.status(200).json({
        status: 'success',
        count: projects.length,
        data: {
            projects,
        }
    });
});

module.exports.createProject = asyncErrorHanlder(async (req, res, next) => {
    const data = req.body;

    const newProject = await project.create({
        name: data.name,
        start_date: data.start_date,
        end_date: data.end_date,
        location: data.location,
        cost: data.cost,
        description: data.description,
        title: data.title,
        tags: data.tags,
        createdBy: req.user.id

    });

    res.status(201).json({
        status: 'success',
        project: cleanResult(newProject, 'deletedAt'),
    });
});
