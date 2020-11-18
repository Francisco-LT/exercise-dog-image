import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.saveDog = this.saveDog.bind(this);
    this.renderDogPhotos = this.renderDogPhotos.bind(this);

    this.state = {
      dogObject: undefined,
      loading: true,
      storedDog: [],
    };
  }

  async fetchDog() {
    const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random')
    const requestObject = await requestReturn.json()
    this.setState({
      dogObject: requestObject
    })
  }

  componentDidMount() {
    this.fetchDog();
    console.log('componentDidMount')
    // é um excelente local para fazermos requisições API
    // é na fase de montagem e pegamos esses dados para terminar de montar o componente
    // mas está fora de render e constructro
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    if (nextState.dogObject.message.includes("terrier")) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
    localStorage.setItem("dogURL", this.state.dogObject.message);
    const dogBreed = this.state.dogObject.message.split("/")[4];
    alert(dogBreed);
  }

  saveDog() {
    const { 
      dogObject: { message }, 
      storedDog
    } = this.state;
    const newStoredDog = [...storedDog, message];
    this.setState({ storedDog: newStoredDog });
    this.fetchDog();
  }

  renderDogPhotos() {
    return (
      <div>
        <button type="button" onClick={this.saveDog}>Save dog</button>
      </div>
    )
  }
  render() {
    console.log('renderizou')
    const { dogObject } = this.state
    const loadingElement = <span>Loading...</span>
    if (dogObject === undefined) return loadingElement
    return (
    <div>
      <img src={dogObject.message} alt={dogObject.message}></img>
      <span>{this.renderDogPhotos()}</span>
    </div>
    );
  }
}

export default App;
