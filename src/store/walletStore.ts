import { atom } from "jotai";
import {
	WalletApi,
	detectConcordiumProvider,
} from "@concordium/browser-wallet-api-helpers";
import toast from "react-hot-toast";
import {
	deserializeReceiveReturnValue,
	toBuffer,
	SchemaVersion,
} from "@concordium/web-sdk";
import { shortenAddress } from "../utils/utils";

export type Wallet = {
	address?: string;
	provider?: WalletApi;
};

export const walletAtom = atom<Wallet>({
	address: undefined,
	provider: undefined,
});

export const addressPreviewAtom = atom((get) => {
	const wallet = get(walletAtom);
	if (wallet.address) return shortenAddress(wallet.address);
	return "XXX...XXX";
});
export const walletPresentAtom = atom((get) => {
	const wallet = get(walletAtom);
	return wallet.address && wallet.provider;
});

export const initiateWalletAtom = atom(
	null, // it's a convention to pass `null` for the first argument
	(get, set) => {
		detectConcordiumProvider()
			.then((provider) => {
				set(walletAtom, { ...get(walletAtom), provider });
				provider
					.connect()
					.then((accountAddress) => {
						set(walletAtom, { ...get(walletAtom), address: accountAddress });
					})
					.catch(() =>
						toast.error("Connection to the Concordium wallet has been rejected")
					);
			})
			.catch(() =>
				toast.error("Connection to the Concordium wallet has timed out")
			);
	}
);

/* async function grabCount(provider: WalletApi) {
  return await provider
    .getJsonRpcClient()
    .invokeContract({
      contract: {
        index: CONTRACT_INDEX,
        subindex: BigInt(0),
      },
      method: `${CONTRACT_NAME}.view`,
      parameter: toBuffer(''),
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((data: any) => {
      const val = deserializeReceiveReturnValue(
        toBuffer(data?.returnValue, 'hex'),
        toBuffer(RAW_SCHEMA, 'base64'),
        CONTRACT_NAME,
        'view',
        SchemaVersion.V2
      );
      return val.count;
    });
}
 */
