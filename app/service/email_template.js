'use strict';

const Service = require('egg').Service;
const uuidv4 = require('uuid/v4');

class EmailTemplateService extends Service {
  async create(params) {
    const ctx = this.ctx;
    params.templateId = uuidv4();
    params.creatorId = params.appId;
    const emailTemplate = new ctx.model.EmailTemplate(params);
    const result = await emailTemplate.save();
    return result;
  }
}

module.exports = EmailTemplateService;
