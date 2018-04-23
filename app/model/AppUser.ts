import {AppBaseModel} from "../model/AppBaseModel";
import { AppBundle } from "../model/AppBundle";

//extends the AppBaseModel class for extra variables commonly used in the model component 
export class AppUser extends AppBaseModel {
    public Email: string;
    public Briefs: AppBundle[];             
}