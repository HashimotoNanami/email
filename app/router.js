'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('email', '/api/email', controller.email);
  router.resources('emailTemplate', '/api/emailTemplate', controller.emailTemplate);
};