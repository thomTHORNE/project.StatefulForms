"use strict";
const alertService = AlertService();
const stateService = StateService();
const apiService = ApiService(alertService);
const formService = FormService(stateService, apiService, alertService);
(() => stateService.CreateState())();
function createObject(source, omitKeys) {
    let target = {};
    for (let key in source) {
        if (!omitKeys.includes(key))
            target[key] = source[key];
    }
    return target;
}
//# sourceMappingURL=setup.js.map