const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const submitBtn = document.getElementById("submitBtn");

const errorText = document.getElementById("small");

dayInput.addEventListener("input", validateInput);
monthInput.addEventListener("input", validateInput);
yearInput.addEventListener("input", validateInput);
submitBtn.addEventListener("click", calculateAge);

function validateInput() {
	const day = parseInt(dayInput.value);
	const month = parseInt(monthInput.value);
	const year = parseInt(yearInput.value);

	if (!isValidDate(day, month, year)) {
		showError("This field is invalid");
	} else {
		clearError();
	}
}

function calculateAge() {
	const day = parseInt(dayInput.value);
	const month = parseInt(monthInput.value);
	const year = parseInt(yearInput.value);

	// Validate the input
	if (!isValidDate(day, month, year)) {
		showError("Invalid date of birth");
		return;
	}

	const dateOfBirth = new Date(year, month - 1, day);
	console.log(`Date of birth is: ${dateOfBirth}`);

	const today = new Date();
	let ageInMilliseconds = today - dateOfBirth;

	// Calculating years, months, and days from milliseconds
	const seconds = Math.floor(ageInMilliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	let years = Math.floor(days / 365);
	let remainingDays = days % 365;
	let months = Math.floor(remainingDays / 30);
	let finalDays = remainingDays % 30;

	if (finalDays < 0) {
		months--;
		finalDays += new Date(
			dateOfBirth.getFullYear(),
			dateOfBirth.getMonth(),
			0
		).getDate();
	}
	if (months < 0) {
		years--;
		months += 12;
	}

	console.log(
		`Your age is ${years} years, ${months} months, ${finalDays} days old.`
	);

	document.querySelector(".output-year").textContent = years.toString();
	document.querySelector(".output-month").textContent = months;
	document.querySelector(".output-day").textContent = finalDays;
	clearError();
}
function isValidDate(day, month, year) {
	const date = new Date(year, month - 1, day);
	return (
		date.getDate() === day &&
		date.getMonth() === month - 1 &&
		date.getFullYear() === year
	);
}

function showError(message) {
	const errorDayField = document.getElementById("error-day-field");
	const errorMonthField = document.getElementById("error-month-field");

	const errorYearField = document.getElementById("error-year-field");
	//days can be between 1-31
	if (dayInput.value > 31 || dayInput.value < 1 || !dayInput) {
		errorDayField.textContent = message;
		errorDayField.style.display = "flex";
	}
	//month can be between 1 -12
	if (monthInput.value > 12 || monthInput.value < 1 || !monthInput) {
		errorMonthField.textContent = message;
		errorMonthField.style.display = "flex";
	}

	if (yearInput.value > 2023 || yearInput.value < 1 || !yearInput) {
		errorYearField.textContent = message;
		errorYearField.style.display = "flex";
	}

	console.log(message);
}

function clearError() {
	const errorDayField = document.getElementById("error-day-field");
	errorDayField.textContent = "";
	errorDayField.style.display = "none";

	const errorMonthField = document.getElementById("error-month-field");
	errorMonthField.textContent = "";
	errorMonthField.style.display = "none";

	const errorYearField = document.getElementById("error-year-field");
	errorYearField.textContent = "";
	errorYearField.style.display = "none";

	// errorText.classList.remove("error");
	console.log("no error");
}
