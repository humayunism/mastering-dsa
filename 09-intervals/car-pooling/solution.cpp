#include <algorithm>
#include <iostream>
#include <utility>
#include <vector>

using namespace std;

class Solution {
public:
    bool carPooling(const vector<vector<int>>& trips, int capacity) {
        vector<pair<int, int>> events;
        events.reserve(trips.size() * 2);

        for (const auto& trip : trips) {
            const int passengers = trip[0];
            const int start = trip[1];
            const int end = trip[2];

            events.push_back({start, passengers});
            events.push_back({end, -passengers});
        }

        // Sort by location, then process drop-offs before pick-ups at the same stop.
        sort(events.begin(), events.end());

        int currentLoad = 0;
        for (const auto& [location, change] : events) {
            (void)location;
            currentLoad += change;
            if (currentLoad > capacity) {
                return false;
            }
        }

        return true;
    }
};

int main() {
    Solution solution;

    vector<vector<int>> trips = {{2, 1, 5}, {3, 3, 7}};

    cout << boolalpha;
    cout << "capacity = 4 -> " << solution.carPooling(trips, 4) << '\n';
    cout << "capacity = 5 -> " << solution.carPooling(trips, 5) << '\n';

    return 0;
}
