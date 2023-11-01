export const isWalletValid = (wallet) => {
  if (!wallet) return false;
  return /^[A-Za-z0-9]*$/.test(wallet);
}