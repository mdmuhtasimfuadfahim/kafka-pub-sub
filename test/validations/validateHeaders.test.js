const validateHeaders = require('../../validation/validateHeaders');

describe('validateHeaders_function', () => {
  // Tests that the function successfully validates a valid headers object.
  it('test_valid_headers', () => {
    const headers = {
      'correlation-id': `1-${Date.now()}`,
      'system-id': 'my-system-id',
    };
    expect(() => validateHeaders(headers)).not.toThrow();
  });

  // Tests that the function allows unknown keys in the headers object.
  it('test_unknown_keys', () => {
    const headers = {
      'correlation-id': `1-${Date.now()}`,
      'system-id': 'my-system-id',
    };
    expect(() => validateHeaders(headers)).not.toThrow();
  });

  // Tests that the function throws an error when no headers object is passed.
  it('test_no_headers', () => {
    expect(() => validateHeaders()).toThrow('Invalid headers: No headers found');
  });

  // Tests that the function throws an error when headers argument is not an object.
  it('test_non_object_headers', () => {
    const headers = 'invalid headers';
    expect(() => validateHeaders(headers)).toThrow('Invalid headers: The type of headers should be object');
  });

  // Tests that the function does not check for specific keys in the headers object.
  it('test_missing_keys', () => {
    const headers = {
      'correlation-id': `1-${Date.now()}`,
    };
    expect(() => validateHeaders(headers)).not.toThrow();
  });

  // Tests that the function does not validate the values of the headers object.
  it('test_invalid_values', () => {
    const headers = {
      'correlation-id': 122,
      'system-id': true,
    };
    expect(() => validateHeaders(headers)).not.toThrow();
  });
});
