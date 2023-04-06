import { useState, useCallback } from "react";

export function UseFormValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: e.target.validationMessage
        });

        setIsValid(e.target.closest('.form').checkValidity());
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        }, [setValues, setErrors, setIsValid]
    )

    return {
        values,
        errors,
        isValid,
        handleChange,
        resetForm
    };
};