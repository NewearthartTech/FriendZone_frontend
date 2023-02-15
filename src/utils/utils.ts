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
		(Number(shareReward.MaxAge) ?? 0) >= (Number(shareReward.MinAge) ?? 0) &&
		shareReward.Countries.length >= 1 &&
		(shareReward?.NumberOfUsersAbleToClaim ?? 0) >= 1 &&
		(shareReward.AmountPaidPerClick ?? 0) >= 1 &&
		(shareReward.MaxPaidClicksPerUser ?? 0) >= 1 &&
		urlPattern.test(shareReward?.RewardLink!)
	);
};
