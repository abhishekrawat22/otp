let otpInput = document.querySelectorAll("[name=otp]"); // Get all the inputs.
let verifyOtpBtn = document.getElementsByTagName('button')[0]; // Get verify button.

otpInput.forEach((el, index) => {
    // Listen for the "input" event on the input element
    el.addEventListener("input", () => {
        // Get the input value
        let value = el.value;    
        // Remove any non-numeric characters
        value = value.replace(/[^0-9]/g, "");    
        // Limit the input to a single digit
        if (value.length > 1) {
            value = value.slice(0, 1);
        }
        // Set the input value
        el.value = value;
    });
    el.addEventListener('keyup', () => {
        // To shift focus to the next input when the single digit is entered to the current one.
        if(el.value.length >= 1) {
            otpInput[index + 1]?.focus();
        }
        // To go to the previous input when current's value is cleared.
        else if(el.value == '') {
            otpInput[index - 1]?.focus();
        }
    })
})

// To paste OTP from clipboard.
const pasteBtn = document.querySelector('#paste-btn');
pasteBtn.addEventListener('click', () => {
    const clipboardData = navigator.clipboard.readText();
    clipboardData.then((clipboardText) => {
        const digits = clipboardText.match(/\d+/g);
        if (digits && digits.length > 0) {
            otpInput.forEach((el, index) => {
                if (index < digits.length) {
                    el.value = digits[index];
                } else {
                    el.value = '';
                }
                otpInput[index + 1]?.focus();
            })
        }
    })
});

// To get each input value into the one string and then check with the correct OTP.
const form = document.getElementsByTagName('form')[0];
// Reset form when page refreshes.
window.onload = function() {
    form.reset();
    otpInput[0].focus();
}
let fullOtp = [];
let correctOtp = "123456";
let attempts = 0;
form.addEventListener('submit', (e) => {
    e.preventDefault(); // We call e.preventDefault to prevent the default submit behavior so we can do client-side form submission.
    const formData = new FormData(form); // Then we create the formData object with the FormData constructor with the form as the argument to get the form data values.
    for (const pair of formData.entries()) { // And then we call formData.entries to get an array of form data key-pair pairs.
        fullOtp.push(pair[1]);
    }
    let a = fullOtp.join(''); // To get entered OTP as a single string.
    if (a == correctOtp) {
        document.getElementsByTagName('body')[0].innerText = "Entered OTP is correct.";
    }
    else {
        attempts++;
        if (attempts < 3) {
            alert(`Entered OTP is incorrect. You have ${3 - attempts} attempts left. Please retry.`);
            for(let i = 0; i < otpInput.length - 1; i++) {
                if(otpInput[i].value == "") {
                    otpInput[i].focus();
                    break;
                }
            }
            fullOtp = [];
        } else {
            alert("You have exceeded the maximum number of attempts. Please try again later.");
            window.location.reload();
        }
    }
})