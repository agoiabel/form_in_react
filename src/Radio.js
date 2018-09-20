import React from 'react';

const Radio = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">

            {props.options.map(option => (
                <div className="form-group" key={option.value}>
                    <label>{option.displayValue}</label>
                    <input type="radio"
                        name={props.name}
                        value={option.value}
                        onChange={props.onChange}
                        className={formControl}
                    />
                </div>
            ))}

        </div>
    );
}

export default Radio;