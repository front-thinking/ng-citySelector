var app = angular.module('myApp', ['ngCitySelector']);
app.controller('myCtrl', function($scope){
    $scope.data = [
        {
            name: '中国',
            price: '9.9',
            en: 'cn',
            py: 'zhongguo'
        }, {
            name: '美国',
            price: '9.9',
            en: 'en',
            py: 'meiguo'
        }, {
            name: '英国国',
            price: '9.9',
            en: 'en',
            py: 'yingguo'
        }, {
            name: '台湾',
            price: '9.9',
            en: 'en',
            py: 'taiwan'
        }, {
            name: '日本',
            price: '9.9',
            en: 'en',
            py: 'riben'
        }, {
            name: '新加坡',
            price: '9.9',
            en: 'en',
            py: 'xinjiapo'
        }, {
            name: '澳大利亚',
            price: '9.9',
            en: 'en',
            py: 'aodaliya'
        }, {
            name: '韩国',
            price: '9.9',
            en: 'en',
            py: 'hanguo'
        }, {
            name: '菲律宾',
            price: '9.9',
            en: 'en',
            py: 'feilvbin'
        }, {
            name: '香港',
            price: '9.9',
            en: 'en',
            py: 'xianggang'
        }, {
            name: '荷兰',
            price: '9.9',
            en: 'en',
            py: 'helan'
        }, {
            name: '西班牙',
            price: '9.9',
            en: 'en',
            py: 'xibanya'
        }
    ];

    $scope.select = function(v){
        console.log(v);
    };

});
