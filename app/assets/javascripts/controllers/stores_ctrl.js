app.controller('StoresCtrl', ['$scope', 'Product', 'action', '$location', '$element', function ($scope, Store, action, $location, $element) {
  var ctrl = this;
  
  action('index', function () {
    ctrl.products = Store.get();
  })

}])
