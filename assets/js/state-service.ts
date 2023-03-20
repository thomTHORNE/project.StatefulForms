function StateService() {

  const _state = new Map<keyof IStateModel, IStateModel[keyof IStateModel]>();

  function CreateState(): void {
    Array.from( document.forms ).forEach( ( form: FormElement ) => {
      const formElements = Array.from<HTMLInputElement>( form.elements );
      let model: any = {};

      formElements.forEach( field => {
        model[field.name] = field.value;
      } );

      _state.set( form.id as keyof IStateModel, model );
    } );
    console.log( 'create -> state: ', _state );
  }


  function WriteState( id: keyof IStateModel, prop: keyof IStateModel[typeof id], value: any ): void {
    console.log( 'write -> state:id: ', id );
    console.log( 'write -> state:prop: ', prop );
    console.log( 'write -> state:value: ', value );
    const model = _state.get( id );
    model[prop] = value;
    console.log( 'write -> state: ', _state );
  }


  function ReadState( id: keyof IStateModel ): IStateModel[typeof id] {
    console.log( 'get -> state: ', _state.get( id ) );
    return _state.get( id );
  }

  return {
    CreateState,
    WriteState,
    ReadState
  };
}