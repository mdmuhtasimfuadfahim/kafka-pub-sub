const validateEvent = require('../../validation/validateEvent');

describe('validateEvent_function', () => {
  // Tests that the function does not throw an error when valid string event with length between 5 and 20 characters is passed.
  it('test_validate_event_with_valid_string', () => {
    expect(() => validateEvent('valid')).not.toThrow();
    expect(() => validateEvent('validstring')).not.toThrow();
    expect(() => validateEvent('validstringvalid')).not.toThrow();
  });

  // Tests that the function throws an error with a specific message when empty string event is passed or not any string event passed.
  it('test_validate_event_with_empty_string', () => {
    expect(() => validateEvent('')).toThrow(
      'Invalid event: The type of event should be string or the lenght should not be less than 5 and more than 20'
    );
    expect(() => validateEvent()).toThrow(
      'Invalid event: The type of event should be string or the lenght should not be less than 5 and more than 20'
    );
  });

  // Tests that the function throws an error with a specific message when string event with length less than 5 characters or more than 20 characters is passed.
  it('test_validate_event_with_invalid_string', () => {
    expect(() => validateEvent('inv')).toThrow(
      'Invalid event: The type of event should be string or the lenght should not be less than 5 and more than 20'
    );
    expect(() => validateEvent('invalidstringinvalidmorethanlengthoftwenty')).toThrow(
      'Invalid event: The type of event should be string or the lenght should not be less than 5 and more than 20'
    );
  });

  // Tests that the function throws an error with a specific message when non-string event is passed.
  it('test_validate_event_with_non_string', () => {
    expect(() => validateEvent(123)).toThrow(
      'Invalid event: The type of event should be string or the lenght should not be less than 5 and more than 20'
    );
    expect(() => validateEvent(true)).toThrow(
      'Invalid event: The type of event should be string or the lenght should not be less than 5 and more than 20'
    );
    expect(() => validateEvent(null)).toThrow(
      'Invalid event: The type of event should be string or the lenght should not be less than 5 and more than 20'
    );
    expect(() => validateEvent({ key: 'value' })).toThrow(
      'Invalid event: The type of event should be string or the lenght should not be less than 5 and more than 20'
    );
  });
});
