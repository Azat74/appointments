import React from 'react';
import InputMask from 'react-input-mask';

export default function PhoneInput(props) {
    return <InputMask
        {...props}
        className='form-control'
        mask='+7 (999) 999-99-99'
        maskChar='' />;
}