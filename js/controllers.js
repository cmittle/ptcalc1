/*rewrote this to allow for multiple controllers*/
(function (angular) {
    'use strict';
    //The ['ngRoute', 'ui.bootstrap'] inject these directives into the module and allow me
    //to use the AngularJS routing and AngularUI Bootstrap components here
    angular.module('hpRpmApp', ['ngRoute', 'ui.bootstrap'])
    
        .controller('HpRPMController', ['$scope', function ($scope) {
        //if I use motor.syntax, I need to use this. syntax in controller
            $scope.spice = 'very';
            $scope.tabs = [
                { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
                { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
            ];
            $scope.outTorqueLbFt = 3;
            $scope.hps = ['0.25', '0.33', '0.5', '0.75', '1', '2', '3', '5', '7.5',
                '10', '15', '20', '25', '30', '40', '50', '60', '75', '100',
                '125', '150', '200', '250', '300', '400', '500', '600'];
            $scope.hpSelected = '1';
            $scope.rpm = 1750; //default rpm  why does "this.rpm" work and $scope.rpm not work??? 
    

            $scope.chiliSpicy = function () {
                $scope.spice = 'chili';
            };

            $scope.jalapenoSpicy = function () {
                $scope.spice = 'jalapeño';
                //$scope.outTorqueCalc();
            };
    
            $scope.outTorqueCalc = function () {
                $scope.outTorqueLbFt = $scope.hpSelected * 5252 / $scope.rpm;
            };
    
    
        }])
       /* .controller('TabsDemoCtrl', function ($scope, $window) {
            $scope.tabs = [
                { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
                { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
            ];

            $scope.alertMe = function () {
                setTimeout(function () {
                    $window.alert('You\'ve selected the alert tab!');
                });
            };
        });*/
         //this controls the routing of the site
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/hprpm', {
                    templateUrl: 'partials/hprpm.html',
                    controller: 'HpRPMController'
                }) //when I have several items i leave off this ";", if this is the only one I need ";" here
                .when('/vfdmotor', {
                    templateUrl: 'partials/vfdmotor.html',
                    controller: 'VfdMotorController'
                })
                .when('/shvspk', {
                    templateUrl: 'partials/shvspk.html',
                    controller: 'ShvSpkController'
                })
                .when('/sellprice', {
                    templateUrl: 'partials/sellprice.html',
                    controller: 'SellPriceController'
                })
                .when('/rimspeed', {
                    templateUrl: 'partials/rimspeed.html',
                    controller: 'RimSpeedController'
                })
                .when('/convert', {
                    templateUrl: 'partials/convert.html',
                    controller: 'ConvertController'
                })
                .when('/interpolate', {
                    templateUrl: 'partials/interpolate.html',
                    controller: 'InerpolateController'
                })
                .when('/ptcalc', {
                    templateUrl: 'partials/ptcalc.html',
                    controller: 'PtCalcController'
                });
        
                   
        })
        .controller('ChapterController', function ($scope, $routeParams) {
            $scope.name = "ChapterController";
            $scope.params = $routeParams;
        });
                
}(window.angular));





/*(function (angular) {
    'use strict';
    var myApp = angular.module('hpRpmApp', []);

    myApp.controller('HpRPMController', ['$scope', function ($scope) {
        //if I use motor.syntax, I need to use this. syntax in controller
        $scope.spice = 'very';
        $scope.outTorqueLbFt = 3;
        $scope.hps = ['0.25', '0.33', '0.5', '0.75', '1', '2', '3', '5', '7.5',
               '10', '15', '20', '25', '30', '40', '50', '60', '75', '100',
               '125', '150', '200', '250', '300', '400', '500', '600'];
        $scope.hpSelected = '1';
        $scope.rpm = 1750; //default rpm  why does "this.rpm" work and $scope.rpm not work??? 
    

        $scope.chiliSpicy = function () {
            $scope.spice = 'chili';
        };

        $scope.jalapenoSpicy = function () {
            $scope.spice = 'jalapeño';
            //$scope.outTorqueCalc();
        };
    
        $scope.outTorqueCalc = function () {
            $scope.outTorqueLbFt = $scope.hpSelected * 5252 / $scope.rpm;
        };
    
    
    }]);
}(window.angular));*/

