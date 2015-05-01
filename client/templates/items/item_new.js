Template.itemNew.events({
	'submit form': function(e, template){
		e.preventDefault();
		var now = new Date().getTime();
		var item = {
			ownerId: '123123123',
			listId: template.data._id,
			headline: $(e.target).find('[name=headline]').val(),
			details: $(e.target).find('[name=details]').val(),
			createdAt: now
		}
		var newestItem = Items.insert(item);
	}
});