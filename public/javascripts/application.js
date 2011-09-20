var App = {
  start: function() {
    $("#main").html("Hello World, some content goes here.")
    $("#button").click(App.changeMessage)
  },
  changeMessage: function() {
    $("#main").html("Button clicked!")
  }
}
