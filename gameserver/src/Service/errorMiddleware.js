// configuring error handling middleware

// setup takes express app as argument
const setup = (app) => {
  app.use((error, req, res, next) => {
    // in the future, the response format should be in the format
    // the requester wants (html/json/xml, etc)
    res.status(500).json({ message: error.message });
  });
};

module.exports = { setup };
