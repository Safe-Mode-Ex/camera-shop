import type {AxiosError} from 'axios';
import type {DetailedMessage} from './detailed-message';

export type ApiError = AxiosError<DetailedMessage>;
