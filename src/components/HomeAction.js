import React from 'react'

const selector = (
    <div className="form-group">
        <select className="form-control">
            <option></option>
            <option value="asc,productName">Product Name - Ascending</option>
            <option value="desc,productName">Product Name - Descending</option>
            <option value="asc,brand">Brand - Ascending</option>
            <option value="desc,brand">Brand - Descending</option>
        </select>          
    </div>
)

const navigator = (
    <div className="float-right">
        <button className="btn btn-primary mr-2 mt-4 mb-1" id="prev">Previous</button>
        <button className="btn btn-primary mt-4 mb-1" id="next">Next</button>
    </div>
)

const defaultWrapper = (
    <div className="row">
        <div className="col-md-4">
            { selector }
        </div>
        <div className="col-md-8">
            { navigator }
        </div>
    </div>
)

const searchWrapper = (
    <div className="row">
        <div className="col-md-12 mb-2">
            <button 
                className="btn btn-danger float-right" 
                id="clear">
                Clear search
            </button>
        </div>
    </div>
)

const Action = (props) => {
    let display

    if(props.action === "display") {
        display = defaultWrapper
    }else {
        display = searchWrapper
    }

    return (
        <div className="col-md-12 mb-3">
            { display }
        </div>
    )
}

export default Action