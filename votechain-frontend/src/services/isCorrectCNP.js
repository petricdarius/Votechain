export default function isCorrectCNP(CNP) {
  console.log("CNP:", CNP);
  var number = "279146358279";
  let sum = 0;

  for (let i = 0; i < number.length; i++) {
    sum += number[i] * CNP[i];
  }

  const rest = sum % 11;
  let control;
  if (rest > 10) return false;

  if (rest === 10) control = 1;
  else control = rest;

  return control === parseInt(CNP[CNP.length - 1]);
}
