export interface RewardAttribute {
	id?: string;
	countries: Array<string>;
	minAge?: number | string;
	maxAge?: number | string;
	numberOfUsersAbleToClaim?: number | string;
	rewardLink?: string;
	walletAddress?: string;
	amountPaidPerClick?: number | string;
	maxPaidClicksPerUser?: number | string;
	numberOfUsers?: number;
}
export interface Referal {
	id?: string;
	personalLink?: string;
	walletAddress?: string;
	rewardId?: string;
	amountToClaim?: number;
	hasClaimed?: boolean;
}
export interface ReferalResponse {
	referal: Referal;
	rewardAttribute: RewardAttribute;
}
export interface RewardClaim {
	personalLink: string;
	walletAddress: string;
}

export interface Verifier {
	id: string;
	challenge: string;
	walletAddress: string;
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
