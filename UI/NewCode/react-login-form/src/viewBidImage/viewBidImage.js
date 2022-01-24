import React from 'react'
import './viewBidImage.css'

class ViewProducts extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        return <>
            <div className="cardo">
                <img className="card-img-top" src={`data:image/jpeg;base64,${this.props.data.image}`} />
            </div>
        </>
    }
}

export default ViewProducts;