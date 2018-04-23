export abstract class AppBaseModel {
    public PartitionKey: string;
    public RowKey: string;
    public ForeignKey: string;
    public Created: Date;
}