'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  appId: 'string',
  name: 'string',
  type: [ 'html', 'text' ],
  data: 'array',
  template: 'string',
};

class EmailTemplateController extends Controller {
  async create() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule);
    const appInfo = await ctx.model.AppInfo.findOne({ appId: ctx.request.body.appId });
    if (!appInfo) ctx.throw(403, 'The appId does not exist');
    const emailTemplate = await ctx.model.EmailTemplate.findOne({ name: ctx.request.body.name });
    if (emailTemplate) ctx.throw(409, 'The name has already existed');
    // 调用 service 创建一个 emailTemplate
    const result = await ctx.service.emailTemplate.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = {
      templateId: result.templateId,
    };
    ctx.status = 201;
  }
}
module.exports = EmailTemplateController;
