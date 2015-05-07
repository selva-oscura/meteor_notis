Template.listNew.events({
	'submit form': function(e){
		e.preventDefault();
		var list = {
			name: $(e.target).find('[name=name]').val(),
			type: $(e.target).find('[name=type] option:selected').val()
		}
		Meteor.call('listCreate', list, function(error, result){
			if(error){
				return throwError(error.reason);
			}else{			
				$(e.target).find('[name=name]').val('');
				$(e.target).find('[name=type]').val('');
			}
		});
	}
});