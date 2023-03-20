"use strict";
function FormService(stateService, alertService) {
    function Submit(formName, callback) {
        const form = document.forms.namedItem(formName);
        const isValid = form.checkValidity();
        const alertsContainer = document.querySelector('.form-alerts');
        const formElements = Array.from(form.elements);
        _ResetFormErrors(alertsContainer, formElements);
        if (isValid) {
            formElements.forEach(field => {
                if (field.nodeName === 'INPUT' && field.type === 'file')
                    return;
                stateService.WriteState(formName, field.name, field.value);
            });
            callback(stateService.ReadState(formName));
        }
        else {
            const invalidFields = _GetInvalidFields(form);
            let alerts = [];
            invalidFields.forEach(field => {
                (field.validation).forEach(type => {
                    const validationText = field.displayName + ValidationTypeDictionary[type];
                    const alertConfig = alertService.ConfigFactory('validation', validationText);
                    Object.keys(ValidationTypeDictionary).includes(type) && alerts.push(alertConfig);
                });
            });
            _RenderFormErrors(invalidFields, alerts, alertsContainer);
        }
    }
    function _RenderFormErrors(invalidFields, alerts, alertsContainer) {
        alertService.RenderAlerts(alertsContainer, alerts);
        invalidFields.forEach(fieldData => fieldData.field.closest('.field').classList.add('invalid'));
    }
    function _ResetFormErrors(alertsContainer, formElements) {
        alertsContainer.innerHTML = '';
        formElements.forEach(element => element.closest('.field').classList.remove('invalid'));
    }
    function _GetInvalidFields(form) {
        let invalidFields = Array.from(form.elements).map(field => {
            if (field.validity.valid === false) {
                const validityStateClone = createObject(field.validity, ['typeMismatch']);
                return {
                    field,
                    displayName: field.labels[0].innerText,
                    validation: Object.keys(validityStateClone).filter(key => field.validity[key] === true)
                };
            }
            return undefined;
        }).filter(field => field);
        return invalidFields;
    }
    function OnFileUpload(uploadZone) {
        const formName = uploadZone.closest('form').id;
        const fieldName = uploadZone.name;
        if (uploadZone && uploadZone.files && uploadZone.files.length > 0) {
            Array.from(uploadZone.files).forEach(file => {
                const filename = file.name;
                const contentType = file.type;
                const fileReader = new FileReader();
                fileReader.onload = function (event) {
                    const encodedFile = event.target.result;
                    const readerModel = {
                        filename: filename,
                        contentType: contentType,
                        base64: encodedFile.split(";base64,")[1]
                    };
                    uploadZone.parentElement.classList.add('hasDocument');
                    stateService.WriteState(formName, fieldName, readerModel);
                };
                fileReader.readAsDataURL(file);
            });
        }
    }
    return {
        Submit,
        OnFileUpload
    };
}
const ValidationTypeDictionary = {
    patternMismatch: ' je u neispravnom formatu.',
    valueMissing: ' je obavezno polje.',
    badInput: '',
    customError: '',
    rangeOverflow: '',
    rangeUnderflow: '',
    stepMismatch: '',
    tooLong: '',
    tooShort: '',
    valid: ''
};
//# sourceMappingURL=form-service.js.map