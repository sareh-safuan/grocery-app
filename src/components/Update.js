import React from 'react'

const Input = (props) => (
    <div className="form-group">
        <label className="col-form-label">{props.label}</label>
        <input type="text" 
            className="form-control"
            id={props.inputId}
            value={props.inputValue}
            onChange={props.changeEvent}
        />
    </div>
)

const Update = (props) => {
    if(!props.item) return <p>Please wait...</p>

    return (
        <div className="row">
            <div className="col-md-8">
                <form>
                    <Input 
                        label="UPC Barcode"
                        inputId="upc12Barcode"
                        inputValue={props.item.upc12Barcode}
                        changeEvent={props.inputChange}
                    />
                    <Input 
                        label="Brand"
                        inputId="brand"
                        inputValue={props.item.brand}
                        changeEvent={props.inputChange}
                    />
                    <Input 
                        label="Product Name"
                        inputId="productName"
                        inputValue={props.item.productName}
                        changeEvent={props.inputChange}
                    />
                    <button className="btn btn-primary mr-2" id="save">Save</button>
                    <button className="btn btn-warning" id="cancel">Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default Update