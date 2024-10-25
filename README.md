# RSA Encryption Implementation

This is a simple implementation of the RSA encryption algorithm in TypeScript. The RSA class allows you to generate public and private keys based on two prime numbers, encrypt messages, and decrypt them.

## Features

- Generate public and private keys from two prime numbers.
- Encrypt and decrypt numeric messages.
- Encrypt and decrypt string messages by converting characters to their unicode values.

## Usage

1. **Instantiate the RSA Class**: Create an instance of the RSA class by providing two prime numbers.

2. **Build the Keys**: Call the `build()` method to calculate the product of the primes, Euler's Totient, and generate the public and private keys.

3. **Encrypt a Message**: Use the `encryptString()` method to encrypt a string message.

4. **Decrypt a Message**: Use the `decryptString()` method to decrypt the previously encrypted message.

### Example

```typescript
// Create an instance of the RSA class with two prime numbers, the exponent is autoDefined as 5 and autoBuild is true by default
const rsa = new RSA(457, 349, 5, true);

// Encrypt a message
const encrypted = rsa.encryptString("hey how are you today?");
console.log(encrypted); // Outputs the encrypted message as an array of bigints

// Decrypt the message
const decrypted = rsa.decryptString(encrypted);
console.log(decrypted); // Outputs: "hey how are you today?"
```

### Contributing

If you would like to contribute to this project, feel free

