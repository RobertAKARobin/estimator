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
	},
	Instance.getChildren = function(childClass){
		var instance = this;
		var output = [];
		for(var i = 0, l = childClass.all.length; i < l; i++){
			var child = childClass.all[i];
			if(child.data[Class.name + 'Id'] == instance.id){
				output.push(child);
			}
		}
		return output;
	}
	Instance.createChild = function(childClass, data){
		var instance = this;
		var id = randomID();
		data[instance.class.name + 'Id'] = instance.id;
		Data[childClass.namePlural][id] = data;
		return childClass.findByID(id);
	}

	var Class = {
		all: [],
		allById: {},
		instance: Instance,
		name: className,
		namePlural: className + 's'
	};
	Class.new = function(){
		var instance = Object.create(Instance);
		Instance.constructor.apply(instance, arguments);
		Class.all.push(instance);
		return instance;
	}
	Class.findByID = function(id){
		var data = Data[Class.namePlural][id];
		var instance = Class.new(data);
		instance.id = id;
		Class.allById[instance.id] = instance;
		return instance;
	}

	Instance.class = Class;
	return Class;

	function randomID(){
		return Math.floor(Math.random() * (Math.pow(10, 8)));
	}
}
