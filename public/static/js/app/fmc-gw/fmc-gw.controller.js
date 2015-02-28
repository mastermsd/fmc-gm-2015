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
            isEarlyBird();
        });

        function calculateAge (date) {
            var birthday = new Date(date);
            return Math.floor((Date.now() - birthday) / (31557600000));
        }

        function calculatePrice (age) {
            if (age > 12) {

            } else if (age > 5) {

            } else if (age < 5) {

            }
        }

        function isEarlyBird () {

            var isEarlyBird = false;
            var earlyBirdDate = new Date(fmcGwConstant.earlyBirdDate);
            earlyBirdDate.setHours(0,0,0,0);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            var todayDate = new Date(yyyy + '-' + mm + '-' + dd);

            var timeDiff = earlyBirdDate.getTime() - todayDate.getTime();

            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (diffDays >= 0) {
                isEarlyBird = true;
            }   

            return isEarlyBird;
        }

        function validateForm () {
            $state.go('validate');
        }

        function submitPost () {
            dataRef.push($scope.fmcGwModel);
            resetForm();
        }

        function removeData () {
            dataRef.remove();
        }

        function resetForm () {
            $scope.fmcGwModel = {};
            $scope.fmcGwModel.personsDetails.length = 0;
        }

        function backToForm () {
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