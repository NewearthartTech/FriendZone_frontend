import { AttributesKeys, IdStatementBuilder } from "@concordium/web-sdk";
import { RewardAttribute } from "./types";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { deleteChallenge, getAuth, getChallenge } from "./backend";
import { Wallet } from "../store/walletStore";

export const onVerifyID = async (
	rewardAttribute: RewardAttribute,
	wallet: Wallet
): Promise<boolean> => {
	const { provider, address: walletAddress } = wallet;
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

	const data = await getChallenge(walletAddress!);

	const result = provider!
		.requestIdProof(walletAddress!, statement, data.challenge)
		.then(async (proof) => {
			/* // Check how to use that proof
			let result = getAuth(data.challenge);
			const token = (await result).result;
			if (token) {
				localStorage.setItem("token_key_cc", token);
			} */
			return true;
		})
		.catch(async (e) => {
			await deleteChallenge(data.challenge);
			return false;
		});
	return result;
};
