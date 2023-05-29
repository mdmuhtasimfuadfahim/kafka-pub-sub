const ProduceEvent = require('kafka-pub-sub/ProduceEvent');

describe('ProduceEvent_function', () => {
    // Tests that the function produces an event successfully with valid inputs.
    it("test_produce_event_successfully", async () => {
        // Arrange
        const topic = "valid_topic";
        const event = "valid_event";
        const data = { validData: true };
        const headers = { 'validHeaders': 'true' };

        // Act
        const result = await ProduceEvent(topic, event, data, headers);

        // Assert
        expect(result).toBeDefined();
    });

    // Tests that the function resolves the promise when the message is sent successfully.
    it("test_promise_resolves_successfully", async () => {
        // Arrange
        const topic = "valid_topic";
        const event = "valid_event";

        // Act
        const result = await ProduceEvent(topic, event);

        // Assert
        expect(result).toBeDefined();
    });

    // Tests that the function throws an error when an invalid topic is provided.
    it("test_invalid_topic_throws_error", async () => {
        // Arrange
        const topic = "";
        const event = "valid_event";
        const data = { validData: true };
        const headers = { validHeaders: true };

        // Act & Assert
        await expect(ProduceEvent(topic, event, data, headers)).rejects.toThrow("Invalid topic");
    });

    // Tests that the function throws an error when an invalid event is provided.
    it("test_invalid_event_throws_error", async () => {
        // Arrange
        const topic = "valid_topic";
        const event = "";
        const data = { validData: true };
        const headers = { 'validHeaders': 'true' };

        // Act & Assert
        await expect(ProduceEvent(topic, event, data, headers)).rejects.toThrow("Invalid event");
    });

    // Tests that the function returns a promise that resolves when the message is sent successfully.
    it("test_promise_resolves_successfully", async () => {
        // Arrange
        const topic = "valid_topic";
        const event = "valid_event";
        const data = { validData: true };
        const headers = { 'validHeaders': 'true' };

        // Act
        const result = await ProduceEvent(topic, event, data, headers);

        // Assert
        expect(result[0].topicName).toBe('valid_topic');
        expect(typeof result[0].partition).toBe('number');
        expect(typeof result[0].baseOffset).toBe('string')
    });

    // Tests that the function throws an error when invalid data is provided.
    it("test_invalid_data_throws_error", async () => {
        // Arrange
        const topic = "valid_topic";
        const event = "valid_event";
        const data = "";
        const headers = { validHeaders: true };

        // Act & Assert
        await expect(ProduceEvent(topic, event, data, headers)).rejects.toThrow("Invalid data");
    });

    // Tests that the function throws an error when invalid headers is provided.
    it("test_invalid_data_throws_error", async () => {
        // Arrange
        const topic = "valid_topic";
        const event = "valid_event";
        const data = { validData: true };
        const headers = "";

        // Act & Assert
        await expect(ProduceEvent(topic, event, data, headers)).rejects.toThrow("Invalid headers");
    });

    // Tests that the function throws an error when an invalid topic is provided.
    it("test_invalid_topic_throws_error", async () => {
        // Arrange
        const topic = "";

        // Act & Assert
        await expect(ProduceEvent(topic, "valid_event")).rejects.toThrow("Invalid topic");
    });

    // Tests that the function throws an error when an invalid event is provided.
    it("test_invalid_event_throws_error", async () => {
        // Arrange
        const event = "";

        // Act & Assert
        await expect(ProduceEvent("valid_topic", event)).rejects.toThrow("Invalid event");
    });
});