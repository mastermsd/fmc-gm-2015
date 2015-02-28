(function() {
    'use strict';

    angular.module('fmcGw')
        .constant(
            'fmcGwConstant', {
                prices : {
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
                },
                earlyBirdDate : '2015-03-31'
            }
        );

}());