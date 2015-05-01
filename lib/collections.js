Lists = new Meteor.Collection('lists');

Items = new Meteor.Collection('items');

Subitems = new Meteor.Collection('subitems');

UserPreferences = new Meteor.Collection('userPreferences');

Meteor.methods({
	listCreate: function(listAttributes){
		check(this.userId, String);
		check(listAttributes, {
			name: String,
			type: String
		});

		// check that there is no previous post with the same link
		var listExists = Lists.findOne({name: listAttributes.name});
		if(listExists){
			return {
				listExists: true,
				_id: listExists._id
			}
		}

		// ensure the user is logged in
		var user = Meteor.user();
		if(!user){
			console.log('not logged in');
			throw new Meteor.Error(401, "You need to log in to make a new list.");
		}

		// ensure the list has a name
		if(!listAttributes.name){
			throw new Meteor.Error(422, 'Please name your list.');
		}

		// ensure the post has a type
		if(!listAttributes.type){
			throw new Meteor.Error(422, 'Please select a list type.');
		}

		// pick out the whitelisted keys
		var list = _.extend(listAttributes,{
			ownerId: user._id,
			createdAt: new Date()
		});
		var listId = Lists.insert(list);

		return {
			_id: listId
		};
	},
	itemCreate: function(itemAttributes){
		console.log(itemAttributes);
		// check(this.userId, String);
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

		var userOwnsList = Lists.findOne({$and: [{ownerId: user._id}, {_id: itemAttributes.listId}]});
		if(!userOwnsList){
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


// specs for collections
// Lists
// 	ownerId
// 	name
// 	type (simple, orderable, dated)
// 	createdAt

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

// UserPreferences
// 	ownerId
// 	background -- different colours and images (e.g. yellow lined paper, parchment)
// 	font
// 	fontColor
// 	fontSize
// 	dateTime format (military versus am/pm)