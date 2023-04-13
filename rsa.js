const createKeys = () => {
  const isPrime = (num) => {
    if (num < 2) return false;
    if (num === 2 || num === 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let count = 5;
    while (count ** 2 <= num) {
      if (num % count === 0 || num % (count + 2) === 0) return false;
      count += 6;
    }
    return true;
  };  
  function generatePrime(bits) {
    const min = 2 ** (bits-1);
    const max = (2 ** bits) - 1;
    let prime = Math.floor(Math.random() * (max - min + 1)) + min;
    while (!isPrime(prime)) {
      prime = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return prime;
  }

  const p = generatePrime(8);
  const q = generatePrime(8); 
  const n = p*q;
  const phi = (p-1)*(q-1);
  
  const findE = () => {
    let e = 3;
    while (phi % e === 0 || !isPrime(e)) {
      e += 2;
    }
    return e;
  }; 
  const e = findE();
  const d =  () => {
    let num = 1;
    while ((num * e) % phi !== 1) {
      num++;
    }
    return num;
  };
  return {publicKey: [e, n], privateKey: [d(), n]};
};

const keys1 = createKeys();
const keys2 = createKeys();

const toDecode = (code, privateKey) => {
  return BigInt(code) ** BigInt(privateKey?.[0]) % BigInt(privateKey?.[1]);
};

const toCode = (value, publicKey) => {
  return BigInt(value) ** BigInt(publicKey?.[0]) % BigInt(publicKey?.[1]);
};

const messageToCode = 2
codedMessage = toCode(messageToCode, keys1.publicKey)

console.log(Number(toDecode(codedMessage, keys1.privateKey))); 