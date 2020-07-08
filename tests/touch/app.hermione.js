describe('App', function () {
  it('Внешний вид', function () {
    return this.browser
      .pause(100000)
      .url('/')
      .assertView('plain', '.App');
  });
});
