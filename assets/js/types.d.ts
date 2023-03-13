// #region AlertService
interface IAlertService {
  ConfigFactory: (
    variation: AlertConfigVariation, subject: string, options?: {
      dismissCallback?: () => void;
      message?: string;
      linkHref?: string;
      linkText?: string;
    }
  ) => IAlertConfig;
  RenderAlerts: ( alertsContainer: HTMLElement, configs: IAlertConfig[] ) => void;
  DismissAlert: () => void;
}
interface IAlertConfig {
  dismissCallback?: () => void;
  class?: string;
  iconInfo: ValueOf<typeof AlertIcons>;
  iconClose?: ValueOf<typeof AlertIcons>;
  subject: string;
  message?: string;
  linkHref?: string;
  linkText?: string;
}
type AlertConfigVariation = 'validation' | 'success' | 'warning' | 'error' | 'hint';
// #endregion


// #region StateService
interface IStateService {
  CreateState: () => void;
  WriteState: ( id: string, key: string, value: StateModelValue ) => void;
  ReadState: ( id: string ) => StateModel;
}
type StateModelValue = string | number | boolean | Record<string, string>;
type StateModel = Record<string, StateModelValue>;
// #endregion


// #region FormService
interface IFormService {
  Submit: ( formName: string ) => void;
  OnFileUpload: ( uploadZone: HTMLInputElement ) => void;
}
interface FormElement extends HTMLFormElement {
  elements: HTMLFormControlsCollection & {
    [index: number]: HTMLInputElement;
  };
}
interface FormField {
  displayName: string;
  validation: Array<keyof SelectiveValidityState>;
  field: HTMLInputElement;
}
type SelectiveValidityState = Omit<ValidityState, 'typeMismatch'>;
// #endregion


// #region FormService
interface IApiService {
  Post: ( url: string, data: StateModel ) => Promise<void>;
}
// #endregion


// #region Utilities
type ValueOf<T> = T[keyof T];
// #endregion