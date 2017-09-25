'use strict';

var Project = DataModel('project');
var Sprint = DataModel('sprint');
var Feature = DataModel('feature');

var Interface = (function(){

	var project = undefined;

	var events = {
		addFeatureToSprint: function(event){
			var newFeature = this;
			if(event.keyCode == 13){
				newFeature.sprint.putNewChild(Feature, newFeature.data);
			}else{
				event.redraw = false;
			}
		},
		addSprint: function(event){
			var newSprint = this;
			if(event.keyCode == 13){
				Sprint.putNew(newSprint.data);
			}else{
				event.redraw = false;
			}
		},
		removeFeature: function(event){
			var feature = this;
			feature.delete();
		}
	}

	var views = {
		sprint: {
			show: function(sprint){
				var newFeature = {
					sprint: sprint,
					data: {}
				};
				return [
					m('h2', 'Sprint: ' + sprint.data.title),
					m('ul', [
						m.wrap('li', {}, sprint.getChildren(Feature).map(views.feature.show)),
						m('li', [
							m.input(newFeature.data, 'title', {
								placeholder: 'Feature name',
								onkeyup: events.addFeatureToSprint.bind(newFeature)
							})
						])
					])
				]
			},
			new: function(){
				var newSprint = {
					data: {}
				};
				return [
					m('h2', [
						m.input(newSprint.data, 'title', {
							placeholder: 'Sprint name',
							onkeyup: events.addSprint.bind(newSprint)
						})
					])
				]
			}
		},
		feature: {
			show: function(feature){
				return [
					m('button', {
						onclick: events.removeFeature.bind(feature)
					}, 'x'),
					feature.data.title
				]
			}
		}
	}

	return {
		oninit: function(){
			m.request({
				url: './sample.json'
			}).then(function(response){
				Data = response;
				project = Project.getNew(response);
				Object.keys(Data.sprints).forEach(Sprint.loadById);
				Object.keys(Data.features).forEach(Feature.loadById);
			})
		},
		view: function(){
			if(project){
				return [
					m('h1', project.data.title),
					m('p', project.data.description),
					Sprint.all.map(views.sprint.show),
					views.sprint.new()
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
