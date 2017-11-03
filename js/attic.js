const GameRepository = {
  listGames: function() {
    const url = "data/collection.csv";
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          //console.log({ message: "Got response from "+url, payload: response });
          return response
            .text()
            .then((text) => {
              // Load csv file
              const games = $.csv.toObjects(text);
              console.log({ message: "csv loaded", payload: games });
              return games;
            });
        } else {
          throw new Error("error calling url "+ url + " got response status " + response.status);
        }
      });
  }
}

class NavigationComponent extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
  }
    
  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top bg-white">
        <a className="navbar-brand" href="#">Attic</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Clear filters <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="groupByDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Group by
              </a>
              <div className="dropdown-menu" aria-labelledby="groupByDropdown">
                <a className="dropdown-item" href="#">dc</a>
                <a className="dropdown-item" href="#">ds</a>
                <a className="dropdown-item" href="#">gba</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="filterByDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Filter by
              </a>
              <div className="dropdown-menu" aria-labelledby="filterByDropdown">
                <a className="dropdown-item" href="#">dc</a>
                <a className="dropdown-item" href="#">ds</a>
                <a className="dropdown-item" href="#">gba</a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    );
  }
}

class GameListComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }
  
  componentDidMount() {
    GameRepository
      .listGames()
      .then((games) => {
        this.setState({ games: games });
      });
  }
    
  render() {
    console.log(this.state.games);
    return (
      <ul id="game-collection" className="list-group">
        {this.state.games.map((game, i) => {
          return (
            <li key={i} className="list-group-item">
              {game.Title}
              <div className="float-right">
                <span className="badge badge-primary">{game.Console}</span>
                <span className="badge badge-primary">{game.Zone}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

class AtticApp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { games: null };
  }
    
  render() {
    return (
      <div>
        <header>
          <NavigationComponent />
        </header>
        <main className="container">
          <br />
          <div className="row">
            <div className="col-sm">
              <GameListComponent />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(
  <AtticApp />,
  document.getElementById("app")
);