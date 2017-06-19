//these are a list of commands to correct basic mistakes in mongodb.

//use this to update all documents with column lastname 
db.myskills.updateMany({},
  {$set : {"image": "html5.png"}}
)
//use this to update only only 1 document with column lastname 
db.myskills.update({"title" : 'SASS'},
  {$set : {"image": "Sass-Logo.png"}}
)

//use this to rename column on all documents
db.mywebsitemessages.updateMany( {}, { $rename: { "name": "firstname" } } )

//use this to rename only only 1 document with column lastname 
db.mywebsitemessages.update( {}, { $rename: { "name": "firstname" } } )

db.myskills.update({},
  { $set: { "image": "htnl5.png" } },
  {
    upsert: false,
    multi: true
  }) 
