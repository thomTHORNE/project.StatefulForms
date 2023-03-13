function ApiService( alertService: IAlertService ) {

  async function Post( url: string, data: StateModel ) {
    return await fetch( url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache",
      // credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow",
      // referrerPolicy: "no-referrer",
      body: JSON.stringify( data )
    } ).then( response => {
      response.json();
    } ).catch( ( error ) => {
      console.log( 'error: ', error );

      const alertConfig = alertService.ConfigFactory(
        'error',
        'Puče veza',
        {
          message: 'Molimo ponovno ugasite i upalite kompjuter.',
          // [-] EXAMPLE: if in need of custom logic, you can still use AlertService.DismissAlert by assigning the correct this reference
          // dismissCallback: function () {
          //   alertService.DismissAlert.call( this );
          // }
          dismissCallback: alertService.DismissAlert
        } );
      // const alertConfig = alertService.ConfigFactory(
      //   'success',
      //   'Uspjeh',
      //   {
      //     message: 'Poslali ste nebitnu prijavu.',
      //     dismissCallback: alertService.DismissAlert
      //   } );
      // const alertConfig = alertService.ConfigFactory(
      //   'hint',
      //   'Uspjeh',
      //   {
      //     message: 'Poslali ste nebitnu prijavu.',
      //     dismissCallback: alertService.DismissAlert
      //   } );
      // const alertConfig = alertService.ConfigFactory(
      //   'warning',
      //   'Uspjeh',
      //   {
      //     message: 'Poslali ste nebitnu prijavu.',

      //     dismissCallback: alertService.DismissAlert
      //   } );

      const alertsContainer = document.querySelector<HTMLElement>( '.form-alerts' );

      alertService.RenderAlerts( alertsContainer, [alertConfig] );
    } );
  }

  return {
    Post
  };
}
