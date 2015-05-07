Template.listItem.events({
	'click .delete': function(e){
		e.preventDefault();
		if(confirm('Delete this list?')){
			var currentList = this;
			Meteor.call('listDelete', currentList, function(error, result){
				if(error){
					console.log(error.reason);
					return throwError(error.reason);
				}
			});
		}
	},
	'click .edit': function(e){
		e.preventDefault();
		var currentList = this;
		console.log('detected edit request for', currentList);
	}
});