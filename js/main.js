class LineItemList {

	constructor(){
		const lineItemList = this
		lineItemList.list = []
	}

	add(lineItem){
		const lineItemList = this
		lineItemList.list.push(lineItem)
	}

	remove(lineItem){
		const lineItemList = this
		lineItemList.list = lineItemList.list.filter((item)=>{
			return item !== lineItem
		})
	}

	view(){
		const lineItemList = this
		const newLineItem = new LineItem()
		return [
			lineItemList.list.map((lineItem) => {
				return m('p', [
					m('button', {
						onclick: (event)=>{
							lineItemList.remove(lineItem)
						}
					}, 'x'),
					lineItem.view_listItem()
				])
			}),
			newLineItem.view_form(),
			m('button', {
				onclick: (event)=>{
					lineItemList.add(newLineItem)
				}
			}, 'New')
		]
	}

}

class LineItem {

	constructor(data = {}){
		const lineItem = this
		Object.entries(LineItem.schema()).forEach(([fieldName, defaultValue])=>{
			lineItem[fieldName] = (data[fieldName] || defaultValue)
		})
	}

	static schema(){
		return {
			title: '',
			description: ''
		}
	}

	view_listItem(){
		const lineItem = this
		return `${lineItem.title}: ${lineItem.description}`
	}

	view_form(){
		const lineItem = this
		return Object.entries(lineItem).map(([fieldName, value])=>{
			return [
				m('input', {
					value: lineItem[fieldName],
					oninput: (event)=>{
						event.redraw = false
						lineItem[fieldName] = event.target.value
					}
				})
			]
		})
	}

}

document.addEventListener('DOMContentLoaded', ()=>{
	var lineItemList = new LineItemList()
	m.mount(document.getElementById('project'), lineItemList)
})
