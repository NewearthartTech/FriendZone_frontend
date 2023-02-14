// Misc utilities

export const copyText = (text: string) => {
	navigator.clipboard.writeText(text);
};
export const shortenAddress = (address: string) => {
	return `${address.slice(0, 3)}...${address.slice(
		address.length - 3,
		address.length
	)}`;
};
