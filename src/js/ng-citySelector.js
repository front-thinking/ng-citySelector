/**
 * It's a AngularJS mobile contacts.
 * @version  v1.0.0
 * @author jiangweixu <jiangweixu@tencent.com>
 * @link http://git.oa.com/u/jiangweixu
 * @copyright Copyright &copy; 2016
 * @license MIT
 */
;(function (CITYSELECTOR_DIRECTIVE){

    var m = angular.module('ngCitySelector', ['ngTouch']);
    m.version = '1.0.0';


    var _ls = window.localStorage;


    // 将数据转换为分组字母顺序地址信息
    function process(data){

        var alph = {}, sortedData = newArray = [];

        // 对原始数组按字母排序
        var sortedData = data.sort(function(a,b){
            return a.pinyin.charCodeAt(0) - b.pinyin.charCodeAt(0);
        });

        // 将一维数组转换为二维字母分组的数组
        sortedData.map(function(item){
            var l = newArray.length;
            if(alph[item.pinyin[0]]){
                newArray[l-1].push(item);
            }else {
                alph[item.pinyin[0]] = true;
                newArray[l] = [item];
            }
        });
        return newArray;
    }

    // 获取数据,暂时不支持缓存
    function getData(csData){
        if(!csData){
            throw 'ng-cs-data must is empty';
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

    // directive定义
    m.directive('ngCitySelector', [function() {
        return {
            restrict: "AE",
            replace: true,
            scope: {
                ngCsModel: "=",// use the parent model
                ngCsData: "=",
                ngCsFn: "="
            },
            template: '<div class="container country country__show-recent cityselector">\
                                <div class="container-hd">\
                                        <!-- S 搜索 -->\
                                    <div class="country-search country-search__active">\
                                    <div class="country-search_txt">\
                                    <i class="icon-img icon-img-search02"></i>\
                                    <span class="txt">搜索</span>\
                                    </div>\
                                    <input class="country-search-ipt" type="text" ng-model="search" id="search">\
                                    </div>\
                                        <!-- E 搜索 -->\
                                        <!-- S 最近搜索 -->\
                                    <div class="country-recent">\
                                    <div class="country-recent-title">最近搜索</div>\
                                    <ul class="country-recent-list">\
                                    <li class="list-item" ng-repeat="h in hisSearch" ng-click="selectHis(h)">{{h}}</li>\
                            </ul>\
                            </div>\
                                <!-- E 最近搜索 -->\
                            </div>\
                            <div class="container-bd">\
                                    <!-- S 选择城市 -->\
                                <div class="cityselector">\
                                <div class="city-wrap">\
                                <p class="city-title" ng-repeat-start="i in csData | filter: search" ng-attr-id="{{\'group-\' + i[0][\'pinyin\'][0]}}">{{i[0].pinyin[0] | uppercase}}</p>\
                        <ul class="city-list" ng-repeat-end>\
                        <li class="city-list-item" ng-repeat="j in i | filter: search" ng-click="selectItem(j)">\
                            <span ng-bind="j.ch"></span>\
                            </li>\
                            </ul>\
                            </div>\
                            <ul class="anchor-list">\
                            <li ng-repeat="h in csData" ng-touchmove="touchMoveFn($event)" ng-touchstart="touchStartFn($event)" ng-touchend="touchEndFn($event)">\
                            {{h[0].pinyin[0] | uppercase}}\
                        </li>\
                        </ul>\
                        </div>\
                            <!-- E 选择城市 -->\
                        </div>\
                        <div class="item-tip" ng-show="isShowTip">A</div>\
                     </div>',
            link: function ($scope, $element, $attrs){
                var csData = $scope.ngCsData;
                var data = getData(csData);
                $scope.hisSearch = getHisSearch();
                $scope.csData = process(data);
                $scope.search = '';


                // 导航窗tip控制
                var tipEle = document.querySelectorAll('.item-tip')[0];

                $scope.isShowTip = false;// 导航窗tip显示控制

                var scroll2Pos  = function (v){
                    var idStr = 'group-' + v.toLowerCase();
                    var ctlDom = document.getElementById(idStr);// 具体分类的目的dom元素
                    if(ctlDom){ //仅当分类存在的时候滚动到对应位置，否则不滚动。（由于输入搜索关键字后，可能导航对应的分类并不存在）
                        var scrollDis = ctlDom.getBoundingClientRect().top - 97;
                        window.scrollBy(0, scrollDis);
                    }
                };

                // 选中历史搜索中的某条
                $scope.selectHis = function (v){
                    $scope.search = v;

                    // 如果当前集合中有该条目，直接执行传进来的方法
                    var item = data.filter(function(i){
                        return i.ch === v;
                    });
                    if(item){
                        $scope.ngCsFn(item[0]);
                    }
                };

                // 选择某个国家或地区
                $scope.selectItem = function (v){
                    var serchStr = angular.element(document.getElementById('search')).val(); // 获取search中的值
                    if(serchStr && (v.ch.indexOf(serchStr) !== -1 || v.pinyin.indexOf(serchStr) !== -1)){
                        setHisSearch(v.ch);
                    }
                    $scope.ngCsFn(v);
                };

                $scope.touchStartFn = function($evt){
                    var tip = $evt.target.innerHTML.trim();
                    // 增加active的class
                    angular.element($evt.target).addClass('active');
                    if(tipEle.innerHTML.trim() !== tip){
                        $scope.isShowTip = true;
                        tipEle.innerHTML = tip;
                        scroll2Pos(tip);
                    }
                    $evt.preventDefault();

                };
                $scope.touchMoveFn = function($evt){
                    var myLocation = $evt.changedTouches[0], cate = '',
                        current = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
                    var anchorListDom = angular.element(current).parent();
                    if(anchorListDom.hasClass('anchor-list')){
                        var tip = current.innerHTML.trim();
                        if(tipEle.innerHTML.trim() !== tip){
                            tipEle.innerHTML = tip;
                            scroll2Pos(tip);
                        }
                    }
                    $evt.preventDefault();
                };
                $scope.touchEndFn = function($evt){
                    angular.element($evt.target).removeClass('active');
                    $scope.isShowTip = false;
                    $evt.preventDefault();
                };
            }
        };
    }]);
})();