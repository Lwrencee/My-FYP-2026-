# Security Spec for Aegis Academy

## 1. Data Invariants
- `users`: A user document can only be created or modified by the user who owns it (`request.auth.uid == userId`).
- The `level` and `xp` can be updated, but there should be validations eventually (for now, any valid number update by the owner is fine).
- The `createdAt` field is immutable and set to `request.time`.
- The `updatedAt` field must always be `request.time` during updates.

## 2. Dirty Dozen Payloads
1. Unauthorized user tries to create a profile for someone else.
2. Unauthenticated user tries to list all the profiles (Wait, the leaderboard reads from all users. So `list` reads *are* allowed for authenticated users. Blanked reads should be avoided if PII is present. In our case, `defenderName`, `avatarId`, `xp`, `level`, `university` are PUBLIC info for the leaderboard. Wait, `users` collection contains public data. Should we split PII? Yes, email is not stored in `UserProfile` according to blueprint).
3. Shadow Update: Inject a `isAdmin` boolean field.
4. Value Poisoning: Updating `xp` to a 50MB string.
5. Immortal Field: Changing `createdAt`.
6. ...

## 3. Implementation Plan
We will use `isValidUser()` validation helper.
We will allow `list` reads of `users` collection for authenticated users because the leaderboard literally shows public stats of everyone. We only output non-PII in `users`.
