'use strict';

var Project = DataModel('project');
var Sprint = DataModel('sprint');
var Feature = DataModel('feature');

var Interface = (function(){

	var project = undefined;

	var views = {
		sprint: function(sprint){
			return [
				m('h2', 'Sprint: ' + sprint.data.title),
				m('ul', [
					m.wrap('li', {}, sprint.getChildren(Feature).map(views.feature))
				])
			]
		},
		feature: function(feature){
			return [
				feature.data.title
			]
		}
	}

	return {
		oninit: function(){
			m.request({
				url: './sample.json'
			}).then(function(response){
				Data = response;
				project = Project.new(response);
				Object.keys(Data.sprints).forEach(Sprint.findByID);
				Object.keys(Data.features).forEach(Feature.findByID);
			})
		},
		view: function(){
			if(project){
				return [
					m('h1', project.data.title),
					m('p', project.data.description),
					Sprint.all.map(views.sprint)
				]
			}else{
				return [
					m('p', 'Loading...')
				]
			}
		}
	}

})();

document.addEventListener('DOMContentLoaded', function(){
	m.mount(document.getElementById('project'), Interface);
});
