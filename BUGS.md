# Bugs found

The app had several logic issues that contradicted the README spec. I fixed them in the code and written the changes below.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”, but the first row is Wine (7 Mar) while Board game (15 Mar) is below it.

**What is wrong:** The list was sorted in ascending date order, so the oldest item was shown first even though the UI label says newest should be at the top. This also made the app behave inconsistently with the demo data and the expected travel-log timeline.

**What I changed:** I fixed the sort order to compare dates in descending order, and normalized stored dates so `Date` objects and saved strings are ordered consistently.

---

## Bug 2

**How to reproduce:** Open the balances panel or settle-up section with the demo data. People who are actually owed money are labeled as if they owe, and the amounts do not line up with the actual ledger.

**What is wrong:** The balance math was inverted relative to the README rules: the payer’s contribution was being treated inconsistently and shares could be applied incorrectly. This broke the closed-group balance logic and caused the “owes / is owed” wording to be reversed.

**What I changed:** I corrected the balance math so each expense subtracts each participant’s share once and the sign lines up with the real money movement. I also fixed the labels to display the correct direction for every member.

---

## Bug 3

**How to reproduce:** Use the Search field. A partial match such as “dinner” or “taxi” should return the relevant expenses, but the filter does not behave consistently when multiple text fragments are used.

**What is wrong:** The filtering logic was too brittle and did not tokenize the query properly, so it could fail to match realistic partial searches.

**What I changed:** I updated the search to match partial text across multiple words consistently and kept the filter logic case-insensitive while still respecting the selected category and paid-by values.

---

## Bug 4

**How to reproduce:** Pick a payer from the Paid by filter, then expect the matching expenses to show up. Nothing appears even though the same person clearly appears in the list.

**What is wrong:** The filter compared `paidBy` as a string against numeric expense IDs, so the comparison always failed.

**What I changed:** I normalized both values to numbers before comparing, so the Paid by filter works correctly for every member.

---

## Bug 5

**How to reproduce:** Open the Expenses section with more than 10 expenses and try to browse beyond the first page.

**What is wrong:** The list had no pagination at all, so everything was shown in one long block and users could not move through older entries.

**What I changed:** I added page-based pagination with a max of 10 expenses per page and previous/next controls to move through the list properly.

---

## Bug 6

**How to reproduce:** Add a new expense. The date field is not today by default and future dates are accepted.

**What is wrong:** The form used a static date and allowed entries in the future, which does not match the real-world behavior expected for a trip ledger.

**What I changed:** I defaulted the date to the current date and enforced a maximum date equal to today so future entries cannot be saved.

---

## Bug 7

**How to reproduce:** Pick a payer and then try to remove that person from the split list. The UI lets it happen even though the payer should always remain in the split.

**What is wrong:** The form allowed the payer to be deselected, which breaks the money split logic and creates impossible bills.

**What I changed:** I locked the selected payer into the split-with list and prevented that person from being removed from the selection. I also normalized the list whenever the payer changes.

---

## Bug 8

**How to reproduce:** Open the Settle Up panel. It only shows transfer suggestions and does not tell you the status of each person in the group.

**What is wrong:** The panel failed to show a complete per-member state for everyone in the group, so settled members were invisible and money directions were not clearly explained.

**What I changed:** I updated the Settle Up panel to show all members with their current status: owed amount, amount owed, or settled up, followed by the suggested payment transfers if any exist.

---