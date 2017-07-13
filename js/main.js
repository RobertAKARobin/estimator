'use strict';

var Table = (function(){

	return {
		view: function(){
			return 'Component'
		}
	}

})();

document.addEventListener('DOMContentLoaded', function(){
	m.mount(document.getElementById('project'), Table);
});
