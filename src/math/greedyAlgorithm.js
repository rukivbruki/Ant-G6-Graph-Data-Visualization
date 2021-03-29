// function computeChange2(coins, amount) {
//   // Create a array that is used to return the final result, instead of the global one.
//   const coincount = [];
//
//   // use the given `amount` to set `creminder ` rather than `AMOUNT` which may not be accessible if your code is called otherplace rather than here.
//   let i = 0;
//   let creminder = amount;
//   let ccoin;
//
//
//   while( i < coins.length )
//   {
//     // Lazily init the used coin for coin type i to 0.
//     coincount[i] = 0;
//     while ( coins[i] <= creminder )
//     {
//       creminder = creminder - coins[i];
//       ccoin = coincount[i];
//       ccoin += 1;
//       coincount[i] = ccoin;
//     }
//
//     i++;
//   }
//
//   return coincount;
// }
//
// computeChange2([50, 25, 10, 5, 1], 137);

//---------------------------------------------------------//

export const greedyAlgorithm = (changeArray, amount) => {
  const result = [];

  for (let i = 0; i < changeArray.length; i++) {
    let changeAmount = Math.floor(amount / changeArray[i]);
    amount -= changeArray[i] * changeAmount;

    result.push(changeAmount);
  }
  return result;
};
