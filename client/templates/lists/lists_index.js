Template.listsIndex.helpers({
	lists: function(){
		return Lists.find({}, {sort: {submitted: 1}});
	}
});