function StateService() {

  const _state = new Map<string, StateModel>();

  function CreateState() {
    Array.from( document.forms ).forEach( ( form: FormElement ) => {
      const formElements = Array.from<HTMLInputElement>( form.elements );
      let model: any = {};

      formElements.forEach( field => {
        model[field.name] = field.value;
      } );

      _state.set( form.id, model );
    } );
    console.log( 'create -> state: ', _state );
  }


  function WriteState( id: string, key: string, value: StateModelValue ) {
    console.log( 'write -> state:id: ', id );
    console.log( 'write -> state:key: ', key );
    console.log( 'write -> state:value: ', value );
    const model = _state.get( id );
    model[key] = value;
    console.log( 'write -> state: ', _state );
  }


  function ReadState( id: string ) {
    console.log( 'get -> state: ', _state.get( id ) );
    return _state.get( id );
  }

  return {
    CreateState,
    WriteState,
    ReadState
  };
}