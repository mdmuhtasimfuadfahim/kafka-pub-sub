const validateData = require('kafka-pub-sub/validation/validateData');

describe('validateData_function', () => {
    // Tests that the function validates valid object data.
    it("test_validate_data_with_valid_object", () => {
        const validData = { name: "Md. Muhtasim Fuad Fahim", email: "mdmuhtasim.fahim@gmail.com" };
        expect(() => validateData(validData)).not.toThrow();
    });

    // Tests that the function validates an empty object.
    it("test_validate_data_with_empty_object", () => {
        const emptyData = {};
        expect(() => validateData(emptyData)).not.toThrow();
    });

    // Tests that the function throws an error with a specific message when invalid data is passed as input.
    it("test_validate_data_with_invalid_data", () => {
        const invalidData = "invalid";
        expect(() => validateData(invalidData)).toThrow("Invalid data: The type of data should be object");
    });

    // Tests that the function throws an error with a specific message when invalid data type is passed as input.
    it("test_validate_data_with_invalid_data_type", () => {
        const invalidDataType = 123;
        expect(() => validateData(invalidDataType)).toThrow("Invalid data: The type of data should be object");
    });

    // Tests that the function throws an error with a specific message when undefined data type is passed as input.
    it("test_validate_data_with_no_data", () => {
        expect(() => validateData()).toThrow("Invalid data: No data found to produce");
    });
});