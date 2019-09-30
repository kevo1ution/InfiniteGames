const objectId = require('mongodb').ObjectID;
const fs = require('fs');
const mockCampaign = require('./mockCampaign.json');
const mockUser = require('./mockUser.json');
const mockMerchant = require('./mockMerchant.json');
// iterate and generate id's
for (let i = 0; i < mockUser.length; i++) {
  mockUser[i]._id = objectId();
}

for (let i = 0; i < mockCampaign.length; i++) {
  mockCampaign[i]._id = objectId();
}

for (let i = 0; i < mockMerchant.length; i++) {
  mockMerchant[i]._id = objectId();
}

fs.writeFile('./mockCampaign.json', JSON.stringify(mockCampaign, null, 2));
fs.writeFile('./mockUser.json', JSON.stringify(mockUser, null, 2));
fs.writeFile('./mockMerchant.json', JSON.stringify(mockMerchant, null, 2));
