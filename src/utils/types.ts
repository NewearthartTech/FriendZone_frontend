export interface RewardAttribute {
	id?: string;
	countries: Array<string>;
	minAge?: number | string;
	maxAge?: number | string;
	numberOfUsersAbleToClaim?: number;
	rewardLink?: string;
	walletAddress?: string;
	amountPaidPerClick?: number;
	maxPaidClicksPerUser?: number;
}
export interface Referal {
	id?: string;
	personalLink?: string;
	walletAddress?: string;
	rewardLink?: string;
	amountToClaim?: number;
	hasClaimed?: boolean;
}
export interface ReferalResponse {
	referal: Referal;
	rewardAttribute: RewardAttribute;
}
