Session.setDefault('userTheme', 'default-theme');
Deps.autorun(function(){
  if(Meteor.userId()){
		var userId = Meteor.userId()
		var prefs = Preferences.findOne({ownerId: userId});
		if(prefs){
			console.log(prefs.theme);
			Session.set('userTheme', prefs.theme);
		}
  }
});