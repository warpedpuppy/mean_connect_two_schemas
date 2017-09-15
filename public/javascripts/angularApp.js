angular.module('bandContainer', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                });

            $urlRouterProvider.otherwise('home');

        }
    ])
    .factory('bands', ['$http', function($http){
      var f = {
        bands: []
      };

      f.getAll = function() {
        return $http.get("/band").success(function(data){
          angular.copy(data, f.bands);
        })
      }
    

      f.addBand = function(obj){
        console.log("add band = ", obj)
        return $http.post('/band', obj).success(function(data){
          f.bands.push(data);
        });
      }

       f.deleteThis = function(id){
        let obj = {id:id};
        return $http.post("/deleteOneBand", obj);
      }

      f.deleteAllBands = function(){
        return $http.post("/deleteAllBands").success(function(data){
            f.bands.length = 0;
        })
      }

      f.addFan = function(band_id, name_id){
        let obj = {name_id:name_id, band_id:band_id};
        console.log("obj from factory = ", obj)

        return $http.post('/addFan', obj).success(function(data){
          f.getAll();
        });

      }


      return f;

    }])
    .factory('names',  ['$http', function($http){
      var n = {
        names: []
      };

       n.getAll = function() {
       
        return $http.get("/names").success(function(data){
          angular.copy(data, n.names);
        })
      }

      n.addName = function(name) {
        let obj = {name:name};
        return $http.post("/name", obj).success(function(data){
          console.log("add name success = ", data);
          n.names.push(data);
        })
      }

      n.removeAllNames = function(){
        return $http.post("/removeAllNames").success(function(data){
            n.names.length = 0;
        })
      }


      return n;

    }])
    .controller('MainCtrl', [
        '$scope',
        'bands',
        'names',
        function($scope, bands, names) {

            bands.getAll().then(function(){
              $scope.bands = bands.bands;
              $scope.bandQ = bands.bands.length;
            });

            names.getAll().then(function(){
              $scope.names = names.names;
              $scope.nameQ = names.names.length;
            });

            $scope.addBand = function(color){
              bands.addBand({color:color});
              $scope.bandQ ++;

            }
            $scope.deleteThis = function(id, index){
              $scope.bands.splice(index, 1);
              bands.deleteThis(id);
              $scope.bandQ --;
            }
            $scope.deleteAllBands = function(){
            
              bands.deleteAllBands();
                $scope.bandQ = 0;
            }
            $scope.removeAllNames = function(){
            
              names.removeAllNames();
              $scope.nameQ = 0;
            }

            $scope.addName = function(){
              if($scope.name !== "" || $scope.name !== undefined){
                let name = $scope.name;
                $scope.nameQ ++;
                names.addName(name);
                $scope.name = "";
              }
            }

            $scope.selectBand = function(band, name_id){
              if(band){
                 var band_id = band._id;
                bands.addFan(band_id, name_id);
              }
             
            }


        }
    ])
   








