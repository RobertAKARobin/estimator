'use strict';

Array.prototype.collect = function(propertyName){
	var array = this;
	var output = [];
	for(var i = 0, l = array.length; i < l; i++){
		var item = array[i];
		if(typeof item[propertyName] == 'function'){
			output.push(item[propertyName].call(item));
		}else{
			output.push(item[propertyName]);
		}
	}
	return output;
}
Array.prototype.flatten = function(){
	var array = this;
	var output = [];
	iterateThrough(array);
	return output;

	function iterateThrough(array){
		for(var i = 0, l = array.length; i < l; i++){
			var item = array[i];
			if(item instanceof Array){
				iterateThrough(item);
			}else{
				output.push(item);
			}
		}
	}
}
