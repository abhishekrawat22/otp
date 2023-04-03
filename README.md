# <h1>OTP UI Experience</h1>
<p>An accessibility friendly OTP UI with some validation.</p>
<p>For now the correct OTP is <strong>"123456"</strong>.</p>
<p>User can paste OTP directly also, using keyboard or paste button provided, from the clipboard. (Currently working on <strong>Chrome, Edge, Brave</strong>, not on Firefox. And I haven't tested on Safari.)
<div><strong>TEST CASES USED:</strong></div>
<p>Focus shifts with every single digit pressed.</p>
<p>Focus goes backward when a digit is deleted.</p>
<p>Checks only positive numbers.</p>
<p>Each input takes only single digit.</p>
<p>Checks <strong>123456</strong> as the correct OTP.</p>
<p>User gets only 3 attempts to enter correct OTP, otherwise page refreshes.
<p>The Verify button remains disabled till all input fields are filled.</p>
