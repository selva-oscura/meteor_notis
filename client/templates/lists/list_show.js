// Template.listShow.helpers({
// 	lists: function(){
// 		return Lists.find();
// 		// return Lists.find();
// 	}
// });

// // Template.listLinks.helpers({
// // 	lists: function(){
// // 		return Lists.find({}, {sort: {submitted: 1}});
// // 	}
// // });
Template.listShow.helpers({
	items: function(){
		// console.log(items);
		return Items.find({}, {sort: {submitted: -1}});
	}
})