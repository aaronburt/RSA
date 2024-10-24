class RSA {
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
        console.log(`Private Key Found: ${potentialPrivateKey}`);
        break;
      }

      if(potentialPrivateKey == (this.phi - 1)){
        console.log("Couldn't create private key")
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
  encrypt(message: number) {
    return (BigInt(message) ** BigInt(this.exponent)) % BigInt(this.productOfPrimes);
  }

  decrypt(ciphertext: bigint) {
    return (BigInt(ciphertext) ** BigInt(this.privateKey)) % BigInt(this.productOfPrimes);
  }

  encryptString(plaintext: string){

    const encrypted = new Array();

    for(let i = 0; i < plaintext.length; i++){
      encrypted.push(plaintext.charCodeAt(i));
    }

    console.log(encrypted.toString().replaceAll(',', ''))
  }

}

const rsa = new RSA(457, 349);

rsa.calcProductOfPrimes()
   .calcPhi()
   .calcMod()
   .calcQuotient()
   .calcRemainder()
   .calcPrivateKey()
   .calcPublicKey();

const message = 4;
const encryptedMessage = rsa.encrypt(message);
console.log(`Encrypted Message: ${encryptedMessage}`);

const decryptedMessage = rsa.decrypt(BigInt(encryptedMessage));
console.log(`Decrypted Message: ${decryptedMessage}`);

rsa.encryptString("aaronburt")