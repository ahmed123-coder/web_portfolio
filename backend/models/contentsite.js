const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  siteName: { type: String, required: true },
  siteDescription: { type: String, required: true },
  hero:{ type: String, required: true },
  footer:{ type: String, required: true },
  contactEmail: { type: String, required: true },
  emailuser:{type: String, required: true},
  passworduser:{type: String, required: true},
  logo: { type: String, required: true }, // رابط الشعار
  selected :{type:String, enum:['selected', 'not selected'],default:"not selected" },
});

module.exports = mongoose.model('Site', siteSchema);