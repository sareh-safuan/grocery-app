import React from 'react'

const Display = (props) => {
    let list
    if(props.groceries.length) {
        list = props.groceries.map(
            g => (
                <tr key={g.id}>
                    <td>{g.upc12Barcode}</td>
                    <td>{g.brand}</td>
                    <td>{g.productName}</td>
                    <td>
                        <button 
                            className="btn btn-success btn-sm" 
                            id={g.id+"_edit"}>
                            Edit
                        </button>
                    </td>
                </tr>
            ))
    }

    return (
        <div className="col-md-12">
            <table className="table">
                <thead>
                    <tr>
                        <th>UPC Barcode</th>
                        <th>Brand</th>
                        <th>Product Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { list }
                </tbody>
            </table>
        </div>
    )
}

export default Display