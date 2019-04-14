import React from 'react'

class Form extends React.Component {
    constructor() {
        super()

        this.inputHandler = this.inputHandler.bind(this)
    }

    inputHandler(e) {
        const id = e.target.id

        if(id === "input_brand") {
            document.getElementById('input_productName').value = ""
        }else if(id === "input_productName") {
            document.getElementById('input_brand').value = ""
        }
    }

    render() {
        return(
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6">
                        <form>
                            <div className="form-group mr">
                                <label className="col-form-label">Brand</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="input_brand" 
                                    onFocus={this.inputHandler} />
                            </div>
                            <button className="btn btn-primary" id="searchBy_brand">
                                Search
                            </button>
                        </form>   
                    </div>
                    <div className="col-md-6">
                        <form>
                            <div className="form-group mr">
                                <label className="col-form-label">Product Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="input_productName"
                                    onFocus={this.inputHandler} />
                            </div>
                            <button 
                                className="btn btn-primary" 
                                id="searchBy_productName">
                                Search
                            </button>
                        </form>   
                    </div>
                </div>
            </div>
        )
    }
}

export default Form