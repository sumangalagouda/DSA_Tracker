import { useState, useEffect, useCallback } from "react";

// ─── ALL 192 PROBLEMS from PDF + roadmap, topic-wise ───────────────────────
const TOPICS = [
  {
    id: "arrays", name: "Arrays", icon: "▦", color: "#FF6B35", total: 22,
    problems: [
      { id:"a1",  name:"Two Sum",                          level:"Easy",   lc:"https://leetcode.com/problems/two-sum/",                                  hr:"https://www.hackerrank.com/challenges/ctci-array-left-rotation",     pattern:"Hashing",          tip:"Classic starter" },
      { id:"a2",  name:"Best Time to Buy & Sell Stock",    level:"Easy",   lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",          hr:"https://www.hackerrank.com/challenges/stockmax",                      pattern:"Array Greedy",     tip:"Track min price" },
      { id:"a3",  name:"Contains Duplicate",               level:"Easy",   lc:"https://leetcode.com/problems/contains-duplicate/",                        hr:"https://www.hackerrank.com/challenges/ctci-array-left-rotation",     pattern:"Hashing",          tip:"Use a set" },
      { id:"a4",  name:"Single Number",                    level:"Easy",   lc:"https://leetcode.com/problems/single-number/",                             hr:"https://www.hackerrank.com/challenges/missing-numbers",              pattern:"Bit XOR",          tip:"XOR all elements" },
      { id:"a5",  name:"Maximum Subarray (Kadane's)",      level:"Easy",   lc:"https://leetcode.com/problems/maximum-subarray/",                          hr:"https://www.hackerrank.com/challenges/maxsubarray",                  pattern:"DP/Greedy",        tip:"Must-know" },
      { id:"a6",  name:"Move Zeroes",                      level:"Easy",   lc:"https://leetcode.com/problems/move-zeroes/",                               hr:"https://www.hackerrank.com/challenges/array-manipulation",           pattern:"Two Pointers",     tip:"In-place trick" },
      { id:"a7",  name:"Find Missing Number",              level:"Easy",   lc:"https://leetcode.com/problems/missing-number/",                            hr:"https://www.hackerrank.com/challenges/missing-numbers",              pattern:"Math/XOR",         tip:"n*(n+1)/2 - sum" },
      { id:"a8",  name:"Intersection of Two Arrays",       level:"Easy",   lc:"https://leetcode.com/problems/intersection-of-two-arrays/",                hr:"https://www.hackerrank.com/challenges/ctci-array-left-rotation",     pattern:"Set/Binary Search",tip:"Use set" },
      { id:"a9",  name:"Plus One",                         level:"Easy",   lc:"https://leetcode.com/problems/plus-one/",                                  hr:"https://www.hackerrank.com/challenges/array-manipulation",           pattern:"Array Math",       tip:"Handle carry" },
      { id:"a10", name:"Remove Duplicates from Sorted",    level:"Easy",   lc:"https://leetcode.com/problems/remove-duplicates-from-sorted-array/",       hr:"https://www.hackerrank.com/challenges/ctci-array-left-rotation",     pattern:"Two Pointers",     tip:"Slow-fast ptr" },
      { id:"a11", name:"Rotate Array",                     level:"Medium", lc:"https://leetcode.com/problems/rotate-array/",                              hr:"https://www.hackerrank.com/challenges/ctci-array-left-rotation",     pattern:"Array/Math",       tip:"Reverse trick" },
      { id:"a12", name:"Product of Array Except Self",     level:"Medium", lc:"https://leetcode.com/problems/product-of-array-except-self/",              hr:"",                                                                   pattern:"Prefix/Suffix",    tip:"No division!" },
      { id:"a13", name:"Find All Duplicates in Array",     level:"Medium", lc:"https://leetcode.com/problems/find-all-duplicates-in-an-array/",           hr:"",                                                                   pattern:"Hashing/Index",    tip:"Mark visited" },
      { id:"a14", name:"Subarray Sum Equals K",            level:"Medium", lc:"https://leetcode.com/problems/subarray-sum-equals-k/",                     hr:"",                                                                   pattern:"Prefix Sum+Map",   tip:"Prefix + hashmap" },
      { id:"a15", name:"3Sum",                             level:"Medium", lc:"https://leetcode.com/problems/3sum/",                                       hr:"",                                                                   pattern:"Two Pointers",     tip:"Sort first" },
      { id:"a16", name:"Container With Most Water",        level:"Medium", lc:"https://leetcode.com/problems/container-with-most-water/",                  hr:"",                                                                   pattern:"Two Pointers",     tip:"Greedy shrink" },
      { id:"a17", name:"4Sum",                             level:"Medium", lc:"https://leetcode.com/problems/4sum/",                                       hr:"",                                                                   pattern:"Two Pointers",     tip:"Extend 3Sum" },
      { id:"a18", name:"Spiral Matrix",                    level:"Medium", lc:"https://leetcode.com/problems/spiral-matrix/",                              hr:"",                                                                   pattern:"Simulation",       tip:"Boundary shrink" },
      { id:"a19", name:"Set Matrix Zeroes",                level:"Medium", lc:"https://leetcode.com/problems/set-matrix-zeroes/",                          hr:"",                                                                   pattern:"In-place flags",   tip:"Use row/col flags" },
      { id:"a20", name:"Maximum Product Subarray",         level:"Medium", lc:"https://leetcode.com/problems/maximum-product-subarray/",                   hr:"",                                                                   pattern:"DP",               tip:"Track max & min" },
      { id:"a21", name:"Jump Game",                        level:"Medium", lc:"https://leetcode.com/problems/jump-game/",                                  hr:"",                                                                   pattern:"Greedy",           tip:"Track max reach" },
      { id:"a22", name:"Merge Intervals",                  level:"Medium", lc:"https://leetcode.com/problems/merge-intervals/",                            hr:"https://www.hackerrank.com/challenges/interval-selection",           pattern:"Sorting",          tip:"Sort by start" },
    ]
  },
  {
    id: "strings", name: "Strings", icon: "≈", color: "#06B6D4", total: 18,
    problems: [
      { id:"s1",  name:"Reverse a String",                   level:"Easy",   lc:"https://leetcode.com/problems/reverse-string/",                          hr:"https://www.hackerrank.com/challenges/ctci-string-manipulation",     pattern:"Two Pointers",         tip:"Basic" },
      { id:"s2",  name:"Valid Palindrome",                    level:"Easy",   lc:"https://leetcode.com/problems/valid-palindrome/",                        hr:"https://www.hackerrank.com/challenges/two-strings",                  pattern:"Two Pointers",         tip:"Ignore non-alphanum" },
      { id:"s3",  name:"Valid Anagram",                       level:"Easy",   lc:"https://leetcode.com/problems/valid-anagram/",                           hr:"https://www.hackerrank.com/challenges/anagram",                      pattern:"Hashing/Sort",         tip:"Char count" },
      { id:"s4",  name:"First Unique Character",              level:"Easy",   lc:"https://leetcode.com/problems/first-unique-character-in-a-string/",      hr:"",                                                                   pattern:"Hashing",              tip:"Char frequency" },
      { id:"s5",  name:"Implement strStr (indexOf)",          level:"Easy",   lc:"https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", hr:"",                                                        pattern:"Sliding Window",       tip:"KMP or brute" },
      { id:"s6",  name:"Count and Say",                       level:"Easy",   lc:"https://leetcode.com/problems/count-and-say/",                           hr:"",                                                                   pattern:"Simulation",           tip:"Read-aloud pattern" },
      { id:"s7",  name:"Longest Common Prefix",               level:"Easy",   lc:"https://leetcode.com/problems/longest-common-prefix/",                   hr:"",                                                                   pattern:"Horizontal scan",      tip:"Compare chars" },
      { id:"s8",  name:"Roman to Integer",                    level:"Easy",   lc:"https://leetcode.com/problems/roman-to-integer/",                        hr:"https://www.hackerrank.com/challenges/roman-numerals",               pattern:"Mapping",              tip:"Check prev val" },
      { id:"s9",  name:"Reverse Words in a String",           level:"Medium", lc:"https://leetcode.com/problems/reverse-words-in-a-string/",               hr:"",                                                                   pattern:"Two Pointers",         tip:"Split & rejoin" },
      { id:"s10", name:"Longest Substring Without Repeat",    level:"Medium", lc:"https://leetcode.com/problems/longest-substring-without-repeating-characters/", hr:"",                                                           pattern:"Sliding Window",       tip:"Freq hashmap" },
      { id:"s11", name:"Longest Palindromic Substring",       level:"Medium", lc:"https://leetcode.com/problems/longest-palindromic-substring/",            hr:"",                                                                   pattern:"Expand Around",        tip:"Expand from center" },
      { id:"s12", name:"Group Anagrams",                      level:"Medium", lc:"https://leetcode.com/problems/group-anagrams/",                           hr:"",                                                                   pattern:"Hashing",              tip:"Sort as key" },
      { id:"s13", name:"String to Integer (atoi)",            level:"Medium", lc:"https://leetcode.com/problems/string-to-integer-atoi/",                   hr:"",                                                                   pattern:"Simulation",           tip:"Edge cases!" },
      { id:"s14", name:"Integer to Roman",                    level:"Medium", lc:"https://leetcode.com/problems/integer-to-roman/",                         hr:"",                                                                   pattern:"Greedy",               tip:"Greedy subtraction" },
      { id:"s15", name:"Find All Anagrams in String",         level:"Medium", lc:"https://leetcode.com/problems/find-all-anagrams-in-a-string/",            hr:"",                                                                   pattern:"Sliding Window",       tip:"Fixed window" },
      { id:"s16", name:"Minimum Window Substring",            level:"Medium", lc:"https://leetcode.com/problems/minimum-window-substring/",                 hr:"",                                                                   pattern:"Sliding Window",       tip:"Variable window" },
      { id:"s17", name:"Zigzag Conversion",                   level:"Medium", lc:"https://leetcode.com/problems/zigzag-conversion/",                        hr:"",                                                                   pattern:"Simulation",           tip:"Track row index" },
      { id:"s18", name:"Decode Ways",                         level:"Medium", lc:"https://leetcode.com/problems/decode-ways/",                              hr:"",                                                                   pattern:"DP",                   tip:"Classic DP" },
    ]
  },
  {
    id: "hashing", name: "Hashing & Maps", icon: "#", color: "#10B981", total: 12,
    problems: [
      { id:"h1",  name:"Two Sum",                       level:"Easy",   lc:"https://leetcode.com/problems/two-sum/",                                  hr:"",                                                                   pattern:"HashMap",          tip:"idx storage" },
      { id:"h2",  name:"Contains Duplicate II",         level:"Easy",   lc:"https://leetcode.com/problems/contains-duplicate-ii/",                    hr:"",                                                                   pattern:"HashMap",          tip:"Window hashmap" },
      { id:"h3",  name:"Happy Number",                  level:"Easy",   lc:"https://leetcode.com/problems/happy-number/",                             hr:"",                                                                   pattern:"HashSet Cycle",    tip:"Detect cycle" },
      { id:"h4",  name:"Isomorphic Strings",            level:"Easy",   lc:"https://leetcode.com/problems/isomorphic-strings/",                       hr:"",                                                                   pattern:"Dual HashMap",     tip:"Bidirect map" },
      { id:"h5",  name:"Word Pattern",                  level:"Easy",   lc:"https://leetcode.com/problems/word-pattern/",                             hr:"",                                                                   pattern:"HashMap",          tip:"Map word<->char" },
      { id:"h6",  name:"Ransom Note",                   level:"Easy",   lc:"https://leetcode.com/problems/ransom-note/",                              hr:"https://www.hackerrank.com/challenges/ctci-ransom-note",             pattern:"Char Count",       tip:"Freq diff" },
      { id:"h7",  name:"Top K Frequent Elements",       level:"Medium", lc:"https://leetcode.com/problems/top-k-frequent-elements/",                  hr:"",                                                                   pattern:"HashMap+Heap",     tip:"Bucket sort too" },
      { id:"h8",  name:"Four Sum II",                   level:"Medium", lc:"https://leetcode.com/problems/4sum-ii/",                                  hr:"",                                                                   pattern:"HashMap",          tip:"Split pairs" },
      { id:"h9",  name:"Longest Consecutive Sequence",  level:"Medium", lc:"https://leetcode.com/problems/longest-consecutive-sequence/",             hr:"",                                                                   pattern:"HashSet",          tip:"O(n) solution" },
      { id:"h10", name:"Subarray Sum Equals K",         level:"Medium", lc:"https://leetcode.com/problems/subarray-sum-equals-k/",                    hr:"",                                                                   pattern:"Prefix+Map",       tip:"Prefix trick" },
      { id:"h11", name:"Valid Sudoku",                  level:"Medium", lc:"https://leetcode.com/problems/valid-sudoku/",                             hr:"",                                                                   pattern:"HashSet",          tip:"3 sets per cell" },
      { id:"h12", name:"Find Duplicate File in System", level:"Medium", lc:"https://leetcode.com/problems/find-duplicate-file-in-system/",            hr:"",                                                                   pattern:"HashMap",          tip:"Parse paths" },
    ]
  },
  {
    id: "twoptr", name: "Two Pointers", icon: "⇄", color: "#F59E0B", total: 12,
    problems: [
      { id:"tp1",  name:"Valid Palindrome",              level:"Easy",   lc:"https://leetcode.com/problems/valid-palindrome/",                        hr:"",                                                                   pattern:"Two Pointers",     tip:"L and R" },
      { id:"tp2",  name:"Reverse String",                level:"Easy",   lc:"https://leetcode.com/problems/reverse-string/",                          hr:"",                                                                   pattern:"Two Pointers",     tip:"Swap in-place" },
      { id:"tp3",  name:"Squares of Sorted Array",       level:"Easy",   lc:"https://leetcode.com/problems/squares-of-a-sorted-array/",               hr:"",                                                                   pattern:"Two Pointers",     tip:"From ends in" },
      { id:"tp4",  name:"Move Zeroes",                   level:"Easy",   lc:"https://leetcode.com/problems/move-zeroes/",                             hr:"",                                                                   pattern:"Two Pointers",     tip:"Write pointer" },
      { id:"tp5",  name:"Remove Duplicates (Sorted)",    level:"Easy",   lc:"https://leetcode.com/problems/remove-duplicates-from-sorted-array/",     hr:"",                                                                   pattern:"Two Pointers",     tip:"Slow pointer" },
      { id:"tp6",  name:"3Sum",                          level:"Medium", lc:"https://leetcode.com/problems/3sum/",                                    hr:"",                                                                   pattern:"Sort+2ptr",        tip:"Fix one, scan" },
      { id:"tp7",  name:"Container With Most Water",     level:"Medium", lc:"https://leetcode.com/problems/container-with-most-water/",               hr:"",                                                                   pattern:"Two Pointers",     tip:"Greedy" },
      { id:"tp8",  name:"3Sum Closest",                  level:"Medium", lc:"https://leetcode.com/problems/3sum-closest/",                            hr:"",                                                                   pattern:"Two Pointers",     tip:"Track min diff" },
      { id:"tp9",  name:"4Sum",                          level:"Medium", lc:"https://leetcode.com/problems/4sum/",                                    hr:"",                                                                   pattern:"Two Pointers",     tip:"4 loops -> 2ptr" },
      { id:"tp10", name:"Sort Colors (Dutch Flag)",      level:"Medium", lc:"https://leetcode.com/problems/sort-colors/",                             hr:"",                                                                   pattern:"3-way Partition",  tip:"0/1/2 buckets" },
      { id:"tp11", name:"Trapping Rain Water",           level:"Medium", lc:"https://leetcode.com/problems/trapping-rain-water/",                     hr:"",                                                                   pattern:"Two Pointers",     tip:"Precompute L/R max" },
      { id:"tp12", name:"Remove Nth Node from End",      level:"Medium", lc:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/",        hr:"",                                                                   pattern:"Fast-Slow",        tip:"Gap of n" },
    ]
  },
  {
    id: "sliding", name: "Sliding Window", icon: "⊡", color: "#8B5CF6", total: 10,
    problems: [
      { id:"sw1",  name:"Max Average Subarray I",          level:"Easy",   lc:"https://leetcode.com/problems/maximum-average-subarray-i/",            hr:"",                                                                   pattern:"Fixed Window",     tip:"Sum window of k" },
      { id:"sw2",  name:"Maximum Sum Subarray of Size K",  level:"Easy",   lc:"https://leetcode.com/problems/maximum-subarray/",                      hr:"https://www.hackerrank.com/challenges/maxsubarray",                  pattern:"Fixed Window",     tip:"Intro problem" },
      { id:"sw3",  name:"Longest Substring No Repeat",     level:"Medium", lc:"https://leetcode.com/problems/longest-substring-without-repeating-characters/", hr:"",                                                         pattern:"Variable Window",  tip:"Char map" },
      { id:"sw4",  name:"Longest Repeating After Replace", level:"Medium", lc:"https://leetcode.com/problems/longest-repeating-character-replacement/",hr:"",                                                                   pattern:"Variable Window",  tip:"Max freq trick" },
      { id:"sw5",  name:"Permutation in String",           level:"Medium", lc:"https://leetcode.com/problems/permutation-in-string/",                  hr:"",                                                                   pattern:"Fixed Window",     tip:"Char freq match" },
      { id:"sw6",  name:"Find All Anagrams in String",     level:"Medium", lc:"https://leetcode.com/problems/find-all-anagrams-in-a-string/",          hr:"",                                                                   pattern:"Fixed Window",     tip:"26-char compare" },
      { id:"sw7",  name:"Minimum Size Subarray Sum",       level:"Medium", lc:"https://leetcode.com/problems/minimum-size-subarray-sum/",              hr:"",                                                                   pattern:"Variable Window",  tip:"Shrink when valid" },
      { id:"sw8",  name:"Max Consecutive Ones III",        level:"Medium", lc:"https://leetcode.com/problems/max-consecutive-ones-iii/",               hr:"",                                                                   pattern:"Variable Window",  tip:"Count zeros" },
      { id:"sw9",  name:"Fruit Into Baskets",              level:"Medium", lc:"https://leetcode.com/problems/fruit-into-baskets/",                     hr:"",                                                                   pattern:"Variable Window",  tip:"2-type window" },
      { id:"sw10", name:"Minimum Window Substring",        level:"Medium", lc:"https://leetcode.com/problems/minimum-window-substring/",               hr:"",                                                                   pattern:"Variable Window",  tip:"Hard but classic" },
    ]
  },
  {
    id: "binsearch", name: "Binary Search", icon: "÷", color: "#EC4899", total: 13,
    problems: [
      { id:"bs1",  name:"Binary Search",                     level:"Easy",   lc:"https://leetcode.com/problems/binary-search/",                        hr:"https://www.hackerrank.com/challenges/ctci-ice-cream-parlor",        pattern:"Classic BS",       tip:"Textbook" },
      { id:"bs2",  name:"Find Smallest Letter Greater",      level:"Easy",   lc:"https://leetcode.com/problems/find-smallest-letter-greater-than-target/",hr:"",                                                               pattern:"BS",               tip:"Circular array" },
      { id:"bs3",  name:"Guess Number Higher or Lower",      level:"Easy",   lc:"https://leetcode.com/problems/guess-number-higher-or-lower/",          hr:"",                                                                   pattern:"BS",               tip:"API-based BS" },
      { id:"bs4",  name:"Count Negative Numbers in Grid",    level:"Easy",   lc:"https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/",hr:"",                                                              pattern:"BS/Linear",        tip:"Row-by-row BS" },
      { id:"bs5",  name:"First Bad Version",                 level:"Easy",   lc:"https://leetcode.com/problems/first-bad-version/",                     hr:"",                                                                   pattern:"BS",               tip:"Minimize search" },
      { id:"bs6",  name:"Sqrt(x) — Integer Square Root",     level:"Easy",   lc:"https://leetcode.com/problems/sqrtx/",                                 hr:"",                                                                   pattern:"BS on answer",     tip:"BS on answer" },
      { id:"bs7",  name:"Search Insert Position",            level:"Easy",   lc:"https://leetcode.com/problems/search-insert-position/",                hr:"",                                                                   pattern:"BS",               tip:"Leftmost insert" },
      { id:"bs8",  name:"Find Peak Element",                 level:"Medium", lc:"https://leetcode.com/problems/find-peak-element/",                     hr:"",                                                                   pattern:"BS",               tip:"Peak finding" },
      { id:"bs9",  name:"Search in Rotated Sorted Array",    level:"Medium", lc:"https://leetcode.com/problems/search-in-rotated-sorted-array/",        hr:"",                                                                   pattern:"Modified BS",      tip:"Check sorted half" },
      { id:"bs10", name:"Find Min in Rotated Array",         level:"Medium", lc:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",  hr:"",                                                                   pattern:"Modified BS",      tip:"Inflection point" },
      { id:"bs11", name:"Search a 2D Matrix",                level:"Medium", lc:"https://leetcode.com/problems/search-a-2d-matrix/",                    hr:"",                                                                   pattern:"BS 2D->1D",        tip:"Flatten index" },
      { id:"bs12", name:"Kth Smallest in Sorted Matrix",     level:"Medium", lc:"https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",hr:"",                                                                  pattern:"BS on value",      tip:"Count <= mid" },
      { id:"bs13", name:"Find Right Interval",               level:"Medium", lc:"https://leetcode.com/problems/find-right-interval/",                   hr:"",                                                                   pattern:"BS",               tip:"Map + BS" },
    ]
  },
  {
    id: "linkedlist", name: "Linked List", icon: "⬡", color: "#14B8A6", total: 14,
    problems: [
      { id:"ll1",  name:"Reverse Linked List",               level:"Easy",   lc:"https://leetcode.com/problems/reverse-linked-list/",                   hr:"https://www.hackerrank.com/challenges/reverse-a-linked-list",        pattern:"Iterative/Rec",    tip:"3-pointer" },
      { id:"ll2",  name:"Merge Two Sorted Lists",            level:"Easy",   lc:"https://leetcode.com/problems/merge-two-sorted-lists/",                 hr:"https://www.hackerrank.com/challenges/merge-two-sorted-linked-lists",pattern:"Merge",            tip:"Dummy head" },
      { id:"ll3",  name:"Linked List Cycle",                 level:"Easy",   lc:"https://leetcode.com/problems/linked-list-cycle/",                      hr:"",                                                                   pattern:"Fast-Slow",        tip:"Floyd's algo" },
      { id:"ll4",  name:"Middle of Linked List",             level:"Easy",   lc:"https://leetcode.com/problems/middle-of-the-linked-list/",              hr:"",                                                                   pattern:"Fast-Slow",        tip:"2x speed" },
      { id:"ll5",  name:"Remove Duplicates from LL",         level:"Easy",   lc:"https://leetcode.com/problems/remove-duplicates-from-sorted-list/",     hr:"",                                                                   pattern:"One Pointer",      tip:"Skip dupes" },
      { id:"ll6",  name:"Palindrome Linked List",            level:"Easy",   lc:"https://leetcode.com/problems/palindrome-linked-list/",                  hr:"",                                                                   pattern:"Reverse Half",     tip:"Slow-fast + rev" },
      { id:"ll7",  name:"Intersection of Two LLs",           level:"Easy",   lc:"https://leetcode.com/problems/intersection-of-two-linked-lists/",        hr:"",                                                                   pattern:"Two Pointers",     tip:"Equal lengths trick" },
      { id:"ll8",  name:"Remove Nth Node From End",          level:"Medium", lc:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/",        hr:"",                                                                   pattern:"Fast-Slow",        tip:"Gap trick" },
      { id:"ll9",  name:"Add Two Numbers",                   level:"Medium", lc:"https://leetcode.com/problems/add-two-numbers/",                         hr:"",                                                                   pattern:"Simulation",       tip:"Carry handling" },
      { id:"ll10", name:"Odd Even Linked List",              level:"Medium", lc:"https://leetcode.com/problems/odd-even-linked-list/",                    hr:"",                                                                   pattern:"Rearrange",        tip:"Two pointer LL" },
      { id:"ll11", name:"Sort List (Merge Sort)",            level:"Medium", lc:"https://leetcode.com/problems/sort-list/",                               hr:"",                                                                   pattern:"Divide & Conquer", tip:"Find mid + merge" },
      { id:"ll12", name:"Swap Nodes in Pairs",               level:"Medium", lc:"https://leetcode.com/problems/swap-nodes-in-pairs/",                     hr:"",                                                                   pattern:"Recursion",        tip:"Careful pointers" },
      { id:"ll13", name:"Reorder List",                      level:"Medium", lc:"https://leetcode.com/problems/reorder-list/",                            hr:"",                                                                   pattern:"Slow-Fast+Merge",  tip:"3 step solution" },
      { id:"ll14", name:"Copy List with Random Pointer",     level:"Medium", lc:"https://leetcode.com/problems/copy-list-with-random-pointer/",           hr:"",                                                                   pattern:"HashMap",          tip:"Map old->new" },
    ]
  },
  {
    id: "stacks", name: "Stacks & Queues", icon: "⊟", color: "#F97316", total: 13,
    problems: [
      { id:"sq1",  name:"Valid Parentheses",                 level:"Easy",   lc:"https://leetcode.com/problems/valid-parentheses/",                      hr:"https://www.hackerrank.com/challenges/balanced-brackets",            pattern:"Stack",            tip:"Classic stack" },
      { id:"sq2",  name:"Min Stack",                         level:"Easy",   lc:"https://leetcode.com/problems/min-stack/",                               hr:"",                                                                   pattern:"Stack+Aux",        tip:"Pair storage" },
      { id:"sq3",  name:"Implement Queue Using Stacks",      level:"Easy",   lc:"https://leetcode.com/problems/implement-queue-using-stacks/",            hr:"",                                                                   pattern:"Two Stacks",       tip:"Lazy transfer" },
      { id:"sq4",  name:"Implement Stack Using Queues",      level:"Easy",   lc:"https://leetcode.com/problems/implement-stack-using-queues/",            hr:"",                                                                   pattern:"One Queue",        tip:"Rotate trick" },
      { id:"sq5",  name:"Remove All Adjacent Duplicates",    level:"Easy",   lc:"https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",hr:"",                                                                   pattern:"Stack",            tip:"Push/pop match" },
      { id:"sq6",  name:"Backspace String Compare",          level:"Easy",   lc:"https://leetcode.com/problems/backspace-string-compare/",                hr:"",                                                                   pattern:"Stack/Two Ptr",    tip:"Process #" },
      { id:"sq7",  name:"Baseball Game",                     level:"Easy",   lc:"https://leetcode.com/problems/baseball-game/",                           hr:"",                                                                   pattern:"Stack",            tip:"Simulate ops" },
      { id:"sq8",  name:"Daily Temperatures",                level:"Medium", lc:"https://leetcode.com/problems/daily-temperatures/",                      hr:"",                                                                   pattern:"Monotonic Stack",  tip:"Next greater" },
      { id:"sq9",  name:"Next Greater Element I",            level:"Medium", lc:"https://leetcode.com/problems/next-greater-element-i/",                  hr:"",                                                                   pattern:"Mono Stack",       tip:"Map + stack" },
      { id:"sq10", name:"Car Fleet",                         level:"Medium", lc:"https://leetcode.com/problems/car-fleet/",                               hr:"",                                                                   pattern:"Mono Stack",       tip:"Time to reach" },
      { id:"sq11", name:"Evaluate Reverse Polish Notation",  level:"Medium", lc:"https://leetcode.com/problems/evaluate-reverse-polish-notation/",        hr:"",                                                                   pattern:"Stack",            tip:"Op on pop" },
      { id:"sq12", name:"Largest Rectangle in Histogram",    level:"Medium", lc:"https://leetcode.com/problems/largest-rectangle-in-histogram/",          hr:"",                                                                   pattern:"Mono Stack",       tip:"Area calc" },
      { id:"sq13", name:"Sliding Window Maximum",            level:"Medium", lc:"https://leetcode.com/problems/sliding-window-maximum/",                  hr:"",                                                                   pattern:"Deque",            tip:"Monotonic deque" },
    ]
  },
  {
    id: "backtrack", name: "Recursion & Backtracking", icon: "↺", color: "#A855F7", total: 12,
    problems: [
      { id:"bt1",  name:"Fibonacci Number",                  level:"Easy",   lc:"https://leetcode.com/problems/fibonacci-number/",                       hr:"https://www.hackerrank.com/challenges/ctci-fibonacci-numbers",       pattern:"Recursion",        tip:"Base case" },
      { id:"bt2",  name:"Power(x, n)",                       level:"Medium", lc:"https://leetcode.com/problems/powx-n/",                                  hr:"",                                                                   pattern:"Recursion",        tip:"Fast power" },
      { id:"bt3",  name:"Reverse String (Recursive)",        level:"Easy",   lc:"https://leetcode.com/problems/reverse-string/",                          hr:"",                                                                   pattern:"Recursion",        tip:"Basic rec" },
      { id:"bt4",  name:"Subsets",                           level:"Medium", lc:"https://leetcode.com/problems/subsets/",                                 hr:"",                                                                   pattern:"Backtracking",     tip:"Include/exclude" },
      { id:"bt5",  name:"Subsets II (with duplicates)",      level:"Medium", lc:"https://leetcode.com/problems/subsets-ii/",                              hr:"",                                                                   pattern:"Backtracking",     tip:"Sort+skip" },
      { id:"bt6",  name:"Permutations",                      level:"Medium", lc:"https://leetcode.com/problems/permutations/",                            hr:"https://www.hackerrank.com/challenges/permutations-of-strings",      pattern:"Backtracking",     tip:"Swap or used[]" },
      { id:"bt7",  name:"Permutations II (unique)",          level:"Medium", lc:"https://leetcode.com/problems/permutations-ii/",                         hr:"",                                                                   pattern:"Backtracking",     tip:"Skip dupes" },
      { id:"bt8",  name:"Combinations",                      level:"Medium", lc:"https://leetcode.com/problems/combinations/",                            hr:"",                                                                   pattern:"Backtracking",     tip:"Choose k of n" },
      { id:"bt9",  name:"Combination Sum",                   level:"Medium", lc:"https://leetcode.com/problems/combination-sum/",                         hr:"",                                                                   pattern:"Backtracking",     tip:"Unlimited use" },
      { id:"bt10", name:"Combination Sum II",                level:"Medium", lc:"https://leetcode.com/problems/combination-sum-ii/",                      hr:"",                                                                   pattern:"Backtracking",     tip:"One use + skip" },
      { id:"bt11", name:"Letter Combinations of Phone",      level:"Medium", lc:"https://leetcode.com/problems/letter-combinations-of-a-phone-number/",   hr:"",                                                                   pattern:"Backtracking",     tip:"Map digits" },
      { id:"bt12", name:"Generate Parentheses",              level:"Medium", lc:"https://leetcode.com/problems/generate-parentheses/",                    hr:"",                                                                   pattern:"Backtracking",     tip:"Track open/close" },
    ]
  },
  {
    id: "trees", name: "Trees (BT & BST)", icon: "⊤", color: "#22C55E", total: 20,
    problems: [
      { id:"tr1",  name:"Maximum Depth of Binary Tree",      level:"Easy",   lc:"https://leetcode.com/problems/maximum-depth-of-binary-tree/",            hr:"https://www.hackerrank.com/challenges/tree-height-of-a-binary-tree",pattern:"DFS/BFS",          tip:"Recursion" },
      { id:"tr2",  name:"Minimum Depth of Binary Tree",      level:"Easy",   lc:"https://leetcode.com/problems/minimum-depth-of-binary-tree/",            hr:"",                                                                   pattern:"BFS",              tip:"BFS preferred" },
      { id:"tr3",  name:"Invert Binary Tree",                level:"Easy",   lc:"https://leetcode.com/problems/invert-binary-tree/",                      hr:"",                                                                   pattern:"DFS",              tip:"Swap children" },
      { id:"tr4",  name:"Symmetric Tree",                    level:"Easy",   lc:"https://leetcode.com/problems/symmetric-tree/",                          hr:"",                                                                   pattern:"DFS",              tip:"Mirror check" },
      { id:"tr5",  name:"Path Sum",                          level:"Easy",   lc:"https://leetcode.com/problems/path-sum/",                                hr:"",                                                                   pattern:"DFS",              tip:"Subtract target" },
      { id:"tr6",  name:"Same Tree",                         level:"Easy",   lc:"https://leetcode.com/problems/same-tree/",                               hr:"",                                                                   pattern:"DFS",              tip:"Compare nodes" },
      { id:"tr7",  name:"Subtree of Another Tree",           level:"Easy",   lc:"https://leetcode.com/problems/subtree-of-another-tree/",                 hr:"",                                                                   pattern:"DFS",              tip:"isSameTree helper" },
      { id:"tr8",  name:"Balanced Binary Tree",              level:"Easy",   lc:"https://leetcode.com/problems/balanced-binary-tree/",                    hr:"",                                                                   pattern:"DFS",              tip:"Return -1 trick" },
      { id:"tr9",  name:"Diameter of Binary Tree",           level:"Easy",   lc:"https://leetcode.com/problems/diameter-of-binary-tree/",                 hr:"",                                                                   pattern:"DFS",              tip:"Max left+right" },
      { id:"tr10", name:"Count Good Nodes in BTree",         level:"Medium", lc:"https://leetcode.com/problems/count-good-nodes-in-binary-tree/",         hr:"",                                                                   pattern:"DFS",              tip:"Track max path" },
      { id:"tr11", name:"Binary Tree Level Order",           level:"Medium", lc:"https://leetcode.com/problems/binary-tree-level-order-traversal/",       hr:"https://www.hackerrank.com/challenges/tree-level-order-traversal",  pattern:"BFS",              tip:"Queue per level" },
      { id:"tr12", name:"Binary Tree Zigzag Level",          level:"Medium", lc:"https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",hr:"",                                                                   pattern:"BFS",              tip:"Flip direction" },
      { id:"tr13", name:"Validate Binary Search Tree",       level:"Medium", lc:"https://leetcode.com/problems/validate-binary-search-tree/",             hr:"",                                                                   pattern:"DFS w/ bounds",    tip:"Pass min/max" },
      { id:"tr14", name:"Kth Smallest in BST",               level:"Medium", lc:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/",           hr:"",                                                                   pattern:"Inorder",          tip:"Inorder = sorted" },
      { id:"tr15", name:"LCA of BST",                        level:"Medium", lc:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",hr:"",                                                            pattern:"BST property",     tip:"Diverge point" },
      { id:"tr16", name:"LCA of Binary Tree",                level:"Medium", lc:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", hr:"",                                                                   pattern:"DFS",              tip:"Post-order" },
      { id:"tr17", name:"BST from Preorder Traversal",       level:"Medium", lc:"https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",hr:"",                                                       pattern:"Recursion",        tip:"Bound-based" },
      { id:"tr18", name:"Binary Tree Right Side View",       level:"Medium", lc:"https://leetcode.com/problems/binary-tree-right-side-view/",             hr:"",                                                                   pattern:"BFS",              tip:"Last of each level" },
      { id:"tr19", name:"All Paths From Root to Leaf",       level:"Medium", lc:"https://leetcode.com/problems/binary-tree-paths/",                       hr:"",                                                                   pattern:"DFS",              tip:"Path tracking" },
      { id:"tr20", name:"Construct BTree Pre+Inorder",       level:"Medium", lc:"https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",hr:"",                                                  pattern:"Recursion",        tip:"Root from pre" },
    ]
  },
  {
    id: "graphs", name: "Graphs (BFS/DFS)", icon: "◎", color: "#EF4444", total: 14,
    problems: [
      { id:"g1",  name:"Flood Fill",                         level:"Easy",   lc:"https://leetcode.com/problems/flood-fill/",                             hr:"",                                                                   pattern:"BFS/DFS",          tip:"4-dir grid" },
      { id:"g2",  name:"Number of Islands",                  level:"Medium", lc:"https://leetcode.com/problems/number-of-islands/",                      hr:"https://www.hackerrank.com/challenges/connected-cell-in-a-grid",     pattern:"BFS/DFS",          tip:"Sink islands" },
      { id:"g3",  name:"Max Area of Island",                 level:"Medium", lc:"https://leetcode.com/problems/max-area-of-island/",                     hr:"",                                                                   pattern:"DFS",              tip:"Count cells" },
      { id:"g4",  name:"Clone Graph",                        level:"Medium", lc:"https://leetcode.com/problems/clone-graph/",                            hr:"",                                                                   pattern:"BFS+HashMap",      tip:"Node mapping" },
      { id:"g5",  name:"Number of Provinces",                level:"Medium", lc:"https://leetcode.com/problems/number-of-provinces/",                    hr:"",                                                                   pattern:"Union-Find/DFS",   tip:"Components" },
      { id:"g6",  name:"Rotting Oranges",                    level:"Medium", lc:"https://leetcode.com/problems/rotting-oranges/",                        hr:"",                                                                   pattern:"BFS",              tip:"Multi-source BFS" },
      { id:"g7",  name:"01 Matrix (Distance)",               level:"Medium", lc:"https://leetcode.com/problems/01-matrix/",                              hr:"",                                                                   pattern:"BFS",              tip:"Multi-source BFS" },
      { id:"g8",  name:"Pacific Atlantic Water Flow",        level:"Medium", lc:"https://leetcode.com/problems/pacific-atlantic-water-flow/",            hr:"",                                                                   pattern:"DFS from coasts",  tip:"Reverse flow" },
      { id:"g9",  name:"Course Schedule I",                  level:"Medium", lc:"https://leetcode.com/problems/course-schedule/",                        hr:"",                                                                   pattern:"Topological/DFS",  tip:"Cycle detect" },
      { id:"g10", name:"Course Schedule II",                 level:"Medium", lc:"https://leetcode.com/problems/course-schedule-ii/",                     hr:"",                                                                   pattern:"Topological Sort",  tip:"Return order" },
      { id:"g11", name:"Find Town Judge",                    level:"Easy",   lc:"https://leetcode.com/problems/find-the-town-judge/",                    hr:"",                                                                   pattern:"In-degree",        tip:"Trust count" },
      { id:"g12", name:"Number of Connected Components",     level:"Medium", lc:"https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",hr:"",                                                      pattern:"Union-Find/DFS",   tip:"Count roots" },
      { id:"g13", name:"Redundant Connection",               level:"Medium", lc:"https://leetcode.com/problems/redundant-connection/",                   hr:"",                                                                   pattern:"Union-Find",       tip:"First cycle edge" },
      { id:"g14", name:"Word Ladder",                        level:"Medium", lc:"https://leetcode.com/problems/word-ladder/",                            hr:"",                                                                   pattern:"BFS",              tip:"Char replacement" },
    ]
  },
  {
    id: "dp", name: "Dynamic Programming", icon: "◈", color: "#06B6D4", total: 20,
    problems: [
      { id:"dp1",  name:"Climbing Stairs",                   level:"Easy",   lc:"https://leetcode.com/problems/climbing-stairs/",                        hr:"https://www.hackerrank.com/challenges/ctci-fibonacci-numbers",       pattern:"DP/Fibonacci",     tip:"dp[i]=dp[i-1]+dp[i-2]" },
      { id:"dp2",  name:"House Robber",                      level:"Medium", lc:"https://leetcode.com/problems/house-robber/",                           hr:"",                                                                   pattern:"DP",               tip:"dp[i]=max(dp[i-2]+n,dp[i-1])" },
      { id:"dp3",  name:"House Robber II (Circular)",        level:"Medium", lc:"https://leetcode.com/problems/house-robber-ii/",                        hr:"",                                                                   pattern:"DP",               tip:"Run twice" },
      { id:"dp4",  name:"Min Cost Climbing Stairs",          level:"Easy",   lc:"https://leetcode.com/problems/min-cost-climbing-stairs/",               hr:"",                                                                   pattern:"DP",               tip:"Take min step" },
      { id:"dp5",  name:"Best Time Stock (DP)",              level:"Easy",   lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",        hr:"",                                                                   pattern:"DP",               tip:"Max profit" },
      { id:"dp6",  name:"Unique Paths",                      level:"Medium", lc:"https://leetcode.com/problems/unique-paths/",                           hr:"https://www.hackerrank.com/challenges/grid-challenge",               pattern:"Grid DP",          tip:"Grid DP" },
      { id:"dp7",  name:"Unique Paths II (Obstacles)",       level:"Medium", lc:"https://leetcode.com/problems/unique-paths-ii/",                        hr:"",                                                                   pattern:"Grid DP",          tip:"Block cells" },
      { id:"dp8",  name:"Minimum Path Sum",                  level:"Medium", lc:"https://leetcode.com/problems/minimum-path-sum/",                       hr:"",                                                                   pattern:"Grid DP",          tip:"Grid DP" },
      { id:"dp9",  name:"Coin Change",                       level:"Medium", lc:"https://leetcode.com/problems/coin-change/",                            hr:"https://www.hackerrank.com/challenges/ctci-coin-change",             pattern:"Unbounded Knapsack",tip:"Min coins" },
      { id:"dp10", name:"Coin Change II (Combinations)",     level:"Medium", lc:"https://leetcode.com/problems/coin-change-ii/",                         hr:"",                                                                   pattern:"DP",               tip:"Count ways" },
      { id:"dp11", name:"Longest Increasing Subsequence",    level:"Medium", lc:"https://leetcode.com/problems/longest-increasing-subsequence/",         hr:"https://www.hackerrank.com/challenges/longest-increasing-subsequence",pattern:"DP/BS",            tip:"Classic LIS" },
      { id:"dp12", name:"Longest Common Subsequence",        level:"Medium", lc:"https://leetcode.com/problems/longest-common-subsequence/",             hr:"https://www.hackerrank.com/challenges/dynamic-programming-classics-the-longest-common-subsequence",pattern:"2D DP",tip:"2D DP table" },
      { id:"dp13", name:"Word Break",                        level:"Medium", lc:"https://leetcode.com/problems/word-break/",                             hr:"",                                                                   pattern:"DP",               tip:"Check prefixes" },
      { id:"dp14", name:"Partition Equal Subset Sum",        level:"Medium", lc:"https://leetcode.com/problems/partition-equal-subset-sum/",             hr:"",                                                                   pattern:"0/1 Knapsack",     tip:"Knapsack" },
      { id:"dp15", name:"Target Sum",                        level:"Medium", lc:"https://leetcode.com/problems/target-sum/",                             hr:"",                                                                   pattern:"DP/DFS",           tip:"Count ways" },
      { id:"dp16", name:"Jump Game",                         level:"Medium", lc:"https://leetcode.com/problems/jump-game/",                              hr:"",                                                                   pattern:"DP/Greedy",        tip:"Track reach" },
      { id:"dp17", name:"Jump Game II",                      level:"Medium", lc:"https://leetcode.com/problems/jump-game-ii/",                           hr:"",                                                                   pattern:"Greedy",           tip:"Min jumps" },
      { id:"dp18", name:"Decode Ways",                       level:"Medium", lc:"https://leetcode.com/problems/decode-ways/",                            hr:"",                                                                   pattern:"String DP",        tip:"String DP" },
      { id:"dp19", name:"Edit Distance",                     level:"Medium", lc:"https://leetcode.com/problems/edit-distance/",                          hr:"",                                                                   pattern:"2D DP",            tip:"Classic" },
      { id:"dp20", name:"Palindromic Substrings",            level:"Medium", lc:"https://leetcode.com/problems/palindromic-substrings/",                 hr:"",                                                                   pattern:"Expand/DP",        tip:"Count palindromes" },
    ]
  },
  {
    id: "sorting", name: "Sorting & Searching", icon: "⇅", color: "#F59E0B", total: 10,
    problems: [
      { id:"ss1",  name:"Sort an Array",                     level:"Medium", lc:"https://leetcode.com/problems/sort-an-array/",                          hr:"https://www.hackerrank.com/challenges/ctci-merge-sort",              pattern:"Merge/Quick/Heap",  tip:"Know all 3" },
      { id:"ss2",  name:"Merge Sorted Array",                level:"Easy",   lc:"https://leetcode.com/problems/merge-sorted-array/",                     hr:"https://www.hackerrank.com/challenges/merge-two-sorted-linked-lists",pattern:"Two Pointers",      tip:"Fill from back" },
      { id:"ss3",  name:"Intersection of Two Arrays II",     level:"Easy",   lc:"https://leetcode.com/problems/intersection-of-two-arrays-ii/",          hr:"",                                                                   pattern:"Sort+2ptr",         tip:"Handle dupes" },
      { id:"ss4",  name:"Kth Largest Element",               level:"Medium", lc:"https://leetcode.com/problems/kth-largest-element-in-an-array/",        hr:"https://www.hackerrank.com/challenges/find-the-median",              pattern:"Quickselect/Heap",  tip:"O(n) avg" },
      { id:"ss5",  name:"Sort Colors (Dutch Flag)",          level:"Medium", lc:"https://leetcode.com/problems/sort-colors/",                            hr:"",                                                                   pattern:"3-way Partition",   tip:"Classic" },
      { id:"ss6",  name:"Find K Closest Elements",           level:"Medium", lc:"https://leetcode.com/problems/find-k-closest-elements/",                hr:"",                                                                   pattern:"BS+Sliding",        tip:"Window around x" },
      { id:"ss7",  name:"Wiggle Sort",                       level:"Medium", lc:"https://leetcode.com/problems/wiggle-sort/",                            hr:"",                                                                   pattern:"Greedy",            tip:"Even/Odd swap" },
      { id:"ss8",  name:"Count Inversions in Array",         level:"Medium", lc:"https://leetcode.com/problems/sort-an-array/",                          hr:"https://www.hackerrank.com/challenges/ctci-merge-sort",              pattern:"Merge Sort",        tip:"Modified merge" },
      { id:"ss9",  name:"Meeting Rooms",                     level:"Easy",   lc:"https://leetcode.com/problems/meeting-rooms/",                          hr:"",                                                                   pattern:"Sort by start",     tip:"Overlap check" },
      { id:"ss10", name:"Meeting Rooms II",                  level:"Medium", lc:"https://leetcode.com/problems/meeting-rooms-ii/",                       hr:"",                                                                   pattern:"Min Heap",          tip:"Track ends" },
    ]
  },
  {
    id: "bits", name: "Math & Bit Manipulation", icon: "⊕", color: "#8B5CF6", total: 12,
    problems: [
      { id:"mb1",  name:"Single Number (XOR)",               level:"Easy",   lc:"https://leetcode.com/problems/single-number/",                          hr:"https://www.hackerrank.com/challenges/missing-numbers",              pattern:"Bit XOR",           tip:"x^x=0" },
      { id:"mb2",  name:"Number of 1 Bits (Hamming)",        level:"Easy",   lc:"https://leetcode.com/problems/number-of-1-bits/",                       hr:"https://www.hackerrank.com/challenges/30-running-time-and-complexity",pattern:"Bit Count",         tip:"n & (n-1) trick" },
      { id:"mb3",  name:"Counting Bits",                     level:"Easy",   lc:"https://leetcode.com/problems/counting-bits/",                          hr:"",                                                                   pattern:"DP+Bits",           tip:"dp[i]=dp[i>>1]+i&1" },
      { id:"mb4",  name:"Reverse Bits",                      level:"Easy",   lc:"https://leetcode.com/problems/reverse-bits/",                           hr:"",                                                                   pattern:"Bit Shift",         tip:"Shift left/right" },
      { id:"mb5",  name:"Power of Two",                      level:"Easy",   lc:"https://leetcode.com/problems/power-of-two/",                           hr:"",                                                                   pattern:"Bit Trick",         tip:"n&(n-1)==0" },
      { id:"mb6",  name:"Missing Number",                    level:"Easy",   lc:"https://leetcode.com/problems/missing-number/",                         hr:"https://www.hackerrank.com/challenges/missing-numbers",              pattern:"XOR/Math",          tip:"n*(n+1)/2" },
      { id:"mb7",  name:"Sum Without +/- (Add Binary)",      level:"Medium", lc:"https://leetcode.com/problems/sum-of-two-integers/",                    hr:"",                                                                   pattern:"Bit Carry",         tip:"XOR + AND<<1" },
      { id:"mb8",  name:"Palindrome Number",                 level:"Easy",   lc:"https://leetcode.com/problems/palindrome-number/",                      hr:"",                                                                   pattern:"Math",              tip:"Reverse half" },
      { id:"mb9",  name:"Excel Sheet Column Number",         level:"Easy",   lc:"https://leetcode.com/problems/excel-sheet-column-number/",              hr:"",                                                                   pattern:"Base-26 Math",      tip:"Horner's method" },
      { id:"mb10", name:"Happy Number",                      level:"Easy",   lc:"https://leetcode.com/problems/happy-number/",                           hr:"",                                                                   pattern:"Floyd Cycle",       tip:"Digit square sum" },
      { id:"mb11", name:"Ugly Number II",                    level:"Medium", lc:"https://leetcode.com/problems/ugly-number-ii/",                         hr:"",                                                                   pattern:"DP",                tip:"3 pointers" },
      { id:"mb12", name:"Bitwise AND of Numbers Range",      level:"Medium", lc:"https://leetcode.com/problems/bitwise-and-of-numbers-range/",           hr:"",                                                                   pattern:"Bit",               tip:"Common prefix" },
    ]
  },
];

// 30-day schedule: which topic IDs each day covers + how many problems
const SCHEDULE = [
  { day:1,  label:"Arrays — Easy foundations",        topics:["arrays"],      take:10, week:1 },
  { day:2,  label:"Arrays — Medium patterns",         topics:["arrays"],      take:12, week:1 },
  { day:3,  label:"Strings — Easy foundations",       topics:["strings"],     take:8,  week:1 },
  { day:4,  label:"Strings — Medium patterns",        topics:["strings"],     take:10, week:1 },
  { day:5,  label:"Hashing & Maps",                   topics:["hashing"],     take:12, week:1 },
  { day:6,  label:"Two Pointers",                     topics:["twoptr"],      take:12, week:1 },
  { day:7,  label:"REVISION — Arrays + Strings",      topics:["arrays","strings"], take:8, week:1, revision:true },
  { day:8,  label:"Sliding Window",                   topics:["sliding"],     take:10, week:2 },
  { day:9,  label:"Binary Search — Easy",             topics:["binsearch"],   take:7,  week:2 },
  { day:10, label:"Binary Search — Medium",           topics:["binsearch"],   take:6,  week:2 },
  { day:11, label:"Linked List — Easy",               topics:["linkedlist"],  take:7,  week:2 },
  { day:12, label:"Linked List — Medium",             topics:["linkedlist"],  take:7,  week:2 },
  { day:13, label:"Stacks & Queues — Easy",           topics:["stacks"],      take:7,  week:2 },
  { day:14, label:"REVISION — Two Ptr + Sliding + BS",topics:["twoptr","sliding","binsearch"], take:8, week:2, revision:true },
  { day:15, label:"Stacks & Queues — Medium",         topics:["stacks"],      take:6,  week:3 },
  { day:16, label:"Recursion & Backtracking — Easy",  topics:["backtrack"],   take:5,  week:3 },
  { day:17, label:"Recursion & Backtracking — Medium",topics:["backtrack"],   take:7,  week:3 },
  { day:18, label:"Trees — Easy DFS",                 topics:["trees"],       take:9,  week:3 },
  { day:19, label:"Trees — Medium BFS & BST",         topics:["trees"],       take:11, week:3 },
  { day:20, label:"Graphs — Easy + BFS/DFS",          topics:["graphs"],      take:7,  week:3 },
  { day:21, label:"REVISION — LL + Stack + Trees",    topics:["linkedlist","stacks","trees"], take:8, week:3, revision:true },
  { day:22, label:"Graphs — Medium Topo/Union Find",  topics:["graphs"],      take:7,  week:4 },
  { day:23, label:"DP — Easy foundations",            topics:["dp"],          take:5,  week:4 },
  { day:24, label:"DP — 1D Medium",                   topics:["dp"],          take:7,  week:4 },
  { day:25, label:"DP — 2D / LCS / LIS",              topics:["dp"],          take:5,  week:4 },
  { day:26, label:"DP — Knapsack patterns",           topics:["dp"],          take:5,  week:4 },
  { day:27, label:"Sorting & Searching",              topics:["sorting"],     take:10, week:4 },
  { day:28, label:"Math & Bit Manipulation",          topics:["bits"],        take:12, week:4 },
  { day:29, label:"Mixed — Backtracking + Graph",     topics:["backtrack","graphs"], take:8, week:4 },
  { day:30, label:"FINAL MOCK — All Topics",          topics:["arrays","strings","hashing","dp","graphs"], take:10, week:4, revision:true },
];

const WEEK_COLORS = { 1:"#FF6B35", 2:"#4ECDC4", 3:"#A855F7", 4:"#F59E0B" };
const LEVEL_COL = { Easy:"#22c55e", Medium:"#f59e0b" };

function getTodayStr() {
  return new Date().toISOString().slice(0,10);
}

export default function DSATracker() {
  const [view, setView] = useState("dashboard"); // dashboard | roadmap | topic
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [solved, setSolved] = useState({});
  const [notes, setNotes] = useState({});
  const [streak, setStreak] = useState(0);
  const [dailyLog, setDailyLog] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Load from storage
  useEffect(() => {
    function load() {
      try {
        const r1 = localStorage.getItem("dsa_solved");
        if (r1) setSolved(JSON.parse(r1));
      } catch (_) {}
      try {
        const r2 = localStorage.getItem("dsa_notes");
        if (r2) setNotes(JSON.parse(r2));
      } catch (_) {}
      try {
        const r3 = localStorage.getItem("dsa_daily");
        if (r3) setDailyLog(JSON.parse(r3));
      } catch (_) {}
      setLoaded(true);
    }
    load();
  }, []);

  // Compute streak from dailyLog
  useEffect(() => {
    if (!loaded) return;
    const today = getTodayStr();
    let s = 0, d = new Date();
    while (true) {
      const key = d.toISOString().slice(0,10);
      if (dailyLog[key] && dailyLog[key] > 0) { s++; d.setDate(d.getDate()-1); }
      else break;
    }
    setStreak(s);
  }, [dailyLog, loaded]);

  const save = useCallback((newSolved, newNotes, newLog) => {
    setSaveStatus("saving…");
    try {
      localStorage.setItem("dsa_solved", JSON.stringify(newSolved));
      localStorage.setItem("dsa_notes", JSON.stringify(newNotes));
      localStorage.setItem("dsa_daily", JSON.stringify(newLog));
      setSaveStatus("saved ✓");
      setTimeout(() => setSaveStatus(""), 1500);
    } catch (_) { setSaveStatus("err"); }
  }, []);

  const toggleSolve = useCallback((pid) => {
    const today = getTodayStr();
    setSolved(prev => {
      const next = { ...prev, [pid]: !prev[pid] };
      const log = { ...dailyLog };
      const todayCount = Object.entries(next).filter(([k,v])=>v && (solved[k]!==v)).length;
      // simpler: count newly solved today
      log[today] = (log[today] || 0) + (next[pid] ? 1 : -1);
      if (log[today] < 0) log[today] = 0;
      setDailyLog(log);
      save(next, notes, log);
      return next;
    });
  }, [dailyLog, notes, save, solved]);

  const setNote = useCallback((pid, val) => {
    setNotes(prev => {
      const next = { ...prev, [pid]: val };
      save(solved, next, dailyLog);
      return next;
    });
  }, [solved, dailyLog, save]);

  // Stats
  const totalP = TOPICS.reduce((a,t)=>a+t.problems.length,0);
  const solvedCount = Object.values(solved).filter(Boolean).length;
  const pct = Math.round(solvedCount/totalP*100);
  const easyTotal = TOPICS.flatMap(t=>t.problems).filter(p=>p.level==="Easy").length;
  const medTotal = TOPICS.flatMap(t=>t.problems).filter(p=>p.level==="Medium").length;
  const easySolved = TOPICS.flatMap(t=>t.problems).filter(p=>p.level==="Easy"&&solved[p.id]).length;
  const medSolved = TOPICS.flatMap(t=>t.problems).filter(p=>p.level==="Medium"&&solved[p.id]).length;

  const todayCount = dailyLog[getTodayStr()] || 0;

  // Get problems for a day
  function getDayProblems(dayObj) {
    const all = [];
    for (const tid of dayObj.topics) {
      const topic = TOPICS.find(t=>t.id===tid);
      if (!topic) continue;
      topic.problems.forEach(p => { if (!all.find(x=>x.id===p.id)) all.push({...p, topicColor:topic.color}); });
    }
    return all.slice(0, dayObj.take);
  }

  if (!loaded) return (
    <div style={{background:"#08080f",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#444",fontFamily:"monospace"}}>
      Loading your progress…
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#08080f", color:"#e0e0f0", fontFamily:"'JetBrains Mono','Fira Code',monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Sora:wght@400;600;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-track{background:#0a0a14;} ::-webkit-scrollbar-thumb{background:#222;border-radius:2px;}
        .btn{transition:all .15s ease;cursor:pointer;} .btn:hover{filter:brightness(1.2);}
        .row:hover{background:rgba(255,255,255,.03)!important;}
        .card:hover{transform:translateY(-1px);transition:transform .15s;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeIn .25s ease;}
        .check:hover{transform:scale(1.2);transition:transform .15s;cursor:pointer;}
        input,textarea{background:#0f0f1e!important;color:#e0e0f0!important;border:1px solid #1e1e35!important;border-radius:5px!important;padding:6px 10px!important;font-family:inherit!important;font-size:.75rem!important;outline:none!important;}
        input:focus,textarea:focus{border-color:#444!important;}
      `}</style>

      {/* ── TOP NAV ── */}
      <div style={{background:"#0b0b18",borderBottom:"1px solid #161628",padding:".75rem 1.25rem",display:"flex",alignItems:"center",gap:"1rem",position:"sticky",top:0,zIndex:100}}>
        <div style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"1rem",background:"linear-gradient(90deg,#FF6B35,#A855F7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          DSA Tracker
        </div>
        <div style={{flex:1}} />
        {["dashboard","roadmap","topics"].map(v=>(
          <button key={v} className="btn" onClick={()=>{setView(v);setActiveTopic(null);setActiveDay(null);}} style={{
            background:view===v?"#1a1a2e":"transparent",
            border:`1px solid ${view===v?"#333":"transparent"}`,
            color:view===v?"#e0e0f0":"#555",
            borderRadius:6,padding:".3rem .8rem",fontSize:".7rem",fontFamily:"'Sora',sans-serif",fontWeight:600,textTransform:"uppercase",letterSpacing:".5px"
          }}>{v}</button>
        ))}
        {saveStatus && <span style={{fontSize:".65rem",color:"#444"}}>{saveStatus}</span>}
      </div>

      <div style={{maxWidth:960,margin:"0 auto",padding:"1.25rem"}}>

      {/* ═══════════════════════════════ DASHBOARD ═══════════════════════════════ */}
      {view==="dashboard" && (
        <div className="fade">
          {/* Hero stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:".75rem",marginBottom:"1.25rem"}}>
            {[
              {label:"Total Solved",val:`${solvedCount}/${totalP}`,sub:`${pct}%`,color:"#FF6B35"},
              {label:"Easy",val:`${easySolved}/${easyTotal}`,sub:`${Math.round(easySolved/easyTotal*100)||0}%`,color:"#22c55e"},
              {label:"Medium",val:`${medSolved}/${medTotal}`,sub:`${Math.round(medSolved/medTotal*100)||0}%`,color:"#f59e0b"},
              {label:"Streak",val:`${streak}🔥`,sub:"days",color:"#EF4444"},
              {label:"Today",val:todayCount,sub:"solved",color:"#A855F7"},
            ].map(s=>(
              <div key={s.label} className="card" style={{background:"#0e0e1e",border:"1px solid #1a1a2e",borderRadius:10,padding:".9rem 1rem"}}>
                <div style={{fontSize:".62rem",color:"#444",letterSpacing:"1px",marginBottom:".3rem",fontFamily:"'Sora',sans-serif"}}>{s.label.toUpperCase()}</div>
                <div style={{fontSize:"1.5rem",fontWeight:700,color:s.color,fontFamily:"'Sora',sans-serif"}}>{s.val}</div>
                <div style={{fontSize:".65rem",color:"#555",marginTop:2}}>{s.sub} complete</div>
              </div>
            ))}
          </div>

          {/* Overall progress bar */}
          <div style={{background:"#0e0e1e",border:"1px solid #1a1a2e",borderRadius:10,padding:"1rem 1.25rem",marginBottom:"1.25rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:".7rem",color:"#555",marginBottom:8}}>
              <span>Overall Progress</span><span style={{color:pct>60?"#22c55e":"#888"}}>{pct}%</span>
            </div>
            <div style={{height:8,background:"#131320",borderRadius:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#FF6B35,#A855F7)",borderRadius:4,transition:"width .5s ease"}} />
            </div>
          </div>

          {/* Topic progress grid */}
          <div style={{marginBottom:"1.25rem"}}>
            <div style={{fontSize:".65rem",color:"#444",letterSpacing:"1px",marginBottom:".75rem",fontFamily:"'Sora',sans-serif"}}>TOPIC PROGRESS</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:".6rem"}}>
              {TOPICS.map(t=>{
                const ts = t.problems.filter(p=>solved[p.id]).length;
                const tp2 = Math.round(ts/t.problems.length*100)||0;
                return (
                  <div key={t.id} className="card btn" onClick={()=>{setActiveTopic(t.id);setView("topics");}}
                    style={{background:"#0e0e1e",border:`1px solid ${tp2===100?"#22c55e30":"#1a1a2e"}`,borderRadius:9,padding:".75rem .9rem",cursor:"pointer"}}>
                    <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:6}}>
                      <span style={{color:t.color,fontSize:"1rem"}}>{t.icon}</span>
                      <span style={{fontSize:".72rem",fontFamily:"'Sora',sans-serif",fontWeight:600,color:"#ccc"}}>{t.name}</span>
                      {tp2===100&&<span style={{marginLeft:"auto",fontSize:".6rem",color:"#22c55e"}}>✓</span>}
                    </div>
                    <div style={{height:4,background:"#131320",borderRadius:2,overflow:"hidden",marginBottom:4}}>
                      <div style={{height:"100%",width:`${tp2}%`,background:t.color,borderRadius:2,transition:"width .4s"}} />
                    </div>
                    <div style={{fontSize:".62rem",color:"#444"}}>{ts}/{t.problems.length} · {tp2}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Last 7 days activity */}
          <div style={{background:"#0e0e1e",border:"1px solid #1a1a2e",borderRadius:10,padding:"1rem 1.25rem"}}>
            <div style={{fontSize:".65rem",color:"#444",letterSpacing:"1px",marginBottom:".75rem",fontFamily:"'Sora',sans-serif"}}>LAST 14 DAYS</div>
            <div style={{display:"flex",gap:4,alignItems:"flex-end",height:50}}>
              {Array.from({length:14},(_,i)=>{
                const d = new Date(); d.setDate(d.getDate()-(13-i));
                const k = d.toISOString().slice(0,10);
                const cnt = dailyLog[k]||0;
                const h = Math.min(cnt*8+4,46);
                const isToday = k===getTodayStr();
                return (
                  <div key={k} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <div style={{width:"100%",height:h,background:cnt>0?(isToday?"#FF6B35":"#4ECDC4"):"#131320",borderRadius:3,transition:"height .3s"}} title={`${k}: ${cnt} solved`} />
                    <div style={{fontSize:".45rem",color:"#333"}}>{d.getDate()}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════ ROADMAP ═══════════════════════════════ */}
      {view==="roadmap" && !activeDay && (
        <div className="fade">
          <div style={{marginBottom:"1rem",fontSize:".65rem",color:"#444",letterSpacing:"1px",fontFamily:"'Sora',sans-serif"}}>30-DAY SCHEDULE — CLICK A DAY TO SEE PROBLEMS</div>
          {[1,2,3,4].map(wk=>(
            <div key={wk} style={{marginBottom:"1.25rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".6rem"}}>
                <div style={{width:32,height:32,borderRadius:7,background:WEEK_COLORS[wk]+"20",border:`1px solid ${WEEK_COLORS[wk]}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".7rem",fontWeight:700,color:WEEK_COLORS[wk],fontFamily:"'Sora',sans-serif"}}>W{wk}</div>
                <span style={{fontSize:".8rem",fontFamily:"'Sora',sans-serif",fontWeight:600,color:WEEK_COLORS[wk]}}>
                  {{1:"Arrays, Strings & Hashing",2:"Sliding Window, Binary Search & Linked Lists",3:"Stacks, Backtracking & Trees",4:"Graphs, DP, Sorting & Bits"}[wk]}
                </span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:".4rem"}}>
                {SCHEDULE.filter(d=>d.week===wk).map(d=>{
                  const probs = getDayProblems(d);
                  const ds = probs.filter(p=>solved[p.id]).length;
                  const dp2 = Math.round(ds/probs.length*100)||0;
                  return (
                    <div key={d.day} className="btn card" onClick={()=>setActiveDay(d.day)}
                      style={{background:"#0e0e1e",border:`1px solid ${d.revision?"#22c55e20":WEEK_COLORS[wk]+"15"}`,borderRadius:9,padding:".7rem 1rem",display:"flex",alignItems:"center",gap:".75rem",cursor:"pointer"}}>
                      <div style={{minWidth:34,height:34,borderRadius:7,background:d.revision?"#22c55e15":WEEK_COLORS[wk]+"15",border:`1px solid ${d.revision?"#22c55e40":WEEK_COLORS[wk]+"30"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".68rem",fontWeight:700,color:d.revision?"#22c55e":WEEK_COLORS[wk]}}>
                        {String(d.day).padStart(2,"0")}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:".78rem",color:d.revision?"#22c55e":"#ccc",fontFamily:"'Sora',sans-serif",fontWeight:d.revision?700:400}}>{d.label}</div>
                        <div style={{fontSize:".62rem",color:"#444",marginTop:2}}>{probs.length} problems · {ds} solved</div>
                      </div>
                      <div style={{display:"flex",gap:2}}>
                        {probs.slice(0,8).map(p=>(
                          <div key={p.id} style={{width:6,height:6,borderRadius:"50%",background:solved[p.id]?WEEK_COLORS[wk]:"#1e1e2e"}} />
                        ))}
                      </div>
                      <div style={{fontSize:".65rem",color:dp2===100?"#22c55e":"#444",minWidth:28,textAlign:"right"}}>{dp2}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Day detail ─── */}
      {view==="roadmap" && activeDay && (()=>{
        const d = SCHEDULE.find(x=>x.day===activeDay);
        const probs = getDayProblems(d);
        return (
          <div className="fade">
            <button className="btn" onClick={()=>setActiveDay(null)} style={{background:"transparent",border:"1px solid #222",borderRadius:6,color:"#666",padding:".3rem .7rem",fontSize:".7rem",marginBottom:"1rem"}}>← Back</button>
            <div style={{background:"#0e0e1e",border:`1px solid ${WEEK_COLORS[d.week]}25`,borderRadius:10,padding:"1rem 1.25rem",marginBottom:"1rem"}}>
              <div style={{fontSize:".65rem",color:WEEK_COLORS[d.week],letterSpacing:"1px",marginBottom:".3rem"}}>DAY {d.day} · WEEK {d.week}</div>
              <div style={{fontFamily:"'Sora',sans-serif",fontWeight:700,fontSize:"1rem",color:"#e0e0f0"}}>{d.label}</div>
              <div style={{fontSize:".68rem",color:"#444",marginTop:4}}>{probs.length} problems to cover today</div>
            </div>
            <ProblemList probs={probs} solved={solved} notes={notes} onToggle={toggleSolve} onNote={setNote} />
          </div>
        );
      })()}

      {/* ═══════════════════════════════ TOPICS ═══════════════════════════════ */}
      {view==="topics" && !activeTopic && (
        <div className="fade">
          <div style={{marginBottom:"1rem",fontSize:".65rem",color:"#444",letterSpacing:"1px",fontFamily:"'Sora',sans-serif"}}>ALL 14 TOPICS · {totalP} PROBLEMS</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:".65rem"}}>
            {TOPICS.map(t=>{
              const ts = t.problems.filter(p=>solved[p.id]).length;
              const tp2 = Math.round(ts/t.problems.length*100)||0;
              return (
                <div key={t.id} className="btn card" onClick={()=>setActiveTopic(t.id)}
                  style={{background:"#0e0e1e",border:`1px solid ${t.color}25`,borderRadius:10,padding:".9rem 1rem",cursor:"pointer"}}>
                  <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".5rem"}}>
                    <span style={{fontSize:"1.2rem",color:t.color}}>{t.icon}</span>
                    <div>
                      <div style={{fontSize:".78rem",fontFamily:"'Sora',sans-serif",fontWeight:600,color:"#ddd"}}>{t.name}</div>
                      <div style={{fontSize:".6rem",color:"#444"}}>{t.total} problems</div>
                    </div>
                  </div>
                  <div style={{height:5,background:"#131320",borderRadius:3,overflow:"hidden",marginBottom:5}}>
                    <div style={{height:"100%",width:`${tp2}%`,background:t.color,borderRadius:3,transition:"width .4s"}} />
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:".62rem",color:"#444"}}>
                    <span>{ts}/{t.problems.length} solved</span>
                    <span style={{color:tp2===100?"#22c55e":t.color}}>{tp2}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view==="topics" && activeTopic && (()=>{
        const t = TOPICS.find(x=>x.id===activeTopic);
        return (
          <div className="fade">
            <button className="btn" onClick={()=>setActiveTopic(null)} style={{background:"transparent",border:"1px solid #222",borderRadius:6,color:"#666",padding:".3rem .7rem",fontSize:".7rem",marginBottom:"1rem"}}>← Back</button>
            <div style={{background:"#0e0e1e",border:`1px solid ${t.color}30`,borderRadius:10,padding:"1rem 1.25rem",marginBottom:"1rem",display:"flex",alignItems:"center",gap:".75rem"}}>
              <span style={{fontSize:"1.5rem",color:t.color}}>{t.icon}</span>
              <div>
                <div style={{fontFamily:"'Sora',sans-serif",fontWeight:700,fontSize:"1rem",color:"#e0e0f0"}}>{t.name}</div>
                <div style={{fontSize:".65rem",color:"#555",marginTop:2}}>
                  {t.problems.filter(p=>solved[p.id]).length}/{t.problems.length} solved
                </div>
              </div>
            </div>
            <ProblemList probs={t.problems.map(p=>({...p,topicColor:t.color}))} solved={solved} notes={notes} onToggle={toggleSolve} onNote={setNote} />
          </div>
        );
      })()}

      </div>
    </div>
  );
}

function ProblemList({ probs, solved, notes, onToggle, onNote }) {
  const [openNote, setOpenNote] = useState(null);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:".35rem"}}>
      {probs.map((p,i)=>{
        const done = solved[p.id];
        const hasNote = notes[p.id];
        return (
          <div key={p.id} style={{background:"#0e0e1e",border:`1px solid ${done?"#22c55e20":"#161628"}`,borderRadius:8,overflow:"hidden"}}>
            <div className="row" style={{display:"flex",alignItems:"center",gap:".65rem",padding:".55rem .8rem"}}>
              {/* number */}
              <div style={{minWidth:22,fontSize:".6rem",color:"#333",textAlign:"right"}}>{i+1}</div>
              {/* checkbox */}
              <div className="check" onClick={()=>onToggle(p.id)} style={{width:18,height:18,borderRadius:4,border:`1.5px solid ${done?"#22c55e":"#2a2a3e"}`,background:done?"#22c55e":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#000",flexShrink:0}}>
                {done?"✓":""}
              </div>
              {/* name */}
              <span style={{flex:1,fontSize:".77rem",color:done?"#444":"#ccc",textDecoration:done?"line-through":"none",transition:"all .2s"}}>{p.name}</span>
              {/* pattern */}
              <span style={{fontSize:".58rem",color:"#444",background:"#131320",padding:"2px 6px",borderRadius:3,display:"none"}} className="pattern">{p.pattern}</span>
              {/* level */}
              <span style={{fontSize:".6rem",background:LEVEL_COL[p.level]+"18",color:LEVEL_COL[p.level],padding:"2px 7px",borderRadius:4,fontWeight:600,minWidth:52,textAlign:"center"}}>{p.level}</span>
              {/* links */}
              <a href={p.lc} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} title="LeetCode"
                style={{fontSize:".65rem",background:"#FF8C00"+20,color:"#FF8C00",padding:"2px 7px",borderRadius:4,textDecoration:"none",fontWeight:600,border:"1px solid #FF8C0030"}}>LC</a>
              {p.hr && <a href={p.hr} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} title="HackerRank"
                style={{fontSize:".65rem",background:"#00C39420",color:"#00C394",padding:"2px 7px",borderRadius:4,textDecoration:"none",fontWeight:600,border:"1px solid #00C39430"}}>HR</a>}
              {/* note toggle */}
              <button className="btn" onClick={()=>setOpenNote(openNote===p.id?null:p.id)}
                style={{background:"transparent",border:"none",color:hasNote?"#A855F7":"#333",fontSize:".75rem",padding:"0 2px"}} title="Add note">✎</button>
            </div>
            {/* tip */}
            <div style={{padding:".0 .8rem .3rem 3.5rem",fontSize:".62rem",color:"#333"}}>💡 {p.tip}</div>
            {/* note area */}
            {openNote===p.id && (
              <div style={{padding:".5rem .8rem .7rem",borderTop:"1px solid #161628"}}>
                <textarea rows={2} placeholder="Your notes, approach, complexity…" value={notes[p.id]||""} onChange={e=>onNote(p.id,e.target.value)}
                  style={{width:"100%",resize:"vertical"}} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
