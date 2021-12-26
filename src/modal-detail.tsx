import React from 'react';

const Modal_Detail = (props:any) =>{
    const on_close = () =>{
        props.setOpen(false)
    }
return(
    <div className="modal" style={{ display: props.open ? 'block' : 'none', overflowY: 'auto' }} >
        <div className="modal-dialog" >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Detail</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={on_close} aria-label="Close"></button>
                </div>
                <div className="modal-body" >
                    <div className='mb-3' style={{display:'flex', justifyContent:'center'}}>
                        <img src={props.data.picture?.medium}alt="-" className='rounded-circle' style={{width:'120px'}}/>
                    </div>
                    <div>
                        <div className='row' style={{display:'flex', justifyContent:'center'}}>
                            <div className="col-5">
                                <p>First name : {props.data.name?.first}</p>
                                <p>Age : {props.data.dob?.age}</p>
                               
                            </div>
                            <div className="col-6">
                                <p>Last name : {props.data.name?.last}</p>
                                <p>Phone : {props.data?.phone}</p>
                            </div>
                        </div>
                        <div className='row' style={{marginLeft:'10px'}}>
                            <div className="col-8">
                            <p>Email : {props.data?.email}</p>
                            <p><b>Address</b></p>
                            <p>Street : {props.data.location?.street.name} </p>
                            <p>City : {props.data.location?.city}</p>
                            <p>Country : {props.data.location?.country} </p>
                            <p>Postcode : {props.data.location?.postcode}</p>
                            </div>
                        </div>
                      
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={on_close} data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div> 
    </div>
)
}

export default Modal_Detail