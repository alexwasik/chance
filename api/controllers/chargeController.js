'use strict';

const chargeService = require('../services/chargeService');
const htmlView = require('../views/htmlView');

const fetch = async (req, res) => {
  chargeService.fetch((err, message, rows) => {
    if (err) {
      res.status(400).json({ code: 400, message: err.message }).end();
    } else {
      res.send(htmlView.view(rows)).end();
    }
  });
};

const build = (req, res) => {
  const buildNum = req.params.count;
  if (!Number(buildNum).isNan) {
    chargeService.build(buildNum, (err, message) => {
      if (err) {
        return res.status(400).json({ code: 400, message: err.message }).end();
      }
      return res.status(200).json({ code: 200, message: message }).end();
    });
  }
  res.status(400).json({ code: 400, message: 'Count param must be integer' });
};

module.exports = {
  build: build,
  fetch: fetch
};
