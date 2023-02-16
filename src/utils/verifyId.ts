import { AttributesKeys, IdStatementBuilder } from "@concordium/web-sdk";
import { RewardAttribute } from "./types";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { deleteChallenge, getAuth, getChallenge } from "./backend";

export const onVerifyID = async (
	rewardAttribute: RewardAttribute,
	provider: WalletApi,
	walletAddress: string
) => {
	const statementBuilder = new IdStatementBuilder();

	statementBuilder.addMembership(
		AttributesKeys.countryOfResidence,
		rewardAttribute.countries
	);
	statementBuilder.addRange(
		AttributesKeys.dob,
		`${rewardAttribute.maxAge}`,
		`${rewardAttribute.minAge}`
	);
	const statement = statementBuilder.getStatement();

	const data = await getChallenge(walletAddress);
	provider
		.requestIdProof(walletAddress, statement, data.challenge)
		.then(async (proof) => {
			// Check how to use that proof
			let result = getAuth(data.challenge);
			const token = (await result).result;
			if (token) {
				localStorage.setItem("token_key_cc", token);
			}
		})
		.catch(async (e) => {
			await deleteChallenge(data.challenge);
		});
};
