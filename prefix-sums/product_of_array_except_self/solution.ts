// Method 1: Using Prefix and Suffix Products


function productExcept_Self(nums: number[]): number[] {
    const n: number = nums.length;
    if (n === 0) return [];

    const prefixProducts: number[] = new Array(n).fill(1);
    const suffixProducts: number[] = new Array(n).fill(1);
    const result: number[] = new Array(n).fill(0);

    // Calculate prefix products
    for (let i = 1; i < n; i++) {
        prefixProducts[i] = prefixProducts[i - 1] * nums[i - 1];
    }

    // Calculate suffix products
    for (let i = n - 2; i >= 0; i--) {
        suffixProducts[i] = suffixProducts[i + 1] * nums[i + 1];
    }

    // Calculate result
    for (let i = 0; i < n; i++) {
        result[i] = prefixProducts[i] * suffixProducts[i];
    }

    return result;
}


// Method 2: Space Optimized Approach


function productExceptSelf(nums: number[]): number[] {
    const n: number = nums.length;
    if (n === 0) return [];

    const result: number[] = new Array(n).fill(1);

    // Calculate prefix products
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Calculate suffix products and update result
    let suffixProduct: number = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffixProduct;
        suffixProduct *= nums[i];
    }

    return result;
}


// Example usage:
const nums: number[] = [1, 2, 3, 4];
console.log(productExceptSelf(nums)); // Output: [24, 12, 8, 6]
