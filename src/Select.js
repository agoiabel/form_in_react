import React from 'react';

const Select = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <select name={props.name} className={formControl} value={props.value} onChange={props.onChange}>
                {props.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;