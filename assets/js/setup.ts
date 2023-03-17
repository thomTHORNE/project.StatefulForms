// region Setup
const alertService: IAlertService = AlertService();
const stateService: IStateService = StateService();
const apiService: IApiService = ApiService( alertService, document.querySelector<HTMLElement>( '.form-alerts' ) );
const formService: IFormService = FormService( stateService, apiService, alertService );

( () => stateService.CreateState() )();
// endregion


// region Utils
/**
 * Used in `FormService.GetInvalidFields` to create a JavaScript clone object from HTMLObjectElement
 */
function createObject<Source>( source: Source, omitKeys: ( keyof Source )[] ): Record<string, any> {
  let target: Record<string, any> = {};
  for ( let key in source ) {
    if ( !omitKeys.includes( key ) ) target[key] = source[key];
  }
  return target;
}
// endregion