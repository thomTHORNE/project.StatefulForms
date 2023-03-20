"use strict";
const alertService = AlertService();
const stateService = StateService();
const apiService = ApiService(alertService, document.querySelector('.form-alerts'));
const formService = FormService(stateService, alertService);
(() => stateService.CreateState())();
function postCareerForm(input) {
    const model = {
        firstName: input.fname,
        lastName: input.lname,
        email: input.email,
        phoneNumber: input.phoneNumber,
        attachments: [input.cv, input.letter]
    };
    apiService.Post("/api/form/submit", model).then(() => {
    });
}
function createObject(source, omitKeys) {
    let target = {};
    for (let key in source) {
        if (!omitKeys.includes(key))
            target[key] = source[key];
    }
    return target;
}
//# sourceMappingURL=setup.js.map