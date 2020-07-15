describe('App', function () {
  it('Внешний вид', function () {
    return this.browser
      .url('/')
      .assertView('plain', '.App');
  });
});
