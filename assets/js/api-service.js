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
function ApiService(alertService) {
    function Post(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(response => {
                response.json();
            }).catch((error) => {
                console.log('error: ', error);
                const alertConfig = alertService.ConfigFactory('error', 'Puče veza', {
                    message: 'Molimo ponovno ugasite i upalite kompjuter.',
                    dismissCallback: alertService.DismissAlert
                });
                const alertsContainer = document.querySelector('.form-alerts');
                alertService.RenderAlerts(alertsContainer, [alertConfig]);
            });
        });
    }
    return {
        Post
    };
}
//# sourceMappingURL=api-service.js.map