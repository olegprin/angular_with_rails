(function() {
  angular.module("oxymoron.config.http", [])
  .config(['$httpProvider', '$locationProvider', '$stateProvider', function($httpProvider, $locationProvider, $stateProvider) {
    /*
     *  Set token for AngularJS ajax methods
    */
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';
    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
  }])

  .config(["$httpProvider", function ($httpProvider) {
      $httpProvider.defaults.transformResponse.push(function(responseData){
          convertDateStringsToDates(responseData);
          return responseData;
      });
  }]);

  var regexIso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

  function convertDateStringsToDates(input) {
      // Ignore things that aren't objects.
      if (typeof input !== "object") return input;

      for (var key in input) {
          if (!input.hasOwnProperty(key)) continue;

          var value = input[key];
          var match;
          // Check for string properties which look like dates.
          // TODO: Improve this regex to better match ISO 8601 date strings.
          if (typeof value === "string" && (match = value.match(regexIso8601))) {
              // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
              var milliseconds = Date.parse(match[0]);
              if (!isNaN(milliseconds)) {
                  input[key] = new Date(milliseconds);
              }
          } else if (typeof value === "object") {
              // Recurse into object
              convertDateStringsToDates(value);
          }
      }
  }
angular.module("oxymoron.config.states", [])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    /*
     *  Enable HTML5 History API
    */
    $locationProvider.html5Mode({enabled: true, requireBase: false});

    /*
     *  $stateProvider Rails
    */
    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] === '/';

      //for later access in tempalteUrl callback
      $stateProvider.oxymoron_location = $location;

      if(hasTrailingSlash) {
        var newPath = path.substr(0, path.length - 1); 
        return newPath; 
      }
    });

    var resolve = function (action, $stateParams) {
      return function (actionNames, callback) {
        try {
          var actionNames = angular.isArray(actionNames) ? actionNames : [actionNames];
          
          if (actionNames.indexOf(action)!=-1) {
            callback($stateParams);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    $stateProvider.rails = function () {
      $stateProvider
      
        .state('new_user_session_path', {
          url: '/users/sign_in',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_session_path'](params);
          },
          controller: 'AuthSessionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('user_digitalocean_omniauth_authorize_path', {
          url: '/users/auth/digitalocean',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_digitalocean_omniauth_authorize_path'](params);
          },
          controller: 'DeviseOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('passthru', $stateParams)
            }]
          }
        })
      
        .state('user_digitalocean_omniauth_callback_path', {
          url: '/users/auth/digitalocean/callback',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_digitalocean_omniauth_callback_path'](params);
          },
          controller: 'DeviseOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('digitalocean', $stateParams)
            }]
          }
        })
      
        .state('user_google_oauth2_omniauth_authorize_path', {
          url: '/users/auth/google_oauth2',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_google_oauth2_omniauth_authorize_path'](params);
          },
          controller: 'DeviseOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('passthru', $stateParams)
            }]
          }
        })
      
        .state('user_google_oauth2_omniauth_callback_path', {
          url: '/users/auth/google_oauth2/callback',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_google_oauth2_omniauth_callback_path'](params);
          },
          controller: 'DeviseOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('google_oauth2', $stateParams)
            }]
          }
        })
      
        .state('user_facebook_omniauth_authorize_path', {
          url: '/users/auth/facebook',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_facebook_omniauth_authorize_path'](params);
          },
          controller: 'DeviseOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('passthru', $stateParams)
            }]
          }
        })
      
        .state('user_facebook_omniauth_callback_path', {
          url: '/users/auth/facebook/callback',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_facebook_omniauth_callback_path'](params);
          },
          controller: 'DeviseOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('facebook', $stateParams)
            }]
          }
        })
      
        .state('new_user_password_path', {
          url: '/users/password/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_password_path'](params);
          },
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_password_path', {
          url: '/users/password/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_user_password_path'](params);
          },
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('cancel_user_registration_path', {
          url: '/users/cancel',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['cancel_user_registration_path'](params);
          },
          controller: 'AuthRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('cancel', $stateParams)
            }]
          }
        })
      
        .state('new_user_registration_path', {
          url: '/users/sign_up',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_registration_path'](params);
          },
          controller: 'AuthRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_registration_path', {
          url: '/users/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_user_registration_path'](params);
          },
          controller: 'AuthRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('messagestoadministrators_path', {
          url: '/messagestoadministrators',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['messagestoadministrators_path'](params);
          },
          controller: 'MessagestoadministratorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_messagestoadministrator_path', {
          url: '/messagestoadministrators/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_messagestoadministrator_path'](params);
          },
          controller: 'MessagestoadministratorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_messagestoadministrator_path', {
          url: '/messagestoadministrators/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_messagestoadministrator_path'](params);
          },
          controller: 'MessagestoadministratorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('messagestoadministrator_path', {
          url: '/messagestoadministrators/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['messagestoadministrator_path'](params);
          },
          controller: 'MessagestoadministratorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('categories_path', {
          url: '/categories',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['categories_path'](params);
          },
          controller: 'CategoriesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_category_path', {
          url: '/categories/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_category_path'](params);
          },
          controller: 'CategoriesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_category_path', {
          url: '/categories/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_category_path'](params);
          },
          controller: 'CategoriesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('category_path', {
          url: '/categories/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['category_path'](params);
          },
          controller: 'CategoriesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('products_path', {
          url: '/products',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['products_path'](params);
          },
          controller: 'ProductsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_product_path', {
          url: '/products/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_product_path'](params);
          },
          controller: 'ProductsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_product_path', {
          url: '/products/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_product_path'](params);
          },
          controller: 'ProductsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('product_path', {
          url: '/products/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['product_path'](params);
          },
          controller: 'ProductsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('home_index_path', {
          url: '/home/index',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['home_index_path'](params);
          },
          controller: 'HomeCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('stores_index_path', {
          url: '/stores/index',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['stores_index_path'](params);
          },
          controller: 'StoresCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('stores_all_category_path', {
          url: '/stores/all_category',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['stores_all_category_path'](params);
          },
          controller: 'StoresCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('all_category', $stateParams)
            }]
          }
        })
      
        .state('stores_contact_path', {
          url: '/stores/contact',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['stores_contact_path'](params);
          },
          controller: 'StoresCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('contact', $stateParams)
            }]
          }
        })
      
        .state('touch_users_path', {
          url: '/users/touch',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['touch_users_path'](params);
          },
          controller: 'UsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('touch', $stateParams)
            }]
          }
        })
      
        .state('metrics_users_path', {
          url: '/users/metrics',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['metrics_users_path'](params);
          },
          controller: 'UsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('metrics', $stateParams)
            }]
          }
        })
      
        .state('users_path', {
          url: '/users',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['users_path'](params);
          },
          controller: 'UsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('user_path', {
          url: '/users/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_path'](params);
          },
          controller: 'UsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('finish_signup_path', {
          url: '/users/:id/finish_signup',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['finish_signup_path'](params);
          },
          controller: 'UsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('finish_signup', $stateParams)
            }]
          }
        })
      
        .state('root_path', {
          url: '/',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['root_path'](params);
          },
          controller: 'StoresCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_configurable_path', {
          url: '/admin/configurable/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_admin_configurable_path'](params);
          },
          controller: 'AdminConfigurablesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_configurable_path', {
          url: '/admin/configurable/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_admin_configurable_path'](params);
          },
          controller: 'AdminConfigurablesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('rails_mailers_path', {
          url: '/rails/mailers',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_mailers_path'](params);
          },
          controller: 'RailsMailersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('rails_info_properties_path', {
          url: '/rails/info/properties',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_info_properties_path'](params);
          },
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('properties', $stateParams)
            }]
          }
        })
      
        .state('rails_info_routes_path', {
          url: '/rails/info/routes',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_info_routes_path'](params);
          },
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('routes', $stateParams)
            }]
          }
        })
      
        .state('rails_info_path', {
          url: '/rails/info',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_info_path'](params);
          },
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
      return $stateProvider;
    }
  }])

  .config(['$provide',
    function($provide) {
      $provide.decorator('$state', ['$delegate', function($delegate) {
        var state = $delegate;
        state.baseGo = state.go;

        var go = function(to, params, options) {
          options = options || {};

          if (state.defaultParams) {
            var defaultParams = angular.copy(state.defaultParams);
            params = angular.extend(defaultParams, params);
          }

          options.inherit = false;

          state.baseGo(to, params, options);
        };
        state.go = go;

        return $delegate;
      }]);
    }
  ])
angular.module("oxymoron.config.debug", [])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(true);
}]);

angular.module("oxymoron.config", ['oxymoron.config.http', 'oxymoron.config.states', 'oxymoron.config.debug'])

  angular.module("oxymoron.services.interceptor", [])
  .factory('httpInterceptor', ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
    return {
      request: function (config) {
        $rootScope.$broadcast('loading:progress');
        return config || $q.when(config);
      },
      response: function (response) {
        $rootScope.$broadcast('loading:finish', response);
        return response || $q.when(response);
      },
      responseError: function (response) {
        $rootScope.$broadcast('loading:error', response);
        return $q.reject(response);
      }
    };
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }])
angular.module("oxymoron.services.resources", [])
  .factory('resourceDecorator', [function () {
    return function(resource) {
      return resource;
    };
  }])

  
    .factory('Messagestoadministrator', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/messagestoadministrators/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/messagestoadministrators/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/messagestoadministrators/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('Category', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/categories/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/categories/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/categories/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('Product', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/products/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/products/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/products/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('User', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/users/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/users/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/users/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        },
        "touch" : {
          "url" : "/users/touch.json",
          "isArray" : null,
          "method" : "GET"
        },
        "metrics" : {
          "url" : "/users/metrics.json",
          "isArray" : null,
          "method" : "GET"
        },
        "rate" : {
          "url" : "/users/:id/rate.json",
          "isArray" : null,
          "method" : "PUT"
        },
        "ban" : {
          "url" : "/users/:id/ban.json",
          "isArray" : null,
          "method" : "PUT"
        },
        "unban" : {
          "url" : "/users/:id/unban.json",
          "isArray" : null,
          "method" : "PUT"
        },
        "finish_signup" : {
          "url" : "/users/:id/finish_signup.json",
          "isArray" : null,
          "method" : "GET"
        }
      }));
    }])
  
angular.module("oxymoron.services.sign", [])
  .service('Sign', ['$http', function ($http) {
    var Sign = this;

    Sign.out = function (callback) {
      $http.delete(Routes.destroy_user_session_path())
        .success(function () {
          if (callback)
            callback()
        })
    }

    Sign.in = function (user_params, callback) {
      $http.post(Routes.user_session_path(), {user: user_params})
        .success(function () {
          if (callback)
            callback();
        })
    }

    Sign.up = function (user_params, callback) {
      $http.post(Routes.user_registration_path(), {user: user_params})
        .success(function () {
          if (callback)
            callback();
        })
    }
  }])
angular.module("oxymoron.services.validate", [])
  .factory('Validate', [function(){
    return function (form, errors){
      try {
        var $form = angular.element(document.querySelector('[name="'+form+'"]')).scope()[form];
      } catch(e) {
        var $form = {};
      }

      angular
        .element(document.querySelectorAll('.rails-errors')).remove();

      angular.forEach($form, function(ctrl, name) {
        if (name.indexOf('$') != 0) {
          angular.forEach(ctrl.$error, function(value, name) {
            ctrl.$setValidity(name, null);
          });
        }
      });


      angular.forEach(errors, function(errors_array, key) {
        var form_key = form+'['+key+']';
        try {
          if ($form[form_key]) {
            $form[form_key].$setTouched();
            $form[form_key].$setDirty();
            $form[form_key].$setValidity('server', false);
          }
          
          angular
            .element(document.querySelector('[name="'+form_key+'"]'))
            .parent()
            .append('<div class="rails-errors" ng-messages="'+form_key+'.$error"><div ng-message="server">'+errors_array[0]+'</div></div>')
        } catch(e) {
          console.log(e)
          console.warn('Element with name ' + form_key + ' not found for validation.')
        }
      });
    };
  }])
angular.module("oxymoron.services.notice", [])
.service('Notice', ['ngNotify', function(ngNotify){
  var Notice = this;

  Notice.callback = function (type, res) {
    ngNotify.set(res.data.msg || res.data.error, type);
  }
}])

angular.module("oxymoron.services", ["oxymoron.services.interceptor", "oxymoron.services.notice", "oxymoron.services.resources", "oxymoron.services.sign", "oxymoron.services.validate"])
  angular.module("oxymoron.directives.contentFor", [])
  .directive("contentFor", [
    "$compile", function($compile) {
      return {
        compile: function(el, attrs, transclude) {
          var template = el.html();

          return {
            pre: function(scope, iElement, iAttrs, controller) {
              var DOMElements = angular.element(document.querySelectorAll('[ng-yield="'+iAttrs.contentFor+'"]'));
              if (DOMElements.attr("only-text") == "true") {
                template = el.text().replace(/(?:\r\n|\r|\n)/g, ' ');
              }
              DOMElements.html((DOMElements.attr("prefix") || "") + template + (DOMElements.attr("postfix") || ""))
              $compile(DOMElements)(scope);

              
              return iElement.remove();
            }
          };
        }
      };
    }
  ])
angular.module("oxymoron.directives.fileupload", [])
  .directive('fileupload', ['$http', '$timeout', '$cookies', function ($http, $timeout, $cookies) {
    return {
      scope: {
        fileupload: "=",
        ngModel: "=",
        hash: "=",
        percentCompleted: "="
      },
      restrict: 'A',
      link: function($scope, element, attrs) {
        $scope.percentCompleted = undefined;

        element.bind('change', function(){
          if ($scope.xhr) $scope.xhr.abort();

          var fd = new FormData();

          angular.forEach(element[0].files, function (file) {
            fd.append("attachments[]", file);
          })

          $scope.xhr = new XMLHttpRequest;

          $scope.xhr.upload.onprogress = function(e) {
              // Event listener for when the file is uploading
              $scope.$apply(function() {
                  var percentCompleted;
                  if (e.lengthComputable) {
                      $scope.percentCompleted = Math.round(e.loaded / e.total * 100);
                  }
              });
          };

          $scope.xhr.onload = function() {
              var res = JSON.parse(this.responseText)

              $scope.$apply(function() {
                if (!$scope.hash) {
                  if (attrs.multiple) {
                    $scope.ngModel = $scope.ngModel || [];
                    angular.forEach(res, function (attachment) {
                      $scope.ngModel.push(attachment);
                    });
                  } else {
                    $scope.ngModel = res[0];
                  }
                } else {
                  $scope.ngModel = $scope.ngModel || {};
                  angular.forEach(res, function(value, key) {
                    $scope.ngModel[key] = $scope.ngModel[key] || [];
                    angular.forEach(value, function (attachment) {
                      $scope.ngModel[key].push(attachment);
                    });
                  });
                }

                $scope.percentCompleted = undefined;
              });
          };


          $scope.xhr.open('POST', $scope.fileupload);
          $scope.xhr.setRequestHeader('X-XSRF-Token', $cookies.get('XSRF-TOKEN'));
          $scope.xhr.send(fd);

          element[0].value = '';
        })
      }
    }
  }])
angular.module("oxymoron.directives.clickOutside", [])
  .directive('clickOutside', ['$document', function ($document) {
    return {
      restrict: 'A',
      scope: {
        clickOutside: '&',
        clickOutsideIf: '='
      },
      link: function (scope, el, attr) {
        var handler = function (e) {
          if (scope.clickOutsideIf && el !== e.target && !el[0].contains(e.target) && document.body.contains(e.target)) {
            scope.$apply(function () {
                scope.$eval(scope.clickOutside);
            });
          }
        }

        $document.bind('click', handler);

        scope.$on('$destroy', function () {
          $document.unbind('click', handler)
        })
      }
    }
  }])

angular.module("oxymoron.directives", ['oxymoron.directives.fileupload', 'oxymoron.directives.contentFor', 'oxymoron.directives.clickOutside'])
  angular.module("oxymoron.notifier", [])
  .run(['$rootScope', 'ngNotify', 'Validate', '$state', '$http', '$location', 'Notice', function ($rootScope, ngNotify, Validate, $state, $http, $location, Notice) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info'
    });

    var callback = function(type, res) {
      if (res.data && angular.isObject(res.data)) {
        if (res.data.msg || res.data.error) {
          Notice.callback(type, res);
        }

        if (res.data.errors) {
          Validate(res.data.form_name || res.config.data.form_name, res.data.errors)
        }

        if (res.data.redirect_to_url) {
          $location.url(res.data.redirect_to_url);
        } else if (res.data.redirect_to) {
          $state.go(res.data.redirect_to, res.data.redirect_options || {});
        }

        if (res.data.reload) {
          window.location.reload();
        }
      }
    }

    $rootScope.$on('loading:finish', function (h, res) {
      callback('success', res)
    })

    $rootScope.$on('loading:error', function (h, res, p) {
      callback('error', res)
    })


  }])

  angular.module('oxymoron', ['ngNotify', 'ngCookies', 'ui.router', 'ngResource', 'oxymoron.directives', 'oxymoron.services', 'oxymoron.config', 'oxymoron.notifier'])

}).call(this);

(function () {
  var Routes = function () {
    var self = this,
        routes = {"uploads_avatar":{"defaults":{},"path":"/uploads/avatar"},"photo_upload":{"defaults":{},"path":"/uploads/:photo_id"},"new_user_session":{"defaults":{},"path":"/users/sign_in"},"user_session":{"defaults":{},"path":"/users/sign_in"},"destroy_user_session":{"defaults":{},"path":"/users/sign_out"},"user_digitalocean_omniauth_authorize":{"defaults":{},"path":"/users/auth/digitalocean"},"user_digitalocean_omniauth_callback":{"defaults":{},"path":"/users/auth/digitalocean/callback"},"user_google_oauth2_omniauth_authorize":{"defaults":{},"path":"/users/auth/google_oauth2"},"user_google_oauth2_omniauth_callback":{"defaults":{},"path":"/users/auth/google_oauth2/callback"},"user_facebook_omniauth_authorize":{"defaults":{},"path":"/users/auth/facebook"},"user_facebook_omniauth_callback":{"defaults":{},"path":"/users/auth/facebook/callback"},"user_password":{"defaults":{},"path":"/users/password"},"new_user_password":{"defaults":{},"path":"/users/password/new"},"edit_user_password":{"defaults":{},"path":"/users/password/edit"},"cancel_user_registration":{"defaults":{},"path":"/users/cancel"},"user_registration":{"defaults":{},"path":"/users"},"new_user_registration":{"defaults":{},"path":"/users/sign_up"},"edit_user_registration":{"defaults":{},"path":"/users/edit"},"messagestoadministrators":{"defaults":{},"path":"/messagestoadministrators"},"new_messagestoadministrator":{"defaults":{},"path":"/messagestoadministrators/new"},"edit_messagestoadministrator":{"defaults":{},"path":"/messagestoadministrators/:id/edit"},"messagestoadministrator":{"defaults":{},"path":"/messagestoadministrators/:id"},"categories":{"defaults":{},"path":"/categories"},"new_category":{"defaults":{},"path":"/categories/new"},"edit_category":{"defaults":{},"path":"/categories/:id/edit"},"category":{"defaults":{},"path":"/categories/:id"},"products":{"defaults":{},"path":"/products"},"new_product":{"defaults":{},"path":"/products/new"},"edit_product":{"defaults":{},"path":"/products/:id/edit"},"product":{"defaults":{},"path":"/products/:id"},"home_index":{"defaults":{},"path":"/home/index"},"stores_index":{"defaults":{},"path":"/stores/index"},"stores_all_category":{"defaults":{},"path":"/stores/all_category"},"stores_contact":{"defaults":{},"path":"/stores/contact"},"touch_users":{"defaults":{},"path":"/users/touch"},"metrics_users":{"defaults":{},"path":"/users/metrics"},"rate_user":{"defaults":{},"path":"/users/:id/rate"},"ban_user":{"defaults":{},"path":"/users/:id/ban"},"unban_user":{"defaults":{},"path":"/users/:id/unban"},"users":{"defaults":{},"path":"/users"},"user":{"defaults":{},"path":"/users/:id"},"finish_signup":{"defaults":{},"path":"/users/:id/finish_signup"},"delete_user":{"defaults":{},"path":"/user_delete/:id"},"root":{"defaults":{},"path":"/"},"admin_configurable":{"defaults":{},"path":"/admin/configurable"},"new_admin_configurable":{"defaults":{},"path":"/admin/configurable/new"},"edit_admin_configurable":{"defaults":{},"path":"/admin/configurable/edit"},"rails_mailers":{"defaults":{},"path":"/rails/mailers"},"rails_info_properties":{"defaults":{},"path":"/rails/info/properties"},"rails_info_routes":{"defaults":{},"path":"/rails/info/routes"},"rails_info":{"defaults":{},"path":"/rails/info"}};

    self.defaultParams = {}

    var serialize = function(obj, prefix) {
      var str = [];
      for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(typeof v == "object" ?
            serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    }

    var omit = function (hash, key) {
      var hash = angular.copy(hash);
      delete hash[key]
      return hash
    }


    angular.forEach(routes, function (val, key) {
      var result = '';

      var gsub = function(params) {
        if (params.format) {
          result += '.' + params.format
        }

        var params = omit(params, 'format');
        angular.forEach(params, function (v, k) {
          var subst = ':' + k;
          if (result.search(subst) != -1) {
            result = result.replace(subst, v);
            params = omit(params, k);
          }
        })

        if (result.search(/\*\w+/)!=-1) {
          result = result.replace(/\*(\w+)/, function (a, b) {
            return params[b];
          })
        }
        
        if (Object.keys(params).length)
          result += '?'+serialize(params)

        return result;
      }

      self[key+'_path'] = function (params) {
        var params = angular.extend(angular.copy(val.defaults), params || {});
        result = val.path;
        var defaultParams = angular.copy(self.defaultParams);
        return gsub(angular.extend(defaultParams, params));
      }

      self[key+'_url'] = function (params) {
        return window.location.origin + self[key+'_path'](params)
      }
    })
  }

  window.Routes = new Routes();

}).call(this)
