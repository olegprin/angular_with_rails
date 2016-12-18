app.controller('ProductsCtrl', ['$scope', 'Product', 'action', '$location', '$element', function ($scope, Product, action, $location, $element) {
  var ctrl = this;
  
  action('index', function (params) {
    ctrl.products = Product.get();

    ctrl.destroy_product=function(group) {
      if (confirm("Are you sure?"))
        Product.destroy({id: group.id})
    }

  })



  action('show', function (params) {   
    ctrl.theme = Product.get(params);
    ctrl.destroy = function (topic) {
      if (confirm("Вы уверены?"))
        Product.destroy({id: topic.id})
    }
  })

  action('new', function () {
    $element.bind("keyup", function(event){
      if (event.keyCode===27){
        $scope.$apply(function(){
          ctrl.product['description']=''
        }); 
      };  
    });

    Product.new(function (res) {
      ctrl.product = res;
      ctrl.product.category_id = $location.search().category_id;
    });
    ctrl.save = Product.create;
  })

  action('edit', function (params) {
    $element.bind("keyup", function(event){
      if (event.keyCode===27){
        $scope.$apply(function(){
          ctrl.product['description']=''
        }); 
      };  
    });
    ctrl.product_id = params.description
    ctrl.avatar_url = params.avatar_url
    ctrl.product = Product.edit(params);
    ctrl.save = Product.update;
  })
}])