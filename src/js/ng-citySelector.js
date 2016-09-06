/**
 * It's a AngularJS mobile contacts.
 * @version  v1.0.0
 * @author jiangweixu <jiangweixu@tencent.com>
 * @link http://git.oa.com/u/jiangweixu
 * @copyright Copyright &copy; 2016
 * @license MIT
 */
;(function (CITYSELECTOR_DIRECTIVE){

    var m = angular.module('ngCitySelector', []);
    m.version = '1.0.0';


    var _ls = window.localStorage;


    // 将数据转换为分组字母顺序地址信息
    function process(data) {

        var addressMap = {};

        data.map(function(v) {
            var alph = v.py[0].toLowerCase();
            if(!!addressMap[alph]){
                addressMap[alph].push(v);
            } else {
                addressMap[alph] = [v];
            }
        });
        // 将contactMap转换成二维数组并按字母排序。
        if(Object.keys(addressMap).length !== 0){
            var addressGroupArray = Object.keys(addressMap).map(function (key) {return addressMap[key]}).sort(function (a,b) {
                if(a[0]['py'][0] >= b[0]['py'][0]){
                    return 1;
                } else if (a[0]['py'][0] == b[0]['py'][0]) {
                    return 0;
                } else {
                    return -1;
                }

            });
        }
        return addressGroupArray;
    }

    function getCache(){

    }

    // 获取数据,暂时不支持缓存
    function getData(csData){
        if(!csData){
            throw 'ng-cs-data must be unnull';
        }
        if(csData !== null && typeof csData === 'object'){
            return csData;
        }
    }

    // 缓存历史搜索数据
    function setHisSearch(i){
        hs = _ls.getItem('__historySearch__') || null;
        if(!hs){
            localStorage.setItem('__historySearch__', i);
        }else{
            // 缓存过的不再缓存
            if(hs.indexOf(i) === -1){
                localStorage.setItem('__historySearch__', i + ',' + hs); // 最近搜索的放在前面
            }
        }
    }

    // 获取历史搜索数据
    function getHisSearch(){
        if(!_ls){
            return;
        }else{
            hs = _ls.getItem('__historySearch__') || null;
            try {
                if (hs) {
                    return hs.split(",").slice(0,5); // 为免存储太多，取缓存中的前5个
                }
            } catch (e) {
            }
            return;
        }
    }

    // 获取顶部搜索和历史记录div的高度
    function outerHeight(cls) {
        var el = document.querySelectorAll('.'+cls)[0];
        var height = el.offsetHeight;
        var style = getComputedStyle(el);
        height+= parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
    }


    // directive定义
    m.directive('ngCitySelector', ['$parse', '$compile', '$location', '$anchorScroll', function($parse, $compile, $location, $anchorScroll) {
        return {
            restrict: "AE",
            replace: true,
            scope: {
                ngCsModel: "=",// use the parent model
                ngCsData: "=",
                ngCsFn: "="
            },
            templateUrl: 'citySelector.html',
            link: function ($scope, $element, $attrs){
                var csData = $scope.ngCsData;
                var data = getData(csData);
                $scope.hisSearch = getHisSearch();
                $scope.csData = process(data);
                $scope.search = '';

                $scope.isShowTip = false;// 导航窗tip显示控制
                $scope.go = function (v){
                    // 导航窗tip控制
                    var tipEle = document.querySelectorAll('.item-tip')[0];
                    tipEle.innerHTML = v.toUpperCase();

                    $scope.isShowTip = true;
                    setTimeout(function(){
                        $scope.isShowTip = false;
                        $scope.$apply();
                    }, 500);

                    // 根据导航窗跳转到对应的分类里
                    var idStr = 'group-' + v;
                    var scrollDis = document.getElementById(idStr).getBoundingClientRect().top - outerHeight('container-hd');
                    window.scrollBy(0, scrollDis);
                };

                // 选中历史搜索中的某条
                $scope.selectHis = function (v){
                    $scope.search = v;
                };

                // 添加历史记录，仅当回车键的时候添加
                $scope.addHis = function ($evt){
                    if($evt.which === 13){
                        var evtValue = $evt.target.value;
                        evtValue ? setHisSearch(evtValue) : '';//空字符串不作处理
                    }
                };

                // 选择某个国家或地区
                $scope.selectItem = function (v){
                    $scope.ngCsFn(v);
                };

            }
        };
    }]);

})();