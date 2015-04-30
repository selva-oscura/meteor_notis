Lists = new Meteor.Collection('lists');

Items = new Meteor.Collection('items');

Subitems = new Meteor.Collection('subitems');

UserPreferences = new Meteor.Collection('userPreferences');

// specs for collections
// Lists
// 	ownerId
// 	name
// 	type (simple, orderable, dated)
// 	createdAt

// Items
// 	listId
// 	ownerId
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