// Misc utilities

import { RewardAttribute } from "./types";

export const copyText = (text: string) => {
	navigator.clipboard.writeText(text);
};
export const shortenAddress = (address: string) => {
	return `${address.slice(0, 3)}...${address.slice(
		address.length - 3,
		address.length
	)}`;
};

export const validShareReward = (shareReward: RewardAttribute) => {
	const urlPattern = new RegExp(
		/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
	);
	return (
		(Number(shareReward.maxAge) ?? 0) >= (Number(shareReward.minAge) ?? 0) &&
		shareReward.countries.length >= 1 &&
		(Number(shareReward?.numberOfUsersAbleToClaim) ?? 0) >= 1 &&
		(Number(shareReward.amountPaidPerClick) ?? 0) >= 1 &&
		(Number(shareReward.maxPaidClicksPerUser) ?? 0) >= 1 &&
		urlPattern.test(shareReward?.rewardLink!)
	);
};
