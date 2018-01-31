/**
 * @author liquan02
 * @date 2015-2-6
 */
define([

], function () {
angular.module('adsense').register
.directive('multiChoices', function() {

	// checkbox的初始化还没做 mark
	var link = function(scope){
		scope.firstContent = scope.firstContent || [];
		scope.secondContent = scope.secondContent || [];

		scope.selectFirst = function( item){
			selectItem( scope.firstContent, item);
		}

		scope.selectSecond = function( item, province){
			if( scope.secondFormat && scope.secondFormat.length){
				item = format( scope.secondFormat, {
					prefix: province,
					content: item
				});
			}
			selectItem( scope.secondContent, item);
		}

		scope.deleteFirst = function( item){
			deleteItem( scope.firstContent, item);
		}

		scope.deleteSecond = function( item){
			deleteItem( scope.secondContent, item);
		}

		var selectItem = function( list, item){
			if( $.inArray( item, list) == -1 ){
				list.push( item);
			}
		}

		var deleteItem = function( list, item){
			list.splice($.inArray( item, list), 1);
		}

		var format = function (e,t){if("undefined"==typeof t)return e;var n=/([.*+?^=!:${}()|[\]\/\\])/g,i="{".replace(n,"\\$1"),r="}".replace(n,"\\$1"),o=new RegExp("#"+i+"([^"+i+r+"]+)"+r,"g"),a=new RegExp("#"+i+"(\\d+)"+r,"g");if("object"==typeof t)return e.replace(o,function(e,n){var i=t[n];return"function"==typeof i&&(i=i(n)),"undefined"==typeof i?"":i});if("undefined"!=typeof t){var s=Array.prototype.slice.call(arguments,1),l=s.length;return e.replace(a,function(e,t){return t=parseInt(t,10),t>=l?e:s[t]})}}

    }

	return {
		restrict: 'EA',
        templateUrl: __uri('./multi_choices.html'),
        replace: true,
        scope: {
            choicesList: '=expanderInMultiChoices', // 不限，如果有不限这个选项，则将全选替换为不限,
            specailId: '=expanderInSpecialId',
            firstContent: '=expanderInOutFirstContent',
            secondContent: '=expanderInOutSecondContent',
            secondFormat: '=expanderInSecondFormat',
        },
        link: link
    };
})

});