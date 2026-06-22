import type {AxiosResponse} from 'axios';
import {StatusCodeMapping} from '../../enums';

export const shouldDisplayError = (response: AxiosResponse) =>
  StatusCodeMapping[response.status];
