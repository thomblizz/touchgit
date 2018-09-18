const elastic = require('../conn');

const users = {

    crIndex: () => {

        elastic.indices.create({  
            index: 'users'
        },(err,res,st) => {
            if(err) console.log(err);
            else console.log("create",res);
        });

    },

    add: (usr) => {
        
        elastic.update({
            index: 'users', type: 'users', id: usr.login, body: {doc:usr, doc_as_upsert: true }
        },(err,results) => {
            console.log(err, results)
        });

        /*elastic.index({  
            index: 'users',
            type: 'users',
            body: usr
        },(err,resp,status) => {
            console.log(err, resp, status);
              
        });*/
    },

    search: () => {
        return new Promise((result, reject) => {
            
            elastic.search({  
                index: 'users',
                type: 'users'
            },(err, res,st) => {
                if (err) users.crIndex();
                else result(res.hits.hits.map((h) => {return h._source}));
            });
        });
        
  
    }

};

module.exports=users;



/*

client.indices.delete({index: 'gov'},function(err,resp,status) {  
  console.log("delete",resp);
});

*/