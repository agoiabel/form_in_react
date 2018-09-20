import React from 'react';

const Password = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <input type="password" className={formControl} {...props} />
        </div>
    );
}

export default Password;