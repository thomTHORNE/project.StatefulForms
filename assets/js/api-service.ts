function ApiService( alertService: IAlertService, alertsContainer: HTMLElement ) {

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
    } )
      .then( ( response: Response ) => {
        if ( response.ok ) {
          return response.json();
        }
        else {
          return Promise.reject( response );
        }
      } )
      .then( ( data: IApiResponse ) => {
        const alertConfig = alertService.ConfigFactory(
          'success',
          'Uspjeh',
          {
            message: data.message,
            dismissCallback: alertService.DismissAlert
          } );

        alertService.RenderAlerts( alertsContainer, [alertConfig] );

        return data;
      } )
      .catch( ( response: Response ) => {
        console.log( response.status, response.statusText );

        return response.json().then( ( error: IApiResponse ) => {
          let alerts: IAlertConfig[] = [];

          error.errorDataset.forEach( data => {
            const alertConfig = alertService.ConfigFactory(
              'error',
              data.message,
              {
                message: data.errorCode.toString(),
                // [-] EXAMPLE: if in need of custom logic, you can still use AlertService.DismissAlert by assigning the correct this reference
                // dismissCallback: function () {
                //   alertService.DismissAlert.call( this );
                // }
                dismissCallback: alertService.DismissAlert
              } );

            alerts.push( alertConfig );
          } );

          alertService.RenderAlerts( alertsContainer, alerts );

          return error;
        } );
      } );
  }

  return {
    Post
  };
}
