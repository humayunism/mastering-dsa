#include <iostream>
#include <vector>

using namespace std;

class NumArray {
public:
    vector<int> prefixSum;

    // কনস্ট্রাক্টর
    NumArray(vector<int>& nums) {
        prefixSum.push_back(0);
        for (int num : nums) {
            prefixSum.push_back(prefixSum.back() + num);
        }
    }
    
    int sumRange(int left, int right) {
        return prefixSum[right + 1] - prefixSum[left];
    }
};

int main() {
    // টেস্ট করার জন্য ডাটা
    vector<int> nums = {-2, 0, 3, -5, 2, -1};
    NumArray* obj = new NumArray(nums);
    
    // টেস্ট কেস
    cout << "Sum (0, 2): " << obj->sumRange(0, 2) << endl; // আউটপুট: 1
    cout << "Sum (2, 5): " << obj->sumRange(2, 5) << endl; // আউটপুট: -1
    cout << "Sum (0, 5): " << obj->sumRange(0, 5) << endl; // আউটপুট: -3
    
    delete obj;
    return 0;
}