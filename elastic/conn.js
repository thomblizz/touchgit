const elasticsearch = require('elasticsearch');
module.exports = new elasticsearch.Client({
    //host: '0.0.0.0:9200',
    host: 'elasticsearch:9200',
    log: 'trace'
});