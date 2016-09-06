city selector based on AngularJS
====

ng-citySelector 是一个基于AngularJS的城市选择器组件，支持字母拼音查询和汉字查询，支持缓存历史搜索记录，支持快速定位类别。

## Usage
加入文件引用
```html
    <link rel="stylesheet" href="ng-city-selector.css">
    <script src="//cdn.bootcss.com/angular.js/1.5.0-beta.0/angular.min.js"></script>
    <script src="ng-citySelector.js"></script>
```
模块以来
```js
    var app = angular.module('myApp', ['ngCitySelector']);
```
HTML使用
```html
    <ng-city-selector ng-cs-data="data" ng-cs-fn="select"></ng-city-selector>
```

### 参数说明:
|  参数 | 类型 | 说明
| ----- | ---- | ----
| ng-cs-data | Array | 对象数组，其中对象要包含以下两个字段：{ name: '美国',py: 'meiguo'}
| ng-cs-fn | Function | 函数，选中某个城市后的点击事件处理函数

### 实例

```js
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
        },
        ......
        {
            name: '新加坡',
            price: '9.9',
            en: 'en',
            py: 'xinjiapo'
        }
    ];

    $scope.select = function(v){
        console.log(v);
    };
});

```
效果图：
图1
![图1](https://github.com/front-thinking/ng-citySelector/blob/master/imgs/1.png)
图2
![图2](https://github.com/front-thinking/ng-citySelector/blob/master/imgs/2.png)
图3
![图3](https://github.com/front-thinking/ng-citySelector/blob/master/imgs/3.png)

参考example
线上[Demo](https://front-thinking.github.io/projects/ng-citySelector/)