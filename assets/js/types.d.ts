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
  WriteState: ( id: keyof IStateModel, prop: keyof IStateModel[typeof id], value: any ) => void;
  ReadState: ( id: keyof IStateModel ) => IStateModel[typeof id];
}
interface IStateModel {
  'job-application': ICareerModel;
}
// #endregion


// #region FormService
interface IFormService {
  Submit: ( formName: keyof IStateModel, callback: ( input: IStateModel[typeof formName] ) => void ) => void;
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


// #region ApiService
interface IApiService {
  Post: ( url: string, data: Record<string, any> ) => Promise<IApiResponse>;
}
interface IApiResponse {
  result: boolean;
  errorDataset: {
    message: string;
    errorCode: number;
  }[];
  message: string;
}
// #endregion


// #region Utilities
type ValueOf<T> = T[keyof T];
// #endregion


// #region FormModels
interface IPostCareerModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  attachments: IFileModel[];
}
interface ICareerModel {
  fname: string;
  lname: string;
  email: string;
  phoneNumber: string;
  cv: IFileModel;
  letter: IFileModel;
}
interface IFileModel {
  filename: string;
  contentType: string;
  base64: string;
}
// #endregion