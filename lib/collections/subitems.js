Subitems = new Meteor.Collection('subitems');

Meteor.methods({

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
