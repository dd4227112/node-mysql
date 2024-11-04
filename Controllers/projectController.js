const project = require('../db/models/projects');
const user = require('../db/models/user');
const appError = require('../Utils/appError');
const asyncErrorHanlder = require('../Utils/asyncErrorHandler');
const { cleanResult } = require('../Utils/helper');


module.exports.getProject = asyncErrorHanlder(async (req, res) => {

    const projects = await project.findAll({ include: user }, {
        attributes: {
            exclude: ['users.password', 'access_token', 'token_expire', 'deletedAt']
        }
    });
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

module.exports.getProjectById = asyncErrorHanlder(async (req, res, next) => {
    const id = req.params.id;
    const result = await project.findByPk(id, { include: user });
    if (!result) return next(new appError('Project Does not Exit', 404));
    res.status(200).json({
        status: 'success',
        data: {
            project: result
        }
    });

});

module.exports.updateProject = asyncErrorHanlder(async (req, res, next) => {
    const id = req.params.id;
    const requiredProject = await project.findByPk(id, { include: user });
    if (!requiredProject) return next(new appError('Project Does not Exit', 404));
    const data = req.body;

    requiredProject.name = data.name;
    requiredProject.start_date = data.start_date;
    requiredProject.end_date = data.end_date;
    requiredProject.location = data.location;
    requiredProject.description = data.description;
    requiredProject.title = data.title;
    requiredProject.tags = data.tags;
    const updatedProject = await requiredProject.save();
    res.status(200).json({
        status: 'success',
        data: {
            project: updatedProject
        }
    });

});


module.exports.deleteProject = asyncErrorHanlder(async (req, res, next) => {
    const id = req.params.id;
    const requiredProject = await project.findByPk(id, { include: user });
    if (!requiredProject) return next(new appError('Project Does not Exit', 404));

    await requiredProject.destroy();
    res.status(200).json({
        status: 'success',
        message: 'deleted'
    });
});