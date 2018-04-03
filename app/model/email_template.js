'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const EmailTemplateSchema = new Schema({
    templateId: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true, index: true, unique: true },
    type: { type: String, required: true }, // html or text
    /* data example:
    * [
    *   {key: 'name', required: true},
    *   {key: 'companyName', required: false, default: '5th'}
    * ]
    * */
    data: { type: [{}] },
    template: { type: String, required: true },
    creatorId: { type: String, required: true },
    lastEditorId: { type: String },
    created: { type: Date, default: Date.now },
    updated: { type: Date },
  }, { versionKey: false });

  return mongoose.model('EmailTemplate', EmailTemplateSchema);
};
