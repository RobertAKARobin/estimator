'use strict';

var Data = {};
function DataModel(className){

	var Instance = {
		data: {}
	};
	Instance.constructor = function(data){
		var instance = this;
		instance.data = data;
		return instance;
	}
	Instance.getChildren = function(childClass){
		var instance = this;
		var output = [];
		for(var i = 0, l = childClass.all.length; i < l; i++){
			var child = childClass.all[i];
			if(child.data[instance.class.name + 'Id'] == instance.id){
				output.push(child);
			}
		}
		return output;
	}
	Instance.delete = function(){
		var instance = this;
		return !!(instance.class.delete(instance));
	}
	Instance.putNewChild = function(childClass, data){
		var instance = this;
		var child = childClass.putNew(data);
		child.data[instance.class.name + 'Id'] = instance.id;
		return child;
	}

	var Class = {
		all: [],
		allById: {},
		instance: Instance,
		name: className,
		namePlural: className + 's'
	};
	Class.getNew = function(){
		var instance = Object.create(Instance);
		Instance.constructor.apply(instance, arguments);
		return instance;
	}
	Class.putNew = function(){
		var instance = Class.getNew.apply(null, arguments);
		Class.putInAll(instance);
		return instance;
	}
	Class.putInAll = function(instance){
		instance.id = (instance.id || randomId());
		if(Class.getIndex(instance.id) > -1){
			return false;
		}else{
			Class.all.push(instance);
			Class.allById[instance.id] = instance;
		}
		return instance;
	}
	Class.loadById = function(id){
		var data = Data[Class.namePlural][id];
		var instance = Class.getNew(data);
		instance.id = id;
		Class.putInAll(instance);
		return instance;
	}
	Class.getIndex = function(instance){
		var index = 0;
		for(var l = Class.all.length; index < l; index++){
			if(Class.all[index].id == instance.id){
				return index;
			}
		}
		return -1;
	}
	Class.delete = function(instance){
		var index = Class.getIndex(instance);
		if(index < 0){
			return false;
		}else{
			delete Class.allById[instance.id];
			Class.all.splice(index, 1);
			return true;
		}
	}

	Instance.class = Class;
	return Class;

	function randomId(){
		return Math.floor(Math.random() * (Math.pow(10, 8)));
	}
}
