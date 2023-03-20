function FormService(
  stateService: IStateService,
  alertService: IAlertService
) {

  function Submit( formName: keyof IStateModel, callback: ( input: IStateModel[typeof formName] ) => void ) {
    const form = document.forms.namedItem( formName ) as FormElement;
    const isValid = form.checkValidity();
    const alertsContainer: HTMLElement = document.querySelector( '.form-alerts' );
    const formElements = Array.from( form.elements );

    _ResetFormErrors( alertsContainer, formElements );

    if ( isValid ) {
      formElements.forEach( field => {
        if ( field.nodeName === 'INPUT' && field.type === 'file' ) return;
        stateService.WriteState( formName, ( field.name as keyof IStateModel[keyof IStateModel] ), field.value );
      } );

      callback( stateService.ReadState( formName ) );
    } else {
      const invalidFields = _GetInvalidFields( form );
      let alerts: IAlertConfig[] = [];

      invalidFields.forEach( field => {

        ( field.validation ).forEach( type => {
          const validationText = field.displayName + ValidationTypeDictionary[type];
          const alertConfig = alertService.ConfigFactory( 'validation', validationText );

          Object.keys( ValidationTypeDictionary ).includes( type ) && alerts.push( alertConfig );
        } );
      } );

      _RenderFormErrors( invalidFields, alerts, alertsContainer );
    }
  }


  function _RenderFormErrors( invalidFields: FormField[], alerts: IAlertConfig[], alertsContainer: HTMLElement ) {
    alertService.RenderAlerts( alertsContainer, alerts );
    invalidFields.forEach( fieldData => fieldData.field.closest( '.field' ).classList.add( 'invalid' ) );
  }


  function _ResetFormErrors( alertsContainer: HTMLElement, formElements: HTMLElement[] ) {
    alertsContainer.innerHTML = '';
    formElements.forEach( element => element.closest( '.field' ).classList.remove( 'invalid' ) );
  }


  function _GetInvalidFields( form: FormElement ): FormField[] {
    let invalidFields = Array.from( form.elements ).map( field => {
      if ( field.validity.valid === false ) {
        const validityStateClone = createObject( field.validity, ['typeMismatch'] );

        return {
          field,
          displayName: field.labels[0].innerText,
          validation: ( Object.keys( validityStateClone ) as Array<keyof SelectiveValidityState> ).filter( key => field.validity[key] === true )
        };
      }
      return undefined;
    } ).filter( field => field );

    return invalidFields;
  }


  // region FileUpload
  /**
   * Read file as base64 and write to state. Currently supports only single file upload.
   */
  function OnFileUpload( uploadZone: HTMLInputElement ) {
    const formName = uploadZone.closest( 'form' ).id as keyof IStateModel;
    const fieldName = uploadZone.name as keyof IStateModel[keyof IStateModel];

    if ( uploadZone && uploadZone.files && uploadZone.files.length > 0 ) {

      Array.from( uploadZone.files ).forEach( file => {
        const filename = file.name;
        const contentType = file.type;
        const fileReader = new FileReader();

        fileReader.onload = function ( event ) {
          const encodedFile = event.target.result as string;
          const readerModel: IFileModel = {
            filename: filename,
            contentType: contentType,
            base64: encodedFile.split( ";base64," )[1]
          };

          uploadZone.parentElement.classList.add( 'hasDocument' );
          stateService.WriteState( formName, fieldName, readerModel );
        };

        fileReader.readAsDataURL( file );
      } );
    }
  }
  // endregion


  return {
    Submit,
    OnFileUpload
  };
}

// region Constants
/**
 * Validation dictionary - use with field name as suffix.
 */
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
// endregion