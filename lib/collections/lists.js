Lists = new Meteor.Collection('lists');

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
	listDelete: function(listAttributes){
		// check that the userId specified owns the document
		if(userOwnsList(listAttributes)){
			Items.find({listId: listAttributes}).forEach(function(item){
				Items.remove(item._id);
			});
			Lists.remove(listAttributes);
		}else{
			throw new Meteor.Error(422, "You are not the owner of this list and are not authorised to delete it.")
		}
	}
});


// specs for collections
// Lists
// 	ownerId
// 	name
// 	type (simple, orderable, dated)
// 	createdAt