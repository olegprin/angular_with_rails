app.controller('CategoriesCtrl', ['$scope', 'Category', 'action', '$element', function ($scope, Category, action, $element) {
  var ctrl = this;

  action('index', function () {
    ctrl.groups = Category.get();
    
    ctrl.destroy_category=function(group) {
      if (confirm("Are you sure?"))
        Category.destroy({id: group.id})
    }
   
    
    ctrl.destroy_product=function(group) {
      if (confirm("Are you sure?"))
        Product.destroy({id: group.id})
    }
  })

  action('new', function () {
    $element.bind("keyup", function(event){
      var element = $element.find(".message_category")
      element.css("background-color", "yellow")
      console.log(event.keyCode);
      if (event.keyCode===27){
        $scope.$apply(function(){
          ctrl.category['title']=''
        }); 
      };  
    });
    
    ctrl.group = Category.new();
    ctrl.save = Category.create;








    $scope.operand1 = 0;
    $scope.operand2 = 0;
    $scope.add=function(){
      return ( $scope.operand1 + $scope.operand2 );
    };
    $scope.options = [0,1,2,3,4,5];
    
    $scope.optional=0;
    $scope.sum=[];
    $scope.valuer=0;
    $scope.suma=function(){
      $scope.sum.push(parseInt($scope.optional)); 
      alert($scope.sum)
    };
    $scope.$watch('sum', function(){
      $scope.valuer = $scope.sum.reduce(function(a,b){
        return (a + b);
      });
     }, true);  
    
  
    $element.bind("keyup", function(event){
      var element = $element.find(".message")
      element.css("background-color", "yellow")
      console.log(event.keyCode);
      if (event.keyCode===27){
        $scope.$apply(function(){
          $scope.message=""
        }); 
      };  
    });
    
    

    $scope.aut=true
    $scope.toggle=function(){
      $scope.aut = !$scope.aut;
    }; 
 


    
  })












  action('edit', function (params) {
    $element.bind("keyup", function(event){
      var element = $element.find(".message_category")
      element.css("background-color", "yellow")
      console.log(event.keyCode);
      if (event.keyCode===27){
        $scope.$apply(function(){
          ctrl.category['title']=''
        }); 
      };  
    });
    ctrl.category= Category.edit(params);
    ctrl.save = Category.update;
  })
}])