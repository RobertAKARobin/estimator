'use strict';

var Project = DataModel('project');
var Sprint = DataModel('sprint');
var Feature = DataModel('feature');

var Interface = (function(){

	return {
		oninit: function(){
			m.request({
				url: './sample.json'
			}).then(function(response){
				Data = response;
				Object.keys(Data.sprints).forEach(Sprint.newFromID);
				Object.keys(Data.features).forEach(Feature.newFromID);
			})
		},
		view: function(){
			// if($sprints){
			// 	return [
			// 		m('h1', $title),
			// 		m('p', $description),
			// 		Object.keys($sprints).map(function(sprintId){
			// 			var sprint = $sprints[sprintId];
			// 			return [
			// 				m('h2', 'Sprint: ' + sprint.title),
			// 				m('ul', [
			// 					Object.keys($features).map(function(featureId){
			// 						var feature = $features[featureId];
			// 						if(feature.sprint == sprintId){
			// 							return m('li', feature.title);
			// 						}
			// 					})
			// 				])
			// 			]
			// 		})
			// 	]
			// }else{
			// 	return [
			// 		m('p', 'Loading...')
			// 	]
			// }
		}
	}

})();

document.addEventListener('DOMContentLoaded', function(){
	m.mount(document.getElementById('project'), Interface);
});
