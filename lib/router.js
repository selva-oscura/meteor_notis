Router.configure({
  // basic template for all pages
  layoutTemplate: 'layout',
  // the loading template is displayed during loading of templates/data
  loadingTemplate: 'loading',
  // the not-found template is used for unknown routes and missing lists
  notFoundTemplate: 'not-found',
  // wait on the following subscriptions before rendering the page to ensure the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('lists'), Meteor.subscribe('preferences')
    ];
  }
});

Router.route('/', {
  name: 'home',
  template: 'listsIndex',
  subscriptions: function(){
    this.subscribe('lists').wait();
  }
});

Router.route('/preferences', {
  name: 'preferences',
  template: 'preferences',
  subscriptions: function(){
    this.subscribe('preferences').wait();
  }
});

Router.route('/new_list', {
  name: 'listNew', 
  template: 'listNew'
});

Router.route('/:_id', {
  name: 'listShow',
  waitOn: function(){
    return Meteor.subscribe('listAndItems', this.params._id);
  },
  data: function(){ return Lists.findOne(this.params._id); }
});

var requireLogin = function() {
    if (! Meteor.user()) {
      if(Meteor.loggingIn()){
        this.render(this.loadingTemplate);
      }else{
            this.render('accessDenied');
      }
    }else {
      this.next();
    }
}

// var permission = function(doc){
//   console.log(doc);
//   var user = Meteor.user();
//   console.log(user, user._id);
//   if(!ownsDocument(user._id, doc)){
//     this.render('accessDenied');
//   }else{
//     this.next;
//   }
// }

// ownsDocument = function(userId, doc){
//   return doc && doc.userId === userId;
// }

Router.onBeforeAction(requireLogin, {only: 'home'});
Router.onBeforeAction(requireLogin, {only: 'listNew'});
// Router.onBeforeAction(permission(this.params), {only: 'listShow'});