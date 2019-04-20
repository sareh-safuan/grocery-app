import React from 'react'
import Home from './components/Home'
import Update from './components/Update';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            route: 'home',
            api: {
                page: 1,
                sort: 'asc',
                select: 'productName',
                type: '',
                keyword: ''
            },
            homeLocalState: {
                action: 'display',
                groceries: []
            },
            updateLocalState: {
                grocery: null
            }
        }

        this.clickHandler = this.clickHandler.bind(this)
        this.selectHandler = this.selectHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)

        this.fetchGroceries = this.fetchGroceries.bind(this)
        this.searchGrocery = this.searchGrocery.bind(this)
        this.fetchGrocery = this.fetchGrocery.bind(this)
        this.updateGrocery = this.updateGrocery.bind(this)
    }

    componentDidMount() {
        this.fetchGroceries()
        this.clickHandler()
        this.selectHandler()
    }

    clickHandler() {
        document.body.addEventListener('click', (e) => {
            e.preventDefault()
            if(e.target.tagName === "BUTTON") {
                let nextAPIState = JSON.parse(JSON.stringify(this.state.api))
                let keyword

                switch(e.target.id) {
                    case "prev":
                        nextAPIState.page = (nextAPIState.page === 1) ? 1 : --nextAPIState.page
                        this.setState({ api: nextAPIState })
                        this.fetchGroceries()
                        break;

                    case "next":
                        nextAPIState.page += 1
                        this.setState({ api: nextAPIState })
                        this.fetchGroceries()
                        break;

                    case "searchBy_brand":
                        keyword = document.getElementById(`input_brand`).value.trim()
                        this.searchGrocery("brand", keyword)
                        break;

                    case "searchBy_productName":
                        keyword = document.getElementById(`input_productName`).value.trim()
                        this.searchGrocery("productName", keyword)
                        break;

                    case "clear":
                        this.fetchGroceries()
                        break;

                    case "cancel":
                        this.setState({ route: 'home' }) 
                        break;

                    case "save":
                        this.updateGrocery()
                        break;

                    default: 
                        const id = e.target.id.replace('_edit', "")
                        this.setState({ route: 'update' })
                        this.fetchGrocery(id)
                }
            }
        })
    }

    selectHandler() {
        document.addEventListener('change', (e) => {
            if(e.target.tagName === "SELECT") {
                const temp = e.target.value.split(",")
                const page = 1
                const sort = temp[0]
                const select = temp[1]
                const order = e.target.options[e.target.selectedIndex].text
                
                this.setState({ api: { page, sort, select } })
                this.fetchGroceries()
            }
        })
    }

    inputHandler(e) {
        const elem = e.target.id
        const value = e.target.value
        const grocery = this.state.updateLocalState.grocery

        grocery[elem] = value
        this.setState({ updateLocalState: { grocery } })
    }

    fetchGroceries() {
        const { page, sort, select } = this.state.api

        fetch(`grocery?page=${page}&sort=${sort}&select=${select}`)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                const nextState = JSON.parse(JSON.stringify(this.state.homeLocalState))
                nextState.action = "display"
                nextState.groceries = res.result
                this.setState({ homeLocalState: nextState })
            }else {
                alert(res.message)
                const APIState = JSON.parse(JSON.stringify(this.state.api))
                APIState.page -= 1
                this.setState({ api: APIState })
            }
        })
        .catch(err => { throw err })
    }

    searchGrocery(type, keyword) {
        if(keyword.length) {
            fetch(`grocery/search?type=${type}&keyword=${keyword}`)
            .then(res => res.json())
            .then(res => {
                if(res.result) {
                    const nextHomeState = JSON.parse(JSON.stringify(this.state.homeLocalState))
                    nextHomeState.action = "search"
                    nextHomeState.groceries = res.result

                    const APIState = JSON.parse(JSON.stringify(this.state.api))
                    APIState.type = type
                    APIState.keyword = keyword

                    this.setState({ homeLocalState: nextHomeState })
                    this.setState({ api: APIState })
                }else {
                    alert(res.message)
                }
            })
            .catch(err => { throw err })
        }
    }

    fetchGrocery(id) {
        fetch(`grocery/${id}`)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                this.setState({ updateLocalState: { grocery: res.result } })
            }
        })
        .catch(err => { throw err })
    }

    updateGrocery() {
        const { id } = this.state.updateLocalState.grocery
        fetch(`grocery/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.updateLocalState.grocery)
        })
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                const { action } = this.state.homeLocalState

                switch(action) {
                    case 'display':
                        this.fetchGroceries()
                        break
                    case 'search':
                        const { type, keyword } = this.state.api 
                        this.searchGrocery(type, keyword)
                        break
                }

                this.setState({ route: 'home' })
                alert(res.message)
            }else {
                let message = res.message
                res.errorsMsg.forEach(a => {
                    message += `\n - ${a}`
                })
                            
                alert(message)
            }
        })
        .catch(err => { throw err })
    }

    render() {
        const route = this.state.route
        let pageToRender

        switch(route) {
            case 'home':
                pageToRender = <Home 
                                localState={this.state.homeLocalState} 
                                />
                break
            case 'update':
                pageToRender = <Update 
                                item={this.state.updateLocalState.grocery} 
                                inputChange={this.inputHandler}
                                />
                break
        }

        return (
            <div className="container">
                { pageToRender }
            </div>
        )
    }
}

export default App