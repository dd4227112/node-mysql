'use strict';
const { Model } = require('sequelize');
const sequelize = require('../../config/database');
const table_structure = require('../table_structures/project_table_structure');
module.exports = sequelize.define('projects', table_structure, { paranoid: true, modelName: 'projects', schema: 'public' });