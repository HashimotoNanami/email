'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AppInfoSchema = new Schema({
    appId: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true, index: true, unique: true },
    info: { type: Object, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date },
  }, { versionKey: false });

  return mongoose.model('AppInfo', AppInfoSchema);
};
