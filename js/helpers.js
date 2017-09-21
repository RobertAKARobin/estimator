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
m.wrap = function(wrapperNode, wrapperAttributes, list){
	var output = [];
	wrapperAttributes = (wrapperAttributes || {});
	for(var i = 0, l = list.length; i < l; i++){
		output.push(m(wrapperNode, wrapperAttributes, list[i]));
	}
	return output;
}
m.input = function(object, property, attributes){
	var attributes = (attributes || {});
	attributes.value = (object[property] || '');
	attributes.oninput = function(event){
		event.redraw = false;
		object[property] = event.target.value;
	}
	return m('input', attributes);
}
