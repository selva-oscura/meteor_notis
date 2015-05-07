Template.preferences.events({
	'change #theme': function(e){
		e.preventDefault();
		var preferences={
			theme: $(e.target).find('option:selected').val()
		}
		console.log(preferences);
		Meteor.call('themePreferencessUpdate', preferences, function(error, result){
			if(error){
				console.log(error.reason);
				return throwError(error.reason);
			}else{
				$(e.target).find('[name=theme]').val('');
			}
		});
	}
});

// UserPreferences
// 	ownerId
// 	background -- different colours and images (e.g. yellow lined paper, parchment)
// 	font
// 	fontColor
// 	fontSize
// 	dateTime format (military versus am/pm)