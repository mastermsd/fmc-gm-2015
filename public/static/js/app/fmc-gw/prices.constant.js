(function() {
    'use strict';

    angular.module('fmcGw')
        .constant(
            'prices', {
            normal: {
                adult: 115,
                child: 50,
                infant: 0
            },
            early: {
                adult: 100,
                child: 40,
                infant: 0
            }
        });

}());