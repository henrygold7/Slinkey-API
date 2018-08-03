const validate = require('express-jsonschema').validate;
const schemes = require('../validate');
const getFav = require("../../my-app/src/cheerio.js"); 
const getHeadline = require("../../my-app/src/headline.js")
module.exports = function(app, db) {
console.log("Entering controllers...");
// --- users -------------------------------------------------------------------------------
    
    app.post('/users', validate({body: schemes.userPost}), (req, res) => {
        console.log("Entering post users...");
        const user = [ req.body.username, req.body.password, req.body.firstname ];
        db.query('INSERT INTO users(username, password, firstname) VALUES($1, $2, $3) RETURNING *', user, 
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.json(result.rows[0]);
                }
            });
    });
    app.patch('/users/:id', validate({params: schemes.get_or_delete}), validate({body: schemes.userPatch}), (req, res) => {
        console.log("Entering patch user ...");
        const name = req.body.firstname;
        const pic = req.body.propic;
        const user = req.body.username;
        var str = (name && pic && user) ? 'firstname=\''+name+'\', propic=\''+pic+'\', username=\''+user+'\'' ://err at propic
                  (name && pic && !user) ? 'firstname=\''+name+'\', propic=\''+pic+'\'' ://err at propic
                  (name && user) ? 'firstname=\''+name+'\', username=\''+user+'\'' ://err at username
                  (name) ? 'firstname=\''+name+'\'' ://good
                  (pic && user) ? 'propic=\''+pic+'\', username=\''+user+'\'' : //err at username
                  (pic) ? 'propic=\''+pic+'\'' ://good
                  (user) ? 'username=\''+user+'\'' : '' ;//good
        const id = req.params.id;
        db.query('UPDATE users SET '+str+' WHERE id=$1 RETURNING *', [id],  
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has opccured"});
                }
                else {
                    res.json(result.rows[0]);
                }
            });
    });
    app.get('/users/:id', validate({params: schemes.get_or_delete}) ,(req, res) => {
        console.log("Entering get user ...");
        const id = req.params.id;
        db.query('SELECT * FROM users WHERE id = $1', [id], 
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.json(result.rows[0]);
                }
            });   
    });
    app.get('/users', (req, res) => {
        console.log("Entering list users ...");
        var str = '';
        if (req.query.username){
            str = 'WHERE username = \''+req.query.username+'\'';
        }
        db.query('SELECT * FROM users '+str+' ',
            function(err, result) { 
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.json(result.rows);
                }
            });   
    });
    app.delete('/users/:id', validate({params: schemes.get_or_delete}) ,(req, res) => {
        console.log("Entering delete user ...");
        const id = req.params.id;
        db.query('DELETE FROM users WHERE id = $1', [id],
            function(err, result){
                if(err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.send("user "+id+" deleted!");
                }
            });
    });

// --- folders -----------------------------------------------------------------------------

    app.post('/folders', validate({body: schemes.folderPost}) ,(req, res) => {
        console.log("Entering post folder ...");
        const folder = [ req.body.user_id, req.body.name];
        db.query('INSERT INTO folders(user_id, name) VALUES($1, $2) RETURNING *', folder, 
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.json(result.rows[0]);
                }
            });
    });
    app.get('/folders/:id', validate({params: schemes.get_or_delete}) , async (req, res) => {
        console.log("Entering get folder ...");
        const id = req.params.id;
        // db.query('SELECT * FROM folders WHERE id = $1 ', [id], 
        //     function(err, result) {
        //         if (err) {
        //             console.log(err);
        //             res.json({"error": "an error has occured"});
        //         }
        //         else {
        //             res.json(result.rows[0]);
        //         }
        //     });
        try {
            const result = await db.query('SELECT * FROM folders WHERE id = $1', [id]);
            res.send(result.rows[0]);
            console.log(" -- HERE --");
        } catch (e) {
            console.log(" -- HERE2 --");
            next(e);
        }   
    });
    app.get('/folders', validate({query: schemes.folderList }), (req, res) => {
        console.log("Entering list folders ...");
        // console.log(req);
        debugger;
        var str = '';
        if (req.query.user_id){
            str = 'WHERE user_id = \''+req.query.user_id+'\'';
        }
        db.query('SELECT * FROM folders '+str+' ORDER BY \"order\" ',
            function(err, result) { 
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.json(result.rows);
                }
            });   
    });
    app.delete('/folders/:id', validate({params: schemes.get_or_delete}) ,(req, res) => {
        console.log("Entering delete folder ...");
        const id = req.params.id;
        db.query('DELETE FROM folders WHERE id = $1', [id],
            function(err, result){
                if(err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.send("folder "+id+" deleted!");
                }
        });
        
    });
    app.patch('/folders/:id', validate({params: schemes.get_or_delete}), validate({body: schemes.folderPatch}) , (req,res) => {
        console.log("Entering patch folder ...");
        const name = req.body.name;
        const id = req.params.id;
        db.query('UPDATE folders SET name=$1 WHERE id=$2 RETURNING *', [name, id], 
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has opccured"});
                }
                else {
                    res.json(result.rows[0]);
                }
            });
    });

// --- links -------------------------------------------------------------------------------

    app.post('/links', validate({body: schemes.linkPost}) , async (req, res) => {
        console.log("Entering post link ...");
        const img = await getFav(req.body.url)
        var headline = await getHeadline(req.body.url); 
        headline = headline.substr(0, 135);
        if (headline.length === 135){ headline += '...'}
        const link = [ req.body.user_id, req.body.url, img, headline];
        db.query('INSERT INTO links(user_id, url, img, headline) VALUES($1, $2, $3, $4) RETURNING *', link, 
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.json(result.rows[0]);
                }
            });
    });   
    app.get('/links/:id', validate({params: schemes.get_or_delete}) ,(req, res) => {
        console.log("Entering get link ...");
        console.log("id passed to get link: ",req.params.id)
        const id = req.params.id;
        db.query('SELECT * FROM links WHERE id = $1', [id], 
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    console.log("get link sending: ",result.rows[0])
                    res.json(result.rows[0]);
                }
            });   
    });
    app.get('/links', validate({query: schemes.linkList}), (req, res) => {
        console.log("Entering list links ...");
        const offset = req.query.offset;
        var str = '';
        if (req.query.user_id){
            str = 'WHERE user_id = \''+req.query.user_id+'\'';
        }
        db.query('SELECT * FROM links '+str+' ORDER BY id LIMIT all OFFSET $1', [offset], 
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.json(result.rows);
                }
            });   
    });
    app.delete('/links/:id', validate({params: schemes.get_or_delete}) ,(req, res) => {
        console.log("Entering delete link ...");
        const id = req.params.id;
        db.query('DELETE FROM links WHERE id = $1', [id],
            function(err, result){
                if(err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.send("link "+id+" deleted!");
                }
            });
    });

// --- link_on_folders ---------------------------------------------------------------------

    app.post('/link_on_folders', (req, res) => {
        console.log("Entering post link_on_folder");
        const link_on_folder = [ req.body.link_id, req.body.folder_id];
        db.query('INSERT INTO link_on_folders(link_id, folder_id) VALUES($1, $2) RETURNING *', link_on_folder, 
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.json(result.rows[0]);
                }
            });
    });
    app.get('/link_on_folders/:id', validate({params: schemes.get_or_delete}) ,(req, res) => {
        console.log("Entering get link_on_folder ...");
        const id = req.params.id;
        db.query('SELECT * FROM link_on_folders WHERE id = $1', [id], 
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.json(result.rows[0]);
                }
            });   
    });
    app.get('/link_on_folders', validate({query: schemes.link_on_foldersList}), (req, res) => {
        console.log("Entering list link_on_folders ...");
        const offset = req.query.offset;
        var str = '';
        if (req.query.folder_id) {
            str = 'WHERE folder_id = \'' + req.query.folder_id + '\'';
        }
        db.query('SELECT * FROM link_on_folders '+str+' ORDER BY \"order\" DESC LIMIT 12 OFFSET $1', [offset],  
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.send(result.rows);
                }
            });   
    });
    app.delete('/link_on_folders/:id', validate({params: schemes.get_or_delete}) ,(req, res) => {
        console.log("Entering delete link_on_folder ...");
        const id = req.params.id;
        db.query('DELETE FROM link_on_folders WHERE id = $1', [id],
            function(err, result){
                if(err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.send("link_on_folder "+id+" deleted!");
                }
            })
    });
    app.delete('/link_on_folders', validate({query: schemes.link_on_foldersList}) ,(req, res) => {
        console.log("Entering delete link_on_folders ...");
        var str = '';
        if (req.query.folder_id) {
            str = 'WHERE folder_id = \'' + req.query.folder_id + '\'';
        }
        else if(req.query.link_id){
            str = 'WHERE link_id = \'' + req.query.link_id + '\''
        }
        db.query('DELETE FROM link_on_folders '+str,
            function(err, result){
                if(err) {
                    console.log(err);
                    res.json({"error": "an error has occured"});
                }
                else {
                    res.send("link_on_folders deleted!");
                }
            })
    });
    app.use(function (err, req, res, next) {
        console.error(err);
        // if json schema validation err send 400 as name
        res.status(500).json(err);
      });
}; 




// function(req, res, next) {
//     var validations = {};
//     Object.keys(schemas).forEach(function(requestProperty) {
//         var schema = schemas[requestProperty],
//             validation;

//         validation = validator.validate(
//             req[requestProperty],
//             schema,
//             {propertyName: 'request.' + requestProperty}
//         );
//         if (!validation.valid) {
//             validations[requestProperty] = validation;
//         }
//     });
//     if (Object.keys(validations).length) {
//         next(new JsonSchemaValidation(validations));
//     } else {
//         next();
//     }
// }
