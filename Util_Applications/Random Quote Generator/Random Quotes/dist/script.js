function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      quotes: [
      {
        author: "Ralph Waldo Emerson",
        quote: "The only person you are destined to become is the person you decide to be." }],


      index: 0 });_defineProperty(this, "getRandomIndex",








    () => {
      const { quotes, index } = this.state;
      if (quotes.length > 0) {
        const index = Math.floor(Math.random() * quotes.length);
        this.setState({
          index });

      }
    });}componentDidMount() {fetch(API).then(res => res.json()).then(res => {this.setState({ quotes: res.quotes }, this.getRandomIndex);});}
  render() {
    const { quotes, index } = this.state;
    const quote = quotes[index];
    const url = `https://www.twitter.com/intent/tweet/?text=${quote.quote}-${quote.author} `;
    const pri = "primary";
    const anc = "btn btn-" + pri + "";
    return (
      React.createElement("div", { className: "wrapper d-flex align-items-center justify-content-center" },
      React.createElement("div", { className: "box col-6 p-4 rounded", id: "quote-box" },
      quote &&
      React.createElement("div", { className: "mb-4" },
      React.createElement("p", { id: "text" }, quote.quote, " "),
      React.createElement("p", { id: "author", className: "text-right" }, "- ", quote.author)),


      React.createElement("div", { className: "d-flex justify-content-between" },
      React.createElement("a", { id: "tweet-quote", className: anc, target: "_blank", href: url }, React.createElement("i", { className: "fab fa-twitter" }), "Twitter"),
      React.createElement("button", { id: "new-quote", className: "btn btn-primary ", onClick: this.getRandomIndex }, " ", React.createElement("i", { className: "fab fa-chrome fa-spin" }), "New Quote")))));




  }}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));