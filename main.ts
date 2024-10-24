export default class RSA {
  // Prime vales
  public p1: number = 0;
  public p2: number = 0;
  
  // Random exponent 
  public exponent: number = 0;
  
  // Sometimes referred to as N
  public productOfPrimes: number = 0;
  
  // Some algo called Euler's Totient Function, specific to RSA
  public phi: number = 0;
  public mod: number = 0;

  // Dividing productOfPrimes by Phi
  public quotient: number = 0;
  public remainder: number = 0;

  // The private key
  public privateKey: number = 0;
  public publicKey: Record<string, number> = {}

  constructor(p1: number, p2: number, exponent: number = 5) {
    this.p1 = p1; 
    this.p2 = p2;
    this.exponent = exponent;
  }

  calcPublicKey(){

    this.publicKey = {
      n: this.productOfPrimes,
      e: this.exponent
    }

    return this;
  }
  
  calcProductOfPrimes(): this {
    this.productOfPrimes = this.p1 * this.p2;
    return this;
  }

  calcPhi(): this {
    this.phi = (this.p1 - 1) * (this.p2 - 1);
    return this;
  }

  calcMod(): this {
    this.mod = this.productOfPrimes % this.phi;
    return this;
  }
  
  calcQuotient(): this {
    this.quotient = Math.floor(this.productOfPrimes / this.phi);
    return this;
  }
  
  calcRemainder(): this {
    this.remainder = this.productOfPrimes % this.phi; 
    return this;
  }

  calcPrivateKey() {
    for (let potentialPrivateKey = 1; potentialPrivateKey <= this.phi - 1; potentialPrivateKey++) {
  
      if (this.isValidPrivateKey(potentialPrivateKey)) {
        this.privateKey = potentialPrivateKey;
        break;
      }

      if(potentialPrivateKey == (this.phi - 1)){
        console.warn("Couldn't create private key")
      }
    }
    return this;
  }

  get public(){
    return this.publicKey;
  }

  get private(){
    return this.privateKey;
  }

  isValidPrivateKey(potentialPrivateKey: number) {
    return (potentialPrivateKey * this.exponent) % this.phi === 1;
  };

  // Needed to use big int, otherwise the ** would result in infinity and then gg wp
  encrypt(message: number | bigint) {
    return (BigInt(message) ** BigInt(this.exponent)) % BigInt(this.productOfPrimes);
  }

  decrypt(ciphertext: number | bigint) {
    return (BigInt(ciphertext) ** BigInt(this.privateKey)) % BigInt(this.productOfPrimes);
  }


  encryptString(message: string){
    const encryptedArray: bigint[] = [];
    for(let letter = 0; letter < message.length; letter++){
      const plainChar: number = message.charCodeAt(letter);
      const encryptChar = BigInt(plainChar);
      encryptedArray.push(BigInt(this.encrypt(encryptChar)));
    }

    return encryptedArray;
  }
  

  decryptString(input: bigint[]){
    const plaintext = [];
    for(let enc = 0; enc < input.length; enc++){
      const current: bigint = input[enc];
      const currentDecrypted = Number(this.decrypt(current));
      plaintext.push(String.fromCharCode(currentDecrypted));
    }

    return plaintext.join('')
  }

  build(){
    return this.calcProductOfPrimes()
    .calcPhi()
    .calcMod()
    .calcQuotient()
    .calcRemainder()
    .calcPrivateKey()
    .calcPublicKey();
  }
}
