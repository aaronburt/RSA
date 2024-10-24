import { assertEquals } from "@std/assert";
import RSA from "./main.ts";

Deno.test(function compareString() {
    const rsa = new RSA(457, 349);
    rsa.build();
    
    const plaintext: string = "hey how are you today? This is a basic test of email contents";
    const encrypted: bigint[] = rsa.encryptString(plaintext);    
    const decrypted: string = rsa.decryptString(encrypted)

    assertEquals(plaintext, decrypted);
});

Deno.test(function compareEmptyString() {
    const rsa = new RSA(457, 349);
    rsa.build();
    
    const plaintext: string = "";
    const encrypted: bigint[] = rsa.encryptString(plaintext);    
    const decrypted: string = rsa.decryptString(encrypted)

    assertEquals(plaintext, decrypted);
});

Deno.test(function compareSpecialCharacters() {
    const rsa = new RSA(457, 349);
    rsa.build();
    
    const plaintext: string = "!@#$%^&*()_+[]{}|;':\",.<>?";
    const encrypted: bigint[] = rsa.encryptString(plaintext);    
    const decrypted: string = rsa.decryptString(encrypted)

    assertEquals(plaintext, decrypted);
});

Deno.test(function compareLongString() {
    const rsa = new RSA(457, 349);
    rsa.build();
    
    const plaintext: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const encrypted: bigint[] = rsa.encryptString(plaintext);    
    const decrypted: string = rsa.decryptString(encrypted)

    assertEquals(plaintext, decrypted);
});

Deno.test(function compareNumericString() {
    const rsa = new RSA(457, 349);
    rsa.build();
    
    const plaintext: string = "1234567890";
    const encrypted: bigint[] = rsa.encryptString(plaintext);    
    const decrypted: string = rsa.decryptString(encrypted)

    assertEquals(plaintext, decrypted);
});

Deno.test(function compareStringWithNewlines() {
    const rsa = new RSA(457, 349);
    rsa.build();
    
    const plaintext: string = "Line 1\nLine 2\nLine 3";
    const encrypted: bigint[] = rsa.encryptString(plaintext);    
    const decrypted: string = rsa.decryptString(encrypted)

    assertEquals(plaintext, decrypted);
});

Deno.test(function compareStringWithTabs() {
    const rsa = new RSA(457, 349);
    rsa.build();
    
    const plaintext: string = "Column1\tColumn2\tColumn3";
    const encrypted: bigint[] = rsa.encryptString(plaintext);    
    const decrypted: string = rsa.decryptString(encrypted)

    assertEquals(plaintext, decrypted);
});

Deno.test(function compareStringWithUnicode() {
    const rsa = new RSA(457, 349);
    rsa.build();
    
    const plaintext: string = "こんにちは世界";
    const encrypted: bigint[] = rsa.encryptString(plaintext);    
    const decrypted: string = rsa.decryptString(encrypted)

    assertEquals(plaintext, decrypted);
});

Deno.test(function compareStringWithMixedContent() {
    const rsa = new RSA(457, 349);
    rsa.build();
    
    const plaintext: string = "Text with numbers 123 and symbols @#$%!";
    const encrypted: bigint[] = rsa.encryptString(plaintext);    
    const decrypted: string = rsa.decryptString(encrypted)

    assertEquals(plaintext, decrypted);
});

