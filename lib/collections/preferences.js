Preferences = new Meteor.Collection('preferences');

Meteor.methods({
	themePreferencessUpdate: function(prefAttributes){
		check(prefAttributes, {
			theme: String
		});

		// ensure the user is logged in
		var user = Meteor.user();
		if(!user){
			console.log('not logged in');
			throw new Meteor.Error(401, "You need to log in to make a new list.");
		}
		var themeOptions = ['default-theme', 'blue-theme', 'yellow-theme'];
		var match=false;
		for(var i=0; i<themeOptions.length; i++){
			if(themeOptions[i]===prefAttributes.theme){
				match = true;
			}
		}
		if(match===false){
			throw new Meteor.Error(422, 'Not a valid theme.');
		}else{
			pref = {
				ownerId:user._id,
				theme: prefAttributes.theme
			}
			console.log('prefs to plug into Preferences', pref)
			var prefId = Preferences.findOne({ownerId: user._id});
			if(prefId){
				console.log('prefId', prefId);
				Preferences.update(
					{_id: prefId._id},
					{$set: pref}
				);
			}else{
				console.log('no pref id yet');
				var aSparklingNewPrefId = Preferences.insert(pref);
				console.log('aSparklingNewPrefId',aSparklingNewPrefId);
			}
		}
	}
});

// Preferences
// 	ownerId
// 	theme -- different colours and images (e.g. yellow lined paper, parchment)
// 	font
// 	fontColor
// 	fontSize
// 	dateTime format (military versus am/pm)