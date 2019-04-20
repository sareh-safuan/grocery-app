import React from 'react'

const Input = (props) => {
    return (
        <div className="col-md-6">
            <form>
                <div className="form-group mr">
                    <label className="col-form-label">{props.label}</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id={props.inputId} 
                        onFocus={props.inputEvent} 
                        />
                </div>
                <button className="btn btn-primary" id={props.buttonId}>
                    Search
                </button>
            </form>   
        </div>
    )
}

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
            <div className="col-md-12 mb-3">
                <div className="row">
                    <Input 
                        label="Brand"
                        inputId="input_brand"
                        buttonId="searchBy_brand"
                        inputEvent={this.inputHandler}
                    />
                    <Input 
                        label="Product Name"
                        inputId="input_productName"
                        buttonId="searchBy_productName"
                        inputEvent={this.inputHandler}
                    />
                </div>
            </div>
        )
    }
}

export default Form