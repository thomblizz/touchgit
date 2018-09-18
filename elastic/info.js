const elastic = require('./conn');
elastic.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});
