(function() {
    'use strict';

    angular.module('fmcGw')
    .controller('fmcGwController', ['$scope', '$state', 'fmcGwModel', '$firebase', fmcGwController
    ]);

    function fmcGwController ($scope, $state, fmcGwModel, $firebase) {
        var dataRef = new Firebase("https://fmc-gw2015.firebaseio.com/");

        $scope.fmcGwModel = fmcGwModel;
        $scope.validateForm = validateForm;
        $scope.submitPost = submitPost;
        $scope.countAmountPersons = countAmountPersons;
        $scope.resetForm = resetForm;
        $scope.back = back;
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

        function back () {
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