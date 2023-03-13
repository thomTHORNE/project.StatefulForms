// #region Init
const alertService = AlertService();
const stateService = StateService();
const apiService = ApiService( alertService );
const formService = FormService( stateService, apiService, alertService );

( () => stateService.CreateState() )();
// #endregion


// #region Utils
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
// #endregion