describe("Application on load", function() {
  beforeEach(function() {
    App.start();
  });
  
  it("should show the Hello World message", function() {
    expect($("#main").html()).toEqual("Hello World, some content goes here.");
  });
  
  describe("On click of button", function() {
    beforeEach(function() {
      $("#button").click();
    });

    it("should change the message", function() {
      expect($("#main").html()).toEqual("Button clicked!");
    });

    afterEach(function() {
    });
  });
  
  afterEach(function() {
  });
});

