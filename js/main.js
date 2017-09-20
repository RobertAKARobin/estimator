'use strict';

var $d = {};

var Project = (function(){

	return {
		oninit: function(){
			m.request({
				url: './sample.json'
			}).then(function(response){
				$d = response;
			})
		},
		view: function(){
			if($d.sprints){
				return [
					m('h1', $d.title),
					m('p', $d.description),
					Object.keys($d.sprints).map(function(sprintId){
						var sprint = $d.sprints[sprintId];
						return [
							m('h2', 'Sprint: ' + sprint.title),
							m('ul', [
								Object.keys($d.features).map(function(featureId){
									var feature = $d.features[featureId];
									if(feature.sprint == sprintId){
										return m('li', feature.title);
									}
								})
							])
						]
					})
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
	m.mount(document.getElementById('project'), Project);
});
