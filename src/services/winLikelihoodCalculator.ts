export function generateAntWinLikelihoodCalculator() {
  const delay = 3000 + Math.random() * 3000;
  const likelihoodOfAntWinning = Math.random();

  return (callback: (likelihood: number) => void) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}
