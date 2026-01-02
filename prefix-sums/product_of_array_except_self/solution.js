// Method 1: Using Prefix and Suffix Products
function productExcept_Self(nums) {
    var n = nums.length;
    if (n === 0)
        return [];
    var prefixProducts = new Array(n).fill(1);
    var suffixProducts = new Array(n).fill(1);
    var result = new Array(n).fill(0);
    // Calculate prefix products
    for (var i = 1; i < n; i++) {
        prefixProducts[i] = prefixProducts[i - 1] * nums[i - 1];
    }
    // Calculate suffix products
    for (var i = n - 2; i >= 0; i--) {
        suffixProducts[i] = suffixProducts[i + 1] * nums[i + 1];
    }
    // Calculate result
    for (var i = 0; i < n; i++) {
        result[i] = prefixProducts[i] * suffixProducts[i];
    }
    return result;
}
// Method 2: Space Optimized Approach
function productExceptSelf(nums) {
    var n = nums.length;
    if (n === 0)
        return [];
    var result = new Array(n).fill(1);
    // Calculate prefix products
    for (var i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    // Calculate suffix products and update result
    var suffixProduct = 1;
    for (var i = n - 1; i >= 0; i--) {
        result[i] *= suffixProduct;
        suffixProduct *= nums[i];
    }
    return result;
}
// Example usage:
var nums = [1, 2, 3, 4];
console.log(productExceptSelf(nums)); // Output: [24, 12, 8, 6]
