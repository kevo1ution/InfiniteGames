// campaign
const express = require('express');
const path = require('path');

const PATH_FRONTEND = '/../../../client';

const setup = (app) => {
  app.use(express.static(path.join(__dirname, PATH_FRONTEND, 'build')));

  app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, PATH_FRONTEND, 'build', 'index.html'));
  });
};

module.exports = { setup };
