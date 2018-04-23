const Table = ( ()=>{

	return {
		view: ()=>{
			return 'Component'
		}
	}

} )()

document.addEventListener('DOMContentLoaded', ()=>{
	m.mount(document.getElementById('project'), Table)
})
