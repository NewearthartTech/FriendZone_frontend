/// <reference types="vite/client" />

import {
	IAsyncResult,
	Referal,
	ReferalResponse,
	RewardAttribute,
	RewardClaim,
	Verifier,
} from "./types";

export async function getRewardAttributes(
	rewardLink: string
): Promise<RewardAttribute> {
	const r = await fetch(`${import.meta.env.BACKEND_ENDPOINT}/${rewardLink}`);
	const body = await r.json();
	return JSON.parse(body);
}

export async function getAllRewardsAttributedByAddress(
	address: string
): Promise<RewardAttribute[]> {
	const r = await fetch(`${import.meta.env.BACKEND_ENDPOINT}/u/${address}`);
	const body = await r.json();
	return JSON.parse(body);
}

export async function getReferralInfo(
	personalLink: string
): Promise<RewardAttribute[]> {
	const r = await fetch(
		`${import.meta.env.BACKEND_ENDPOINT}/ref/${personalLink}`
	);
	const body = await r.json();
	return JSON.parse(body);
}

export async function createRewardAttributes(
	rewardAttribute: RewardAttribute
): Promise<RewardAttribute[]> {
	const r = await fetch(`${import.meta.env.BACKEND_ENDPOINT}`, {
		method: "post",
		headers: new Headers({ "content-type": "application/json" }),
		body: JSON.stringify(rewardAttribute),
	});
	const body = await r.json();
	return JSON.parse(body);
}

export async function claimReward(
	rewardClaim: RewardClaim
): Promise<ReferalResponse> {
	const r = await fetch(`${import.meta.env.BACKEND_ENDPOINT}/claimreward`, {
		method: "post",
		headers: new Headers({ "content-type": "application/json" }),
		body: JSON.stringify(rewardClaim),
	});
	const body = await r.json();
	return JSON.parse(body);
}

export async function createReferral(
	referral: Referal
): Promise<ReferalResponse> {
	const r = await fetch(`${import.meta.env.BACKEND_ENDPOINT}/referal`, {
		method: "post",
		headers: new Headers({ "content-type": "application/json" }),
		body: JSON.stringify(referral),
	});
	const body = await r.json();
	return JSON.parse(body);
}

export async function getReferalInfoByWalletAddress(
	address: string
): Promise<Referal[]> {
	const r = await fetch(
		`${import.meta.env.BACKEND_ENDPOINT}/referal/${address}`
	);
	const body = await r.json();
	return JSON.parse(body);
}

// Concordium Verification endpoints
export async function getChallenge(address: string): Promise<Verifier> {
	const r = await fetch(
		`${import.meta.env.BACKEND_ENDPOINT}/challenge/${address}`
	);
	const body = await r.json();
	return JSON.parse(body);
}

export async function getAuth(
	challenge: string
): Promise<IAsyncResult<string>> {
	const r = await fetch(
		`${import.meta.env.BACKEND_ENDPOINT}/prove/${challenge}`
	);
	const body = await r.json();
	return JSON.parse(body);
}

export async function deleteChallenge(challenge: string) {
	await fetch(`${import.meta.env.BACKEND_ENDPOINT}/prove/${challenge}`, {
		method: "delete",
	});
}
