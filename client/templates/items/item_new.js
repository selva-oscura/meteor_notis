Template.itemNew.events({
	'submit form': function(e, template){
		e.preventDefault();
		var item = {
			listId: template.data._id,
			headline: $(e.target).find('[name=headline]').val(),
			details: $(e.target).find('[name=details]').val()
		}
		Meteor.call('itemCreate', item, function(error, result){
			if(error){
				console.log(error.reason);
				return throwError(error.reason);
			}
		});
	}
});