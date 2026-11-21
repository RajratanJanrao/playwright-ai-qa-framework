| ID | Technique | Scenario | Input / Condition | Expected Result |
|---|---|---|---|---|
| TC-01 | EP (Valid) | Login with valid credentials | Registered email + valid password | User lands on home with "Logged in as" visible |
| TC-02 | EP (Invalid) | Login with invalid password | Registered email + wrong password | Inline error: "Your email or password is incorrect!" |
| TC-03 | EP (Invalid) | Login with unregistered email | Non-existent email format | Inline error displayed; no session cookie set |
| TC-04 | BVA (Lower) | Product quantity = 0 | Quantity input set to 0 | Prevented by input validation or cart rejects 0 |
| TC-05 | BVA (Min Valid) | Product quantity = 1 | Quantity input set to 1 | Cart displays exact quantity 1 |
| TC-06 | BVA (Upper) | Product quantity = 999 | High boundary quantity 999 | Cart calculates `unit_price * 999` accurately |
| TC-07 | BVA (Negative) | Product quantity = -1 | Negative integer -1 | Input blocked or rejected without negative total |
| TC-08 | EP (Search) | Search with empty/whitespace query | `"   "` in product search | Handled gracefully without 500 error or crash |
