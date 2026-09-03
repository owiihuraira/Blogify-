const validateRegister = (data) => {
    const errors = [];

    if (!data.name || data.name.trim() === "") {
        errors.push("Name is required");
    }

    if (!data.email || data.email.trim() === "") {
        errors.push("Email is required");
    } else if (!data.email.includes("@")) {
        errors.push("Valid email is required");
    }

    if (!data.password || data.password.trim() === "") {
        errors.push("Password is required");
    } else if (data.password.length < 6) {
        errors.push("Password must be at least 6 characters");
    }

    return errors;
};

const validateLogin = (data) => {
    const errors = [];

    if (!data.email || data.email.trim() === "") {
        errors.push("Email is required");
    } else if (!data.email.includes("@")) {
        errors.push("Valid email is required");
    }

    if (!data.password || data.password.trim() === "") {
        errors.push("Password is required");
    }

    return errors;
};

module.exports = {
    validateRegister,
    validateLogin,
};

module.exports = {
    validateRegister,
    validateLogin,
};