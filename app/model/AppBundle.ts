import { AppBaseModel } from "../model/AppBaseModel";

export class AppBundle extends AppBaseModel {
    public PartitionKey: string;
    public RowKey: string;
    public Code: string;
    public Title: string;    
}