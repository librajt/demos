/**
 * @author liquan02
 * @date 2015-2-4
 * @description 多选型checkbox，返回的值为已选值以逗号合并
 * @example
	[√]小学 [√]初中 []高中 []大学
 	'小学,初中' 
 * @输入的参数
 	expander-in-out-Content：双向绑定的数据
    expander-in-list：checkbox列表
    expander-in-no-limit：选择不限时应该的值
 */
define([

], function () {
angular.module('adsense').register
.directive('richCheckbox', function() {

	// checkbox的初始化还没做 mark
	var link = function(scope){

		init();

		// 多选
       	scope.setValue = function( item, dom){
			if( scope.content.indexOf( item) != -1){
				scope.valueArr[ item] = 0;
			}
			else{
				scope.valueArr[ item] = 1;
			}
			contentJoin();
		}

		// 全选
		scope.fullSelect = function(){
			var value;
			if( scope.isFull){
				value = 0;
			}
			else{
				value = 1;
			}
			$.each( scope.valueArr, function(item){
	    		scope.valueArr[ item] = value;
	    	});
			contentJoin();
		}

		// 不限
		scope.noLimitSelect = function(){
			if( scope.isNoLimit == 1){
				scope.content = scope.noLimitValue;
			}
			else{
				contentJoin();
			}
		}

		// 初始化
		function init(){
			scope.valueArr = {};
			scope.isNoLimit = 1;
			scope.content = scope.content || '';
			// 初始化scope.valueArr的值

			if( typeof scope.inList == 'string'){
				scope.checkboxList = scope.inList.split(',');
			}
			else if( $.isArray( scope.inList)){
				scope.checkboxList = scope.inList;
			}
			else{
				console.log( scope.inList);
				console.log('错误，传入的参数不是数组也不是字符串！')
				return;
			}

			var defaultValue = typeof scope.defaultValue == 'undefined' ? 0 : scope.defaultValue;
	    	for( var i=0,n=scope.checkboxList.length; i<n; i++){
	    		var name = scope.checkboxList[ i];
	    		if( scope.content){
		    		scope.valueArr[ name] = scope.content.indexOf( name) != -1 ? 1 : 0;
		    		scope.isNoLimit = false;
		    		//scope.valueArr[ scope.checkboxList[ i]] = scope.content.indexOf( scope.checkboxList[ i]) != -1 ? 1 : 0;
		    	}
		    	else{
		    		scope.valueArr[ name] = defaultValue;
		    	}
	    	}

	    	contentJoin();
	    }

	    function contentJoin(){
	    	// 改变ngModel的值
	    	var ngModelArr = [];
	    	$.each( scope.valueArr, function(item){
	    		if( scope.valueArr[ item] > 0){
	    			ngModelArr.push( item);
	    		}
	    	});
	    	scope.content = ngModelArr.join(',');

			// 判断是否全选了	    	
	    	if( ngModelArr.length == scope.checkboxList.length){
	    		scope.isFull = true;
	    	}
	    	else{
	    		scope.isFull = false;
	    	}
	    }

    }

	return {
		restrict: 'EA',
        templateUrl: __uri('./rich_checkbox.html'),
        replace: true,
        scope: {
            inList: '=expanderInList',
            content: '=expanderInOutContent', // 双向绑定的值
            noLimitValue: '=expanderInNoLimit', // 不限，如果有不限这个选项，则将全选替换为不限
            defaultValue: '=expanderInDefaultValue', // 默认值
        },
        link: link
    };
})

});