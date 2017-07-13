'use strict';

var Project = (function(){

	// Everything is private, unless attached to $Class or $Instance
	var $Class = {};
	var $Instance = {};
	var $Instance_Constructor;
	var $DOM_Constructor;

	$Class.all = [];
	// Class methods
	$Class.new = function(){
		var project = Object.create($Instance);
		$Instance_Constructor.apply(project, arguments);
		$DOM_Constructor.apply(project);
		$Class.all.push(project);
		return project;
	}

	$Instance_Constructor = function(title){
		var project = this;
		project.title = title;
	}
	// Instance methods
	$Instance.mountTo = function(element){
		var project = this;
		return m.mount(element, project.DOM);
	}

	// Creates a unique Mithril component for each instance
	$DOM_Constructor = function(){
		var project = this;
		project.DOM = {
			view: function(){
				return [
					m('h1', project.title)
				]
			}
		}
	}

	return $Class;

})();

document.addEventListener('DOMContentLoaded', function(){
	var project = Project.new('My sweet project');
	project.mountTo(document.getElementById('project'));
});
