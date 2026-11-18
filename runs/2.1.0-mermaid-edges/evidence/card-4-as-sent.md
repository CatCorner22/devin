**Decision — the final check did not pass**

(a) Do you approve 1 more independent session (5 in all) to re-check the 4 faults in my report and record, or do you end the run now?

(b) I recommend `one more check`, because the 4 faults are in my paperwork, not in the fix, and only a new session may confirm a correction.

(c) `one more check`: a new session re-checks the corrected report; if it passes and you confirm that you opened it, the work is "done"; it may find more. `end now`: you get the fix and the report marked "delivered, not done", with the 4 faults listed as open.

(d) Reply `one more check` or `end now`.

**What the final check found** (session 2c6f057a16be412f89e76ffa6a5a5a78; last line: `not passed`)

- The fix itself: every saved test result came out the same when run again; all 81 tests pass.
- F-10: my draft report cited 2 wrong log entries for "stage 5 was skipped". Corrected.
- F-11: my draft report named the wrong entry as written late. Corrected.
- F-12: my draft report said you would see "the same text" when you compare the first tester's session with its saved report; the session's last message is shorter. Corrected.
- F-13: 9 output files from the second tester record their command without its quotation marks; the results are the same when run with them. I may not change a tester's files; a log entry states the commands with quotes.
- F-14: my status file had 2 lines out of date. Corrected.
- F-15, form only: some output files hold no command line or no exit code. I ask you to accept this one; reply `fix F-15` if you do not.
