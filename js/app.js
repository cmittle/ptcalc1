/*(function (angular) {
    'use strict';
    var myApp = angular.module('motorApp', []);

    myApp.controller('MotorController', ['$scope', function ($scope) {
        //if I use motor.syntax, I need to use this. syntax in controller
        $scope.spice = 'very';
        $scope.outTorque = 3;
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
            $scope.outTorque = 6 + 2;
        };
    
    
    }]);
}(window.angular));*/