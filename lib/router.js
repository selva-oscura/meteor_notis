Router.configure({
  // basic template for all pages
  layoutTemplate: 'layout',
  // the loading template is displayed during loading of templates/data
  loadingTemplate: 'loading',
  //  // the not-found template is used for unknown routes and missing lists
  notFoundTemplate: 'not-found',
  // wait on the following subscriptions before rendering the page to ensure the data it's expecting is present
});

Router.route('/', {
  name: 'home',
  template: 'listsIndex',
  subscriptions: function(){
    this.subscribe('lists').wait();
  }
});
Router.route('/new_list', {
  name: 'listNew', 
  template: 'listNew'
});

Router.route('/:_id', {
  name: 'listShow',
  data: function(){ return Lists.findOne(this.params._id); }
});
