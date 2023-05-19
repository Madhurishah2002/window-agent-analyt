// Window User Ip And Other Details
function getAgentData() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;

            return fetch(`https://ipapi.co/${ipAddress}/json/`)
                .then(response => response.json())
                .then(data => {
                    // Window USer Data Details
                    const city = data.city;
                    const region = data.region;
                    const country = data.country_name;
                    const callingCode = data.country_calling_code;
                    const countryCode = data.country_code.toLowerCase();
                    const currency = data.currency_name;
                    const countryCapital = data.country_capital;
                    const locations = data.latitude + ',' + data.longitude;
                    const timezone = data.timezone;
                    const area = data.country_area;
                    const population = data.country_population;
                    const userAgent = navigator.userAgent;
                    const pathname = window.location.pathname;
                    debugger;

                    // Store Data For Return Value
                    const agentData = {
                        ipAddress,
                        city,
                        region,
                        country,
                        callingCode,
                        countryCode,
                        currency,
                        countryCapital,
                        locations,
                        timezone,
                        area,
                        population,
                        userAgent,
                        pathname
                    };
                    debugger;

                    return agentData;
                });
        })
        .catch(error => {
            console.error('Error:', error);
            throw error; // Optionally rethrow the error to handle it outside this function
        });
}

// Agent Set number of Mobile Code
(async() => {
    try {
        const agentData = await getAgentData();

        // Get Data Json
        fetch('js/callingcountry.json')
            .then(response => response.json())
            .then(dataJson => {
                // get input value of number & error messages & match data Json Value
                const phoneNumberInput = document.getElementById('CNumber');
                const errorElement = document.getElementById('error_message_number_fillert');
                const selectedCountry = dataJson.find(country => country.country_code === agentData.callingCode);

                // Function of Mobile number &  error 
                if (selectedCountry) {
                    const mobileNumberDigit = selectedCountry.mobile_number_digit;
                    // get input value of mobile number
                    phoneNumberInput.addEventListener('input', function() {
                        const phoneNumber = phoneNumberInput.value;
                        // if length of phone number exceeds the specified digit count
                        if (phoneNumber.length > mobileNumberDigit) {
                            errorElement.textContent = `Phone number must not exceed ${mobileNumberDigit} digits`;
                        } else if (phoneNumber.length < mobileNumberDigit) {
                            errorElement.textContent = `Phone number must have at least ${mobileNumberDigit} digits`;
                        } else {
                            errorElement.textContent = '';
                        }
                        debugger;
                    });
                } else {
                    errorElement.textContent = 'Country code not found in the data';
                }
                debugger;
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Country Code Selection For Form Automaticly
        const code = agentData.callingCode;
        $('.mobile_codewith_flage').intlTelInput({
            autoHideDialCode: true,
            autoPlaceholder: "ON",
            formatOnDisplay: true,
            hiddenInput: "full_number",
            initialCountry: agentData.countryCode,
            nationalMode: true,
            separateDialCode: true
        });
        $('.phoneNumber').focusout(function() {
            var code = $(".mobile_codewith_flage").intlTelInput("getSelectedCountryData").dialCode;
            var phoneNumber = $('.phoneNumber').val();
            var name = $(".mobile_codewith_flage").intlTelInput("getSelectedCountryData").name;
            Mobiledata = 'Country Code : ' + code + '\nCountry Name : ' + name + '\nMobile No. :' + phoneNumber;
            document.getElementById('address-country').value = Mobiledata;
            document.getElementById('CCCNumber').value = code;
        });

        // not other qurey this section Used
        $('.mobile_codewith_flage').focusout(function() {
            var code = $(".mobile_codewith_flage").intlTelInput("getSelectedCountryData").dialCode;
            var hiddenInput = document.querySelector("input[name='full_number']");
            hiddenInput.value = code;
        });
        $('.mobilenumber').focusout(function() {
            var code = $(".mobile_codewith_flage").intlTelInput("getSelectedCountryData").dialCode;
            var phoneNumber = $('.phoneNumber').val();
            var name = $(".mobile_codewith_flage").intlTelInput("getSelectedCountryData").name;
            Mobiledata = 'Country Code : ' + code + '\nCountry Name : ' + name + '\nMobile No. :' + phoneNumber;
            var hiddenInput = document.querySelector("input[name='full_number']");
            hiddenInput.value = code;
            document.getElementById('Numbercodeflase').value = Mobiledata;
        });
        // not other qurey this section Used

        debugger;
    } catch (error) {
        console.error('Error:', error);
    }
})();