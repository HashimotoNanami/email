'use strict';

const Service = require('egg').Service;
const ejs = require('ejs');

class EmailService extends Service {
  async create(params) {
    const ctx = this.ctx;
    const emailTemplate = await ctx.model.EmailTemplate.findOne({ templateId: params.templateId });
    if (emailTemplate.data && emailTemplate.data.length) {
      if (!params.data) ctx.throw(400, 'missing parameter: data');
      let missingParameter = [];
      for (let item of emailTemplate.data) {
        if (item.required && params.data[item.key] === undefined) missingParameter.push('body.' + item.key);
        if (!item.required && item.default !== undefined && params.data[item.key] === undefined) params.data[item.key] = item.default;
      }
      if (missingParameter.length) ctx.throw(400, `missing parameter: ${missingParameter.join()}`);
    }
    params[emailTemplate.type] = ejs.render(emailTemplate.template, params.data);
    const result = await this.sendEmail(params);
    return result;
  }
  async sendEmail(params) {
    console.log('======================success===================');
    console.log(params);
    return 'success';
  }
}

module.exports = EmailService;
