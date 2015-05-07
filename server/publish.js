Meteor.publish('lists', function(){
	// deprecated after own user accounts and restricting access to only the owner of the list/items
	// return Lists.find();
	// end deprecated inre user accounts
	return Lists.find({ownerId: this.userId});
});

Meteor.publish('singleList', function(id){
	// deprecated after own user accounts and restricting access to only the owner of the list/items
	// return Lists.find({_id: id});
	// end deprecated inre user accounts
	return Lists.find({$and: [{ownerId: this.userId},{_id: id}]});
});

Meteor.publish('items', function(listId){
	check(listId, String);
	// deprecated after own user accounts and restricting access to only the owner of the list/items
	// return Items.find({listId: listId});
	// end deprecated inre user accounts
	return Items.find({$and: [{ownerId: this.userId}, {listId: listId}]});
});

Meteor.publish('singleItem', function(id){mete
	//deprecated after own user accounts and restricting access to only the owner of the list/items
	// return Items.findOne({_id: id});
	// end deprecated inre user accounts
	return Items.findOne({$and: [{ownerId: this.userId}, {_id: id}]});
})

Meteor.publish('listAndItems', function(id){
	var ownedList = Lists.findOne({$and: [{ownerId: this.userId},{_id: id}]});
	if(ownedList){	
		return [
			//deprecated after own user accounts and restricting access to only the owner of the list/items
			// Lists.find({_id: id}),
			// Items.find({listId: id})
			// end deprecated inre user accounts
			Lists.find({$and: [{ownerId: this.userId},{_id: id}]}),
			Items.find({listId: id})
		];
	}else{
		return [];
	}
});

// Meteor.publish('userInfo', function(){
// 	var user = Users.findOne({_id: this.userId});
// 	return user.preferences;
// })

Meteor.publish('preferences', function(){
	// deprecated after own user accounts and restricting access to only the owner of the list/items
	// return Lists.find();
	// end deprecated inre user accounts
	return Preferences.find();
	// return Preferences.find({ownerId: this.userId});
	// return Preferences.find();
});