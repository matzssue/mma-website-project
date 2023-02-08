const api = async function (property) {
  const data = data.fetch("asda");
  const data2 = await api.json();
  return data2;
};

class class1 extends MotherClass {
  _parentElement = document.querySelector(".asd");

  /// wykonuje sie od razu
  async method1() {
    const data = await api(asd);
    data.forEach((elem) => {
      this._parentElement.innerHTML;
    });
  }
  /// wykonuje sie po naciśnieciu na button
  async method2() {
    const data = await api(asd);
    data.forEach((ele) => {
      this._parentElement.innerHTML;
    });
  }

  /// drugi sposób
  metod1 = () => {
    const data = api(asd);
    data.forEach((elem) => {
      this._parentElement;
    });
  };
}
