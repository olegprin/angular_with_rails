app.controller('MessagestoadministratorsCtrl', ['$scope', 'Messagestoadministrator', 'action', function ($scope, Messagestoadministrator, action) {
  var ctrl = this;

  action('index', function () {
    ctrl.messagestoadministrators = Messagestoadministrator.get();
  
    ctrl.destroy_category=function(group) {
      if (confirm("Are you sure?"))
        Messagestoadministrator.destroy({id: group.id})
    }
  })

  action('new', function () {
    ctrl.group = Messagestoadministrator.new();
    ctrl.save = Messagestoadministrator.create;
  })

  action('edit', function (params) {
    ctrl.category= Messagestoadministrator.edit(params);
    ctrl.save = Messagestoadministrator.update;
  })
}])