import React from 'react'

function Alers(props) {
    return (
        <div style={{ height: "20px", marginTop: "10px" }}>
            {props.alert && (
                <div
                    className={`alert alert-${props.alert.type} alert-dismissible fade show`}
                    role="alert"
                >
                    <strong>{props.alert.type} :</strong>    {props.alert.msg}
                </div>
            )}
        </div>
    )
}

export default Alers