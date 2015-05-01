Template.listNew.events({
	'submit form': function(e){
		e.preventDefault();
		var list = {
			name: $(e.target).find('[name=name]').val(),
			type: $(e.target).find('[name=type] option:selected').val()
		}
		Meteor.call('listCreate', list, function(error, result){
			if(error){
				console.log(error.reason);
				return throwError(error.reason);
			}
			if(result.listExists){
				console.log('listExists');
				throwError('You already have a list with this name.');
			}
			// Router.go('listShow', {_id: result._id});
		});
	}
});