export interface Transaction {
	Id: number,
	ApplicationId: number,
	ServiceId: number;
	Consumer: string;
	MessageId: number;
	InitialDate?: Date;
	FinalDate?: Date;
	Transactions?: Transaction[];
}
