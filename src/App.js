import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    currentBrand: '',
    brands: [' '],
    carId: 0,
    carBrand: '',
    carModel: '',
    carPrice: '',
    models: [],

  }

  handleCurrentBrand = (e) => {
    this.setState({
      currentBrand: e.target.value
    })
  }

  handleSelect = (e) => {
    this.setState(
      {
        carModel: e.target.value,
      }
    )
  }

  render() {

    const { currentBrand, brands, models } = this.state;

    return (
      <div className="App">

        <h1>Modelos</h1>

        <section>
          <form onSubmit={(e) => {
            e.preventDefault();

            this.setState(prevState => ({
              brands: [...prevState.brands, prevState.currentBrand]
            }));

          }}>
            <input value={currentBrand} onChange={this.handleCurrentBrand} />
            <button type='submit'>Agregar Marca</button>
          </form>
        </section>

        <section>
          <form onSubmit={(e) => {
            e.preventDefault();
            const newId = Math.floor(Math.random() * 100000);
            this.setState(prevState => {

              const newModel = {
                id: newId,
                model: prevState.carModel,
                brand: prevState.carBrand,
                price: prevState.carPrice,
              }

              console.log(newModel);


              return (
                {
                  models: [
                    ...prevState.models,
                    {...newModel}
                  ]
                }
              )
            })
          }}>
            <select value={this.state.carModel} onChange={this.handleSelect}>
              {
                brands.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))
              }
            </select>

            <input value={this.state.carBrand} onChange={(e) => {
              this.setState(
                {
                  carBrand: e.target.value,
                })
            }} />

            <input value={this.state.carPrice} onChange={(e) => {
              this.setState(
                {
                  carPrice: e.target.value,
                }
              )
            }} />

            <button id='addModelButton' type='submit'>Agregar Modelo</button>
          </form>
        </section>

        {
          this.state.models.length
            ? <section>
              <table>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Precio</th>
                </tr>
                {
                  models.map((currentCarModel) => (
                    <tr key={currentCarModel.id}>
                      <td>{currentCarModel.model}</td>
                      <td>{currentCarModel.brand}</td>
                      <td>{currentCarModel.price}</td>
                      <td onClick={() => {

                        this.setState(prevState => (
                          {
                            models: prevState.models.filter(model => model.id !== currentCarModel.id)
                          }
                        ))

                      }}> - </td>
                    </tr>
                  ))
                }
              </table>
            </section>
            : null
        }
      </div>
    );
  }
}

export default App;
