function AlertService(): IAlertService {

  function ConfigFactory(
    variation: AlertConfigVariation,
    subject: string,
    options?: {
      dismissCallback?: () => void;
      message?: string;
      linkHref?: string;
      linkText?: string;
    }
  ): IAlertConfig {

    switch ( variation ) {
      case 'validation':
        return {
          class: 'error',
          iconInfo: AlertIcons.error,
          subject
        };

      case 'success':
        return {
          class: 'success',
          iconInfo: AlertIcons.success,
          iconClose: AlertIcons.close,
          subject,
          message: options.message,
          linkHref: options.linkHref,
          linkText: options.linkText,
          dismissCallback: options.dismissCallback
        };

      case 'warning':
        return {
          class: 'warning',
          iconInfo: AlertIcons.warning,
          iconClose: AlertIcons.close,
          subject,
          message: options.message,
          linkHref: options.linkHref,
          linkText: options.linkText,
          dismissCallback: options.dismissCallback
        };

      case 'error':
        return {
          class: 'error',
          iconInfo: AlertIcons.error,
          iconClose: AlertIcons.close,
          subject,
          message: options.message,
          linkHref: options.linkHref,
          linkText: options.linkText,
          dismissCallback: options.dismissCallback
        };

      case 'hint':
        return {
          iconInfo: AlertIcons.hint,
          iconClose: AlertIcons.close,
          subject,
          message: options.message,
          linkHref: options.linkHref,
          linkText: options.linkText,
          dismissCallback: options.dismissCallback
        };
    }
  }


  function RenderAlerts( alertsContainer: HTMLElement, configs: IAlertConfig[] ) {
    alertsContainer.style.height = `${( AlertHeight + AlertMargin ) * configs.length + AlertsContainerOffset}px`;


    configs.forEach( ( config, index ) => {
      const alert = _CreateAlert( config );

      setTimeout( () => {
        alertsContainer.appendChild( alert );
        alert.animate( Transforms, Timing );
        if ( index === ( configs.length - 1 ) ) alertsContainer.style.height = '';
      }, AnimationDelay * index );
    } );
  }


  function DismissAlert() {
    this.closest( '.alert' ).remove();
  }


  function _CreateAlert( config: IAlertConfig ): Element {
    const template = `
      <div class="alert ${config.class} ${config.dismissCallback ? 'dismissable' : ''}">
        <div class="headline">
          <i class="icon icon-alert">
            ${config.iconInfo}
          </i>
          <span class="subject">${config.subject}</span>
          ${config.dismissCallback ?
        `<i class="icon icon-close">
              ${config.iconClose}
            </i>` : ''
      }
        </div>
        <div class="content">
        ${config.message ?
        `<p class="message">${config.message}</p>` : ''
      }
        ${config.linkText ?
        `<a href="${config.linkHref}" class="link">${config.linkText}</a>` : ''
      }
          </div>
      </div>
  `;

    const element = _InjectIntoDOM( template );

    if ( config.dismissCallback ) {
      element.querySelector<HTMLElement>( '.icon.icon-close' ).onclick = config.dismissCallback.bind( element );
    }

    return element;
  }


  function _InjectIntoDOM( template: string ): HTMLElement {
    return new DOMParser().parseFromString( template, 'text/html' ).body.firstElementChild as HTMLElement;
  }


  return {
    ConfigFactory,
    RenderAlerts,
    DismissAlert
  };
}


// region Constants
const AlertHeight = 56;
const AlertMargin = 10;
const AlertLastChildMargin = 32;
const AlertsContainerOffset = AlertLastChildMargin - AlertMargin;
const AnimationDelay = 65;

const Transforms = [
  { transform: "translateX(100vw)" },
  { transform: "translateX(0)" },
];

const Timing = {
  duration: 330,
  iterations: 1,
  easing: "ease"
};

const AlertIcons = {
  success: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM14.59 5.58L8 12.17L5.41 9.59L4 11L8 15L16 7L14.59 5.58Z" fill="currentColor"/>
    </svg>
  `,
  warning: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="currentColor"/>
    </svg>
  `,
  error: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="currentColor"/>
    </svg>
  `,
  hint: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="currentColor"/>
    </svg>
  `,
  close: `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
      fill="#546E7A" />
    </svg>
  `
};
// endregion