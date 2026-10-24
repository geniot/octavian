import {environment} from "../environments/environment";

export class AnyService {
  readonly baseApiUrl = environment.BASE_API_URL;
  isLoading: boolean = false;
}
