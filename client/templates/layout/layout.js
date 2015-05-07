Template.layout.helpers({
	theme: function(){
		var theme = Session.get('userTheme');
		return theme;
	}
});
Template.layout.rendered = function(){
	if(!this._rendered){
		this._rendered = true;
		console.log('Template onLoad');
		Meteor.userId();
		  if(Meteor.userId()){
				var userId = Meteor.userId()
				var prefs = Preferences.findOne({ownerId: userId});
				if(prefs){
					console.log(prefs.theme);
					Session.set('userTheme', prefs.theme);
				}
		  }
	}
}
