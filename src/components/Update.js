import React from 'react'

const Update = (props) => {
    if(!props.item) return <p>Please wait...</p>

    return (
        <div className="row">
            <div className="col-md-8">
                <form>
                    <div className="form-group">
                        <label className="col-form-label">UPC Barcode:</label>
                        <input type="text" 
                            className="form-control"
                            id="upc12Barcode" 
                            value={props.item.upc12Barcode} 
                            onChange={props.inputChange} />
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Brand:</label>
                        <input type="text" 
                            className="form-control" 
                            id="brand"
                            value={props.item.brand}
                            onChange={props.inputChange} />
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Product Name:</label>
                        <input type="text" 
                            className="form-control"
                            id="productName"
                            value={props.item.productName}
                            onChange={props.inputChange} />
                    </div>
                    <button className="btn btn-primary mr-2" id="save">Save</button>
                    <button className="btn btn-warning" id="cancel">Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default Update