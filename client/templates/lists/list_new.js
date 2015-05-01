Template.listNew.events({
	'submit form': function(e){
		e.preventDefault();
		var now = new Date().getTime();
		var list = {
			ownerId: '123123123',
			name: $(e.target).find('[name=name]').val(),
			type: $(e.target).find('[name=type] option:selected').val(),
			createdAt: now
		}
		var newestList = Lists.insert(list);
		console.log(newestList);
	}
});