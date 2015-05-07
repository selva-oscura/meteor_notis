// check that the current User is the document's owner
userOwnsList = function(listId){
	var currentUser=Meteor.user()
	return Lists.find({$and: [{ownerId: currentUser._id}, {_id: listId}]});
}