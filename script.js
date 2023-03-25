let otpInput = document.querySelectorAll("[name=otp]"); // Get all the inputs.
let verifyOtpBtn = document.getElementsByTagName('button')[0]; // Get verify button.

// Reset form when page refreshes.
window.onload = function() {
    form.reset();
    otpInput[0].focus();
}

otpInput.forEach((el, index) => {
    el.addEventListener('keyup', () => {
        // To shift focus to the next input when the single digit is entered to the current one.
        if(el.value.length >= 1) {
            otpInput[index + 1].focus();
        }
        // To go to the previous input when current's value is cleared.
        else if(el.value == '') {
            otpInput[index - 1].select();
        }
    })
})

// To get each input value into the one string and then check with the correct OTP.
const form = document.getElementsByTagName('form')[0];
let fullOtp = [];
form.addEventListener('submit', (e) => {
    e.preventDefault(); // We call e.preventDefault to prevent the default submit behavior so we can do client-side form submission.
    const formData = new FormData(form); // Then we create the formData object with the FormData constructor with the form as the argument to get the form data values.
    for (const pair of formData.entries()) { // And then we call formData.entries to get an array of form data key-pair pairs.
        fullOtp.push(pair[1]);
    }
    // console.log(fullOtp.toString()); Converts array items to a string but with comma.
    let a = fullOtp.join(''); // To get entered OTP as a single string.
    const regex = /^[0-9]{6}$/;
    if (a == "123456" && regex.test(a)) {
        document.getElementsByTagName('body')[0].innerText = "Entered OTP is correct.";
    }
    else {
        alert("Entered OTP is incorrect. Please retry.");
        form.reset();
        otpInput[0].focus();
        return false;
    }
    console.log(a);
})