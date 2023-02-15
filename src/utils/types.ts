export interface RewardAttribute {
	Id?: string;
	Countries: Array<string>;
	MinAge?: number | string;
	MaxAge?: number | string;
	NumberOfUsersAbleToClaim?: number;
	RewardLink?: string;
	WalletAddress?: string;
	AmountPaidPerClick?: number;
	MaxPaidClicksPerUser?: number;
	NumberOfUsers?: number;
}
export interface Referal {
	Id?: string;
	PersonalLink?: string;
	WalletAddress?: string;
	RewardLink?: string;
	AmountToClaim?: number;
	HasClaimed?: boolean;
}
export interface ReferalResponse {
	Referal: Referal;
	RewardAttribute: RewardAttribute;
}
export interface RewardClaim {
	PersonalLink: string;
	WalletAddress: string;
}

export interface Verifier {
	Id: string;
	Challenge: string;
	WalletAddress: string;
}

// DOTNET Misc
interface IAsyncResultBase {
	isLoading?: boolean;
	loadingPrompt?: string;
	error?: Error;
}

export interface IAsyncResult<T> extends IAsyncResultBase {
	result?: T;
}
