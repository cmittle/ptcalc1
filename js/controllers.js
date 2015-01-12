/*rewrote this to allow for multiple controllers*/
(function (angular) {
    'use strict';
    //The ['ngRoute', 'ui.bootstrap'] inject these directives into the module and allow me
    //to use the AngularJS routing and AngularUI Bootstrap components here
    angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngSlider'])
        //'vr.directives.slider' is for the slider I'm testing on VFDMotor tab
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
        .controller('VfdMotorController', ['$scope', function ($scope) {
            $scope.baseHz = '60'; //default freq from power supply (50 or 60Hz)
            $scope.srpm = 1800; //calculated sync rpm
            $scope.arpm = 1750; //actually full speed rpm after slip
            $scope.vrpm = 1750; //vfd rpm
            $scope.outTorque = '3';
            $scope.slip = 2.79;
            $scope.slipTooltip = '<p>2.79%=1750</p> <p>1.66%=1770</p> <p>1.39%=1775</p> <p>1.11%=1780</p>';
            $scope.vfdHz = '60';
            $scope.hpSelected = '1';
            $scope.polesSelected = '4';
            $scope.hzs = ['50', '60'];
            $scope.hps = ['0.25', '0.33', '0.5', '0.75', '1', '2', '3', '5', '7.5',
                '10', '15', '20', '25', '30', '40', '50', '60', '75', '100',
                '125', '150', '200', '250', '300', '400', '500', '600'];
            $scope.poles = ['2', '4', '6', '8', '10', '12'];
            
            $scope.initFreq = function () {
                $scope.vfdHz = $scope.baseHz;
            };
            $scope.disable = function () {
                $scope.disabled = !$scope.disabled;
            };
            $scope.calcRpm = function () {
                /*need to make sure to calculate correct rpms*/
                $scope.srpm = 120 * $scope.baseHz / $scope.polesSelected;
                $scope.arpm = $scope.srpm * (1 - $scope.slip / 100);
                $scope.vrpm = ($scope.vfdHz / $scope.baseHz) * $scope.arpm;
                $scope.calcTorque();
            };
            $scope.calcTorque = function () {
                /*$scope.outTorque = $scope.hpSelected * 5252 / $scope.arpm;*/
                if ($scope.vrpm < $scope.arpm) { //constant torque for VFD below nominal rpm (arpm)
                    $scope.outTorque = $scope.hpSelected * 5252 / $scope.arpm;
                } else { //variable torque when VFD is used to overspeed
                    $scope.outTorque = $scope.hpSelected * 5252 / $scope.vrpm;
                }
            };
            $scope.resetMotorVfd = function () {
                $scope.baseHz = '60';
                $scope.srpm = 1800;
                $scope.arpm = $scope.vrpm = 1750;
                $scope.outTorque = '3';
                $scope.slip = 2.79;
                $scope.vfdHz = '60';
                $scope.hpSelected = '1';
                $scope.polesSelected = '4';
                $scope.calcRpm();
                $scope.calcTorque();
            };
            
            /*if (vRPM < aRPM) {
            torqueLbFt = hp * 5252/ (aRPM); //calculate with aRPM at or below baseFreq for constant torque turndown
            jTextField3.setText(df2.format(torqueLbFt)); //output torqueLbFt into text field
            torqueLbIn = torqueLbFt * 12; //calculate torque lb-in
            jTextField4.setText(df2.format(torqueLbIn)); //output torqueLbIn into text field
        } else {
            torqueLbFt = hp * 5252/ (vRPM); //calculate with sRPM at or below baseFreq, when overspeeding I will need to use aRPM
            jTextField3.setText(df2.format(torqueLbFt)); //output torqueLbFt into text field
            torqueLbIn = torqueLbFt * 12; //calculate torque lb-in
            jTextField4.setText(df2.format(torqueLbIn)); //output torqueLbIn into text field
        }*/
            
            $scope.options2 = {
                from: 1,
                to: 100,
                floor: true,
                step: 0.1,
                scale: [0, '|',  '|',  '|', '|', 50, 60, '|', '|', '|', 100],
            /*scale: [0, '|', 10, '|', 20, '|', 30, '|', 40, '|', 50, '|', 60, '|', 80, '|', 90, '|', 100],*/
                dimension: " Hz",
                callback: function (value, elt) {
                    /*console.log(value);*/
                }
            };
            
        }])
        .controller('SellPriceController', ['$scope', function ($scope) {
            $scope.marginInput = 0.8;
            $scope.copyMargin = 0;
            $scope.cost = 0; //default cost
            /*$scope.clearZeroCost = function () {
                if ($scope.cost === 0) {
                    $scope.cost.resetValue();
                }
                
            };*/
            $scope.sellCalc = function () {
                if ($scope.marginInput > 1.0) {
                    return $scope.cost * $scope.marginInput;
                } else {
                    return $scope.cost / $scope.marginInput;
                }
            };
            /*need to figure out how to set value of input block*/
            $scope.copyMargin = function () {
                $scope.marginInput = $scope.copyMarginCost / $scope.copyMarginSell;
            };
            $scope.clearCopyMargin = function () {
                $scope.copyMarginSell = null;
                $scope.copyMarginCost = null;
            };
        }])
        .controller('ShvSpkController', ['$scope', '$window', function ($scope, $window) {
            /*var driverRPM = 0;
            var drivenRPM = 0;
            var driverSize = 0;
            var drivenSize = 0;*/
            $scope.calculate = function () { //this solves for DriveN Size
                if ($scope.driverRPM > 0 && $scope.drivenRPM > 0 && $scope.driverSize > 0 && $scope.drivenSize > 0) {
                    $window.alert("Please leave 1 of the 4 boxes empty to solve");
                } else if ($scope.driverRPM > 0 && $scope.drivenRPM > 0 && $scope.driverSize > 0) {
                    $scope.drivenSize = Math.round(($scope.driverSize * $scope.driverRPM / $scope.drivenRPM) * 100) / 100;
                } else if ($scope.driverRPM > 0 && $scope.drivenRPM > 0 && $scope.drivenSize > 0) {
                    $scope.driverSize = Math.round(($scope.drivenSize * $scope.drivenRPM / $scope.driverRPM) * 100) / 100;
                } else if ($scope.driverRPM > 0 && $scope.driverSize > 0 && $scope.drivenSize > 0) {
                    $scope.drivenRPM = Math.round(($scope.driverSize * $scope.driverRPM / $scope.drivenSize) * 100) / 100;
                } else if ($scope.drivenSize > 0 && $scope.drivenRPM > 0 && $scope.driverSize > 0) {
                    $scope.driverRPM = Math.round(($scope.drivenSize * $scope.drivenRPM / $scope.driverSize) * 100) / 100;
                } else {
                    $window.alert("Enter data in 3 of the 4 fields");
                }
            };
            $scope.clearAll = function () {
                $scope.driverSize = $scope.driverRPM = $scope.drivenSize = $scope.drivenRPM = NaN;
            };
        }])
        .controller('RimSpeedController', ['$scope', '$window', function ($scope, $window) {
            $scope.calc = function () {
                if ($scope.diameter > 0 && $scope.rpm > 0 && $scope.fpm > 0) {
                    $window.alert("Please leave 1 of the 3 boxes empty Diameter, RPM or Speed");
                } else if ($scope.diameter > 0 && $scope.rpm > 0) {
                    $scope.fpm = Math.round(($scope.rpm * $scope.diameter * Math.PI / 12) * 100) / 100;
                    $scope.fpmMph();
                    /*$scope.kwInput = Math.round(($scope.hpInput * 0.745699872) * 100) / 100;*/
                } else if ($scope.diameter > 0 && $scope.fpm > 0) {
                    $scope.rpm = Math.round(($scope.fpm * 12 / (Math.PI * $scope.diameter)) * 100) / 100;
                } else if ($scope.rpm > 0 && $scope.fpm > 0) {
                    $scope.diameter = Math.round(($scope.fpm * 12 / (Math.PI * $scope.rpm)) * 100) / 100;
                } else {
                    $window.alert("Please enter 2 of the 3 parameters Diameter, RPM or Speed");
                }
            };
            $scope.clearAll = function () {
                $scope.diameter = $scope.rpm = $scope.mph = $scope.fpm = NaN;
            };
            $scope.fpmMph = function () {
                $scope.mph = Math.round(($scope.fpm * 60 / 5280) * 100) / 100;
            };
            $scope.mphFpm = function () {
                $scope.fpm = Math.round(($scope.mph * 5280 / 60) * 100) / 100;
            };
            
        }])
        .controller('ConvertController', ['$scope', '$filter', function ($scope, $filter) {
            //$filter('number')(number, fractionSize)
            var hp = 500.4563424528;
            hp.toFixed(2);
            $scope.hpKw = function () {
                /*$scope.kwInput = $scope.hpInput * 0.745699872;*/
                $scope.kwInput = Math.round(($scope.hpInput * 0.745699872) * 100) / 100;
            };
            $scope.kwHp = function () {
                /*$scope.hpInput = $scope.kwInput / 0.745699872;
                hp = 6555.21569;*/
                /*$scope.hpInput = hp.toPrecision(2);*/
                $scope.hpInput = Math.round(($scope.kwInput / 0.745699872) * 100) / 100;
            };
            $scope.nmLbIn = function () {
                /*$scope.lbInInput = $scope.nmInput * 8.8507452;*/
                $scope.lbInInput = Math.round(($scope.nmInput * 8.8507452) * 100) / 100;
            };
            $scope.lbInNm = function () {
                /*$scope.nmInput = $scope.lbInInput / 8.8507452;*/
                $scope.nmInput = Math.round(($scope.lbInInput / 8.8507452) * 100) / 100;
            };
            $scope.kgLb = function () {
                /*$scope.lbInput1 = $scope.kgInput  * 2.20462;*/
                $scope.lbInput1 = Math.round(($scope.kgInput  * 2.20462) * 100) / 100;
            };
            $scope.lbKg = function () {
                /*$scope.kgInput = $scope.lbInput1 / 2.20462;*/
                $scope.kgInput = Math.round(($scope.lbInput1 / 2.20462) * 100) / 100;
            };
            $scope.knLb = function () {
                /*$scope.lbInput2 = $scope.knInput * 224.80894;*/
                $scope.lbInput2 = Math.round(($scope.knInput * 224.80894) * 100) / 100;
            };
            $scope.lbKn = function () {
                /*$scope.knInput = $scope.lbInput2 / 224.80894;*/
                $scope.knInput = Math.round(($scope.lbInput2 / 224.80894) * 100) / 100;
            };
            $scope.cF = function () {
                /*$scope.fInput = $scope.cInput * 9 / 5 + 32;*/
                $scope.fInput = Math.round(($scope.cInput * 9 / 5 + 32) * 100) / 100;
            };
            $scope.fC = function () {
                /*$scope.cInput = ($scope.fInput - 32) * 5 / 9;*/
                $scope.cInput = Math.round((($scope.fInput - 32) * 5 / 9) * 100) / 100;
            };
            $scope.kwPost = function () {
                //need to figure out hwo to take care of first line.
                $scope.postOut = $scope.postOut + "\n" + $scope.kwInput + " kw = " + $scope.hpInput + " hp";
            };
            $scope.nmPost = function () {
                $scope.postOut = $scope.postOut + "\n" + $scope.nmInput + " N-m = " + $scope.lbInInput + " lb-in";
            };
            $scope.kgPost = function () {
                $scope.postOut = $scope.postOut + "\n" + $scope.kgInput + " kg = " + $scope.lbInput1 + " lbs";
            };
            $scope.knPost = function () {
                $scope.postOut = $scope.postOut + "\n" + $scope.knInput + " kn = " + $scope.lbInput2 + " lbs";
            };
            $scope.cPost = function () {
                $scope.postOut = $scope.postOut + "\n" + $scope.cInput + " *C = " + $scope.fInput + " *F";
            };
        }])
       
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
                    /*controller: 'PtCalcController'*/
                    controller: 'VfdMotorController'
                });
        
                   
        })
        .controller('ChapterController', function ($scope, $routeParams) {
            $scope.name = "ChapterController";
            $scope.params = $routeParams;
        });
                
}(window.angular));
