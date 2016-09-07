var app = angular.module('myApp', ['ngCitySelector']);
app.controller('myCtrl', function($scope){

    $scope.title = '所有国家或地区';

    $scope.historyData = ['美国', '日本', '新加坡'];

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
        }, {
            name: '巴拿马',
            price: '9.9',
            en: 'en',
            py: 'banama'
        }, {
            name: '察哈尔',
            price: '9.9',
            en: 'en',
            py: 'chahaer'
        }, {
            name: '德国',
            price: '9.9',
            en: 'en',
            py: 'deguo'
        }, {
            name: '鄂尔多斯',
            price: '9.9',
            en: 'en',
            py: 'eerduosi'
        }, {
            name: '法国',
            price: '9.9',
            en: 'en',
            py: 'faguo'
        }, {
            name: '哥伦比亚',
            price: '9.9',
            en: 'en',
            py: 'gelunbiya'
        }, {
            name: '加拿大',
            price: '9.9',
            en: 'en',
            py: 'jianada'
        }, {
            name: '开罗',
            price: '9.9',
            en: 'en',
            py: 'kailuo'
        }, {
            name: '利比亚',
            price: '9.9',
            en: 'en',
            py: 'libiya'
        }, {
            name: '欧洲',
            price: '9.9',
            en: 'en',
            py: 'ouzhou'
        }, {
            name: '抛物线',
            price: '9.9',
            en: 'en',
            py: 'paowuxian'
        }, {
            name: '去哪儿',
            price: '9.9',
            en: 'en',
            py: 'qunaer'
        }, {
            name: '思念',
            price: '9.9',
            en: 'en',
            py: 'sinian'
        }, {
            name: '台湾',
            price: '9.9',
            en: 'en',
            py: 'taiwan'
        }, {
            name: '王国',
            price: '9.9',
            en: 'en',
            py: 'wangguo'
        }
    ];

    $scope.contactSelect = {};

    $scope.select = function(v){
        console.log(v);
    };




});
