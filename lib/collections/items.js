Items = new Meteor.Collection('items');

Meteor.methods({
	itemCreate: function(itemAttributes){
		check(itemAttributes, {
			headline: String,
			details: String, 
			listId: String
		});

		// ensure the user is logged in
		var user = Meteor.user();
		if(!user){
			throw new Meteor.Error(401, "You need to log in to make a new list.");
		}

		// ensure owner owns list
		if(!userOwnsList(itemAttributes.listId)){
			console.log('err...failed userOwnsList', itemAttributes.listId);
			throw new Meteor.Error(422, 'You are not the owner of this list and are not authorised to add an item to the list')
		}

		// check that there is no previous item with the same content
		var itemExists = Items.findOne({$and: [{itemId: itemAttributes.itemId},{headline: itemAttributes.headline}]});
		if(itemExists){
			throw new Meteor.Error(422, 'You already have added this item to this list')
		}

		// pick out the whitelisted keys
		var item = _.extend(itemAttributes,{
			pending: true,
			createdAt: new Date()
		});
		var itemId = Items.insert(item);
	}
});

// Items
// 	listId
// 	headline
// 	detail
// 	pending (or should I use completed / checked)
// 	date or datetime (for dated list)
// 	order (for ordered lists)
// 	createdAt

// Subitems
// 	ownerId
// 	itemId
// 	text
// 	pending (or should I use completed / checked)
// 	date or datetime (for dated list)
// 	order (for ordered lists)
// 	createdAt