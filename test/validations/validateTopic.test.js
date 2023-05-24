const validateTopic = require('../../validation/validateTopic')

describe('validateTopic_function', () => {
    // Tests that the function does not throw an error when valid string topic with length between 5 and 20 characters is passed.
    it("test_validate_topic_with_valid_string", () => {
        expect(() => validateTopic("valid")).not.toThrow();
        expect(() => validateTopic("validstring")).not.toThrow();
        expect(() => validateTopic("validstringvalid")).not.toThrow();
    });

    // Tests that the function throws an error with a specific message when empty string topic is passed or not any string topic passed.
    it("test_validate_topic_with_empty_string", () => {
        expect(() => validateTopic("")).toThrowError("Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20");
        expect(() => validateTopic()).toThrowError("Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20");
    });

    // Tests that the function throws an error with a specific message when string topic with length less than 5 characters or more than 20 characters is passed.
    it("test_validate_topic_with_invalid_string", () => {
        expect(() => validateTopic("inv")).toThrow("Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20");
        expect(() => validateTopic("invalidstringinvalidmorethanlengthoftwenty")).toThrow("Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20");
    });

    // Tests that the function throws an error with a specific message when non-string topic is passed.
    it("test_validate_topic_with_non_string", () => {
        expect(() => validateTopic(123)).toThrowError("Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20");
        expect(() => validateTopic(true)).toThrowError("Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20");
        expect(() => validateTopic(null)).toThrowError("Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20");
        expect(() => validateTopic({ key: "value" })).toThrowError("Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20");
    });
});