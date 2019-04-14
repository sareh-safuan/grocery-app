import React from 'react'
import Form from './components/Form'
import Action from './components/Action'
import Display from './components/Display'
import Update from './components/Update'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            path: 'home',
            grocery: [],
            page: 1,
            sort: 'asc',
            action: 'default',
            select: 'productName',
            item: null,
            type: '',
            keyword: '',
            order: 'Product Name - Ascending'
        }

        this.clickHandler = this.clickHandler.bind(this)
        this.selectHandler = this.selectHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)

        this.fetchGrocery = this.fetchGrocery.bind(this)
        this.searchGrocery = this.searchGrocery.bind(this)
        this.fetchSingleGrocery = this.fetchSingleGrocery.bind(this)
        this.updateGrocery = this.updateGrocery.bind(this)
    }

    componentDidMount() {
        this.clickHandler()
        this.selectHandler()
        this.fetchGrocery()
    }

    clickHandler() {
        document.body.addEventListener('click', (e) => {
            e.preventDefault()
            if(e.target.tagName === "BUTTON") {
                let { page } = this.state
                let keyword

                switch(e.target.id) {

                    case "prev":
                        page = (page === 1) ? 1 : --page
                        this.setState({ page })
                        this.fetchGrocery()
                        break;

                    case "next":
                        page++
                        this.setState({ page })
                        this.fetchGrocery()
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
                        this.setState({ action: "default" })
                        this.fetchGrocery()
                        break;

                    case "cancel":
                        this.setState({ path: 'home' }) 
                        break;

                    case "save":
                        this.updateGrocery()
                        break;

                    default: 
                        const id = e.target.id.replace('_edit', "")
                        this.setState({ path: 'update' })
                        this.fetchSingleGrocery(id)
                }
            }
        })
    }

    selectHandler() {
        document.addEventListener('change', (e) => {
            if(e.target.tagName === "SELECT") {
                const temp = e.target.value.split(",")
                const sort = temp[0]
                const select = temp[1]
                const page = 1
                const order = e.target.options[e.target.selectedIndex].text
                
                this.setState({ page, sort, select, order })
                this.fetchGrocery()
            }
        })
    }

    inputHandler(e) {
        const elem = e.target.id
        const value = e.target.value
        const item = this.state.item

        item[elem] = value
        this.setState({ item })
    }

    fetchGrocery() {
        const { page, sort, select } = this.state

        fetch(`grocery?page=${page}&sort=${sort}&select=${select}`)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                this.setState({ grocery: res.result })
            }else {
                alert(res.message)
                const page = --this.state.page
                this.setState({ page })
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
                    const action = 'search'
                    this.setState({ type, keyword, action ,grocery: res.result })
                }else {
                    alert(res.message)
                }
            })
            .catch(err => { throw err })
        }
    }

    fetchSingleGrocery(id) {
        fetch(`grocery/${id}`)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                this.setState({ item: res.result })
            }
        })
        .catch(err => { throw err })
    }

    updateGrocery() {
        const { id } = this.state.item

        fetch(`grocery/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.item)
        })
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                const { action } = this.state

                if(action === "default") {
                    this.fetchGrocery()
                }else if(action === "search") {
                    const { type, keyword } = this.state
                    this.searchGrocery(type, keyword)
                }

                this.setState({ path: 'home' })
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
        const grocery = this.state.grocery
        const action = this.state.action
        const path = this.state.path
        const item = this.state.item
        const order = this.state.order
        let screen

        const home = (
            <div>
                <div className="row">
                    <Form />
                </div>
                <br />
                <div className="row">
                    <Action action={action} order={order} />
                </div>
                <div className="row">
                    <Display grocery={grocery} />
                </div>
            </div>
        )

        if(path === "home") {
            screen = home
        }else if(path === "update"){
            screen = <Update item={item} inputChange={this.inputHandler} />
        }

        return (
            <div className="container">
                <div>
                    <h1>Grocery App</h1>
                </div>
                { screen }
            </div>
        )
    }
}

export default App