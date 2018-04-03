'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  appId: 'string',
  templateId: 'string',
  data: { type: 'object', required: false },
  mailOptions: {
    type: 'object',
    required: true,
    rule: {
      user: 'email',
      pass: 'password',
      from: 'string',
      to: {
        type: 'array',
        itemType: 'email',
        required: true,
        min: 1,
      },
      subject: 'string',
    },
  },
};

class EmailController extends Controller {
  async create() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule);
    const appInfo = await ctx.model.AppInfo.findOne({ appId: body.appId });
    if (!appInfo) ctx.throw(403, 'The appId does not exist');
    const emailTemplate = await ctx.model.EmailTemplate.findOne({ templateId: body.templateId });
    if (!emailTemplate) ctx.throw(400, 'The templateId does not exist');
    const result = await ctx.service.email.create(body);
    // 设置响应体和状态码
    ctx.body = {
      result,
    };
    ctx.status = 201;
  }
}
module.exports = EmailController;
