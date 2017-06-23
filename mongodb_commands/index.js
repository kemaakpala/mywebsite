//these are a list of commands to correct basic mistakes in mongodb.

//use this to update all documents with column lastname 
db.myskills.updateMany({},
  {$set : {"image": "html5.png"}}
)
//use this to update only only 1 document with column lastname 
db.myskills.update({"_id" : ObjectId("594bf1853b46911c207dc6b5")},
  {$set : {"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque velit, tempor at bibendum non. Loremipsum dolor sit amet."}}
)

//use this to rename column on all documents
db.mywebsitemessages.updateMany( {}, { $rename: { "name": "firstname" } } )

//use this to rename only only 1 document with column lastname 
db.mywebsitemessages.update( {}, { $rename: { "name": "firstname" } } )

db.myskills.update({},
  { $set: { "image": "html5.png" } },
  {
    upsert: false,
    multi: true
  }) 


db.myskills.find({"_id": ObjectId("594bf1853b46911c207dc6b5")}).pretty()