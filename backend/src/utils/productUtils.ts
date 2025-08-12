// Function to generate unique barcode (EAN-13 format)
export function generateBarcode(): string {
    const prefix = '123'; // Company prefix
    const productCode = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    const partial = prefix + productCode;

    // Calculate check digit
    let sum = 0;
    for (let i = 0; i < partial.length; i++) {
        const digit = parseInt(partial[i]);
        sum += (i % 2 === 0) ? digit : digit * 3;
    }
    const checkDigit = (10 - (sum % 10)) % 10;

    return partial + checkDigit;
}

// Function to generate SKU based on category and sequence
export function generateSKU(category: string, sequence?: number): string {
    const categoryPrefix = category ? category.substring(0, 4).toUpperCase() : 'PROD';
    const seqNumber = sequence || Math.floor(Math.random() * 999) + 1;
    return `${categoryPrefix}-${seqNumber.toString().padStart(3, '0')}`;
}
