const keys = require('./keys');

module.exports = {
    PORT: process.env.PORT || 3001,
    DB: `mongodb://${keys.user}:${keys.password}@ds235732.mlab.com:35732/poster`,
}