Meteor.publish('lists', function(){
	return Lists.find();
});

Meteor.publish('singleList', function(id){
	return Lists.find({_id: id});
});

Meteor.publish('items', function(listId){
	check(listId, String);
	return Items.find({listId: listId});
});

Meteor.publish('singleItem', function(id){
	return Items.findOne({_id: id});
})

Meteor.publish('listAndItems', function(id){
	return [
		Lists.find({_id: id}),
		Items.find({listId: id})
	];
});