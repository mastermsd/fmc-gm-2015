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
        $scope.countAmount = countAmount;
        $scope.resetForm = resetForm;
        $scope.back = back;
        $scope.fmcGwModel.personsDetails = [];

        $scope.removeData = removeData;

        $scope.$watch('fmcGwModel.type', function(value) {

            if (value === 'individual') {
                delete $scope.fmcGwModel.amountPersons;
                $scope.fmcGwModel.personsDetails.length = 0;
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
/*            fmcGwModel.type = '';
            fmcGwModel.firstName = '';
            fmcGwModel.familyName = '';
            fmcGwModel.email = '';
            fmcGwModel.telephone = '';
            fmcGwModel.satellite = '';
            fmcGwModel.amountPersons = '';
            fmcGwModel.personDetails = '';*/
            $scope.fmcGwModel = {};
            $scope.fmcGwModel.personsDetails.length = 0;
        }

        function back () {
            $state.go('form');
        }

        function countAmount (amount) {

            if ($scope.fmcGwModel.personsDetails.length === 0) {

                for(var i = 1, length = amount; length >= i; i++ ) {
                    $scope.fmcGwModel.personsDetails.push({id: i, firstName: '', birthdate: ''});
                }
            } else if (amount > $scope.fmcGwModel.personsDetails.length) {
                var subtraction = amount - $scope.fmcGwModel.personsDetails.length;

                for(var ii = 1, initLength = $scope.fmcGwModel.personsDetails.length; subtraction >= ii; ii++) {
                    $scope.fmcGwModel.personsDetails.push({id: initLength + ii, firstName: '', birthdate: ''});
                }
            } else if (amount < $scope.fmcGwModel.personsDetails.length) {
                $scope.fmcGwModel.personsDetails.length = amount;
            }

        }

    }

}());