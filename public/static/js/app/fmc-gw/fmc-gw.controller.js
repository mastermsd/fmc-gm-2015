(function() {
    'use strict';

    angular.module('fmcGw')
    .controller('fmcGwController', ['$scope', '$state', 'fmcGwModel', 'fmcGwConstant', '$firebase', fmcGwController
    ]);

    function fmcGwController ($scope, $state, fmcGwModel, fmcGwConstant, $firebase) {
        var dataRef = new Firebase("https://fmc-gw2015.firebaseio.com/");

        $scope.fmcGwModel = fmcGwModel;
        $scope.validateForm = validateForm;
        $scope.submitPost = submitPost;
        $scope.countAmountPersons = countAmountPersons;
        $scope.resetForm = resetForm;
        $scope.backToForm = backToForm;
        $scope.removeData = removeData;
        $scope.registerDate = registerDate();
        $scope.fmcGwModel.registerDate = registerDate().toDateString();

        $scope.$watch('fmcGwModel.type', function(value) {

            if (value === 'individual') {
                delete $scope.fmcGwModel.amountPersons;
                if (typeof $scope.fmcGwModel.personsDetails !== 'undefined') {
                    $scope.fmcGwModel.personsDetails.length = 0;
                }
            } else if (value === 'family') {
                delete $scope.fmcGwModel.firstName;
                delete $scope.fmcGwModel.birthDate;
            }
         });

        $scope.$watch('fmcGwModel.individualBirthdate', function (date) {
            fmcGwModel.individualAge = calculateAge(date);
            fmcGwModel.totalAmount = calculatePrice(fmcGwModel.individualAge);

        });

        function calculateAge (date) {
            var birthday = new Date(date);
            return Math.floor((registerDate() - birthday) / (31557600000));
        }

        function calculatePrice (age) {
            if (age > 12) {
                if (isEarlyBird()) {
                    return fmcGwConstant.prices.early.adult;
                } else {
                    return fmcGwConstant.prices.normal.adult;
                }
            } else if (age > 3 && age < 13) {
                if (isEarlyBird()) {
                    return fmcGwConstant.prices.early.child;
                } else {
                    return fmcGwConstant.prices.normal.child;
                }
            } else if ( age < 4) {
                if (isEarlyBird()) {
                    return fmcGwConstant.prices.early.infant;
                } else {
                    return fmcGwConstant.prices.normal.infant;
                }
            }
        }

        function registerDate () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            return new Date(yyyy + '-' + mm + '-' + dd);
        }

        function isEarlyBird () {

            var isEarly = false;
            var earlyBirdDate = new Date(fmcGwConstant.earlyBirdDate);
            earlyBirdDate.setHours(0,0,0,0);

            var timeDiff = earlyBirdDate.getTime() - registerDate().getTime();

            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (diffDays >= 0) {
                isEarly = true;
            }

            return isEarly;
        }

        function validateForm () {
            $state.go('validate');
        }

        function submitPost () {
            dataRef.push($scope.fmcGwModel);
            $state.go('confirmation');
            resetForm();
        }

        function removeData () {
            dataRef.remove();
        }

        function resetForm () {
            fmcGwModel = {};
            $scope.fmcGwModel = {};
        }

        function backToForm () {
            resetForm();
            $state.go('form');
        }

        function countAmountPersons (amount) {

            if (typeof $scope.fmcGwModel.personsDetails === 'undefined') {
                $scope.fmcGwModel.personsDetails = [];
            }

            if (amount > $scope.fmcGwModel.personsDetails.length) {
                var subtraction = amount - $scope.fmcGwModel.personsDetails.length;

                for(var i = 1, initLength = $scope.fmcGwModel.personsDetails.length; subtraction >= i; i++) {
                    $scope.fmcGwModel.personsDetails.push({id: initLength + i, firstName: '', birthDate: ''});
                }

            } else if (amount < $scope.fmcGwModel.personsDetails.length) {
                $scope.fmcGwModel.personsDetails.length = amount;
            }

        }

    }

}());