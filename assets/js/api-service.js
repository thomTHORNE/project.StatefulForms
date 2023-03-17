"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function ApiService(alertService, alertsContainer) {
    function Post(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    return Promise.reject(response);
                }
            })
                .then((data) => {
                const alertConfig = alertService.ConfigFactory('success', 'Uspjeh', {
                    message: data.message,
                    dismissCallback: alertService.DismissAlert
                });
                alertService.RenderAlerts(alertsContainer, [alertConfig]);
                return data;
            })
                .catch((response) => {
                console.log(response.status, response.statusText);
                return response.json().then((error) => {
                    let alerts = [];
                    error.errorDataset.forEach(data => {
                        const alertConfig = alertService.ConfigFactory('error', data.message, {
                            message: data.errorCode.toString(),
                            dismissCallback: alertService.DismissAlert
                        });
                        alerts.push(alertConfig);
                    });
                    alertService.RenderAlerts(alertsContainer, alerts);
                    return error;
                });
            });
        });
    }
    return {
        Post
    };
}
//# sourceMappingURL=api-service.js.map