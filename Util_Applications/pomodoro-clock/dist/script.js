function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class App extends React.Component {







  constructor(props) {
    super(props);_defineProperty(this, "state", { timertext: 'Session', timerclock: 25 * 60, breaklen: 5, sessionlen: 25, isplaying: false });_defineProperty(this, "handlePlayPause",






    () => {
      const { isplaying } = this.state;
      if (isplaying) {
        clearInterval(this.loop);
        this.setState({
          isplaying: false });

      } else {
        this.setState({
          isplaying: true });

        this.loop = setInterval(() => {
          const { timertext, timerclock, breaklen, sessionlen } = this.state;
          if (timerclock === 0) {
            this.audioBeep.play();
            this.setState({
              timertext: timertext === 'Session' ? 'Break' : 'Session',
              timerclock: timertext === 'Session' ? breaklen * 60 : sessionlen * 60 });

          } else {
            this.setState({
              timerclock: timerclock - 1 });

          }
        }, 1000);
      }
    });_defineProperty(this, "reset",
    () => {
      this.setState({
        timertext: 'Session',
        timerclock: 25 * 60,
        breaklen: 5,
        sessionlen: 25,
        isplaying: false });

      this.loop && clearInterval(this.loop);
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
    });_defineProperty(this, "handleBreakDecrease",
    () => {
      const { breaklen, isplaying, timertext } = this.state;

      if (breaklen > 1) {
        if (!isplaying && timertext === 'Break') {
          this.setState({
            breaklen: breaklen - 1,
            timerclock: (breaklen - 1) * 60 });

        } else {
          this.setState({
            breaklen: breaklen - 1 });

        }
      }
    });_defineProperty(this, "handleBreakIncrease",
    () => {
      const { breaklen, isplaying, timertext } = this.state;

      if (breaklen < 60) {
        if (!isplaying && timertext === 'Break') {
          this.setState({
            breaklen: breaklen + 1,
            timerclock: (breaklen + 1) * 60 });

        } else {
          this.setState({
            breaklen: breaklen + 1 });

        }
      }
    });_defineProperty(this, "handleSessionDecrease",

    () => {
      const { sessionlen, isplaying, timertext } = this.state;

      if (sessionlen > 1) {
        if (!isplaying && timertext === 'Session') {
          this.setState({
            sessionlen: sessionlen - 1,
            timerclock: (sessionlen - 1) * 60 });

        } else {
          this.setState({
            sessionlen: sessionlen - 1 });

        }
      }
    });_defineProperty(this, "handleSessionIncrease",

    () => {
      const { sessionlen, isplaying, timertext } = this.state;

      if (sessionlen < 60) {
        if (!isplaying && timertext === 'Session') {
          this.setState({
            sessionlen: sessionlen + 1,
            timerclock: (sessionlen + 1) * 60 });

        } else {
          this.setState({
            sessionlen: sessionlen + 1 });

        }
      }
    });_defineProperty(this, "clockstyle",



































    count => {
      let minutes = Math.floor(count / 60);
      let seconds = count % 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return `${minutes}:${seconds}`;
    });this.loop = undefined;}componentWillUnmount() {clearInterval(this.loop);}
  render() {
    const { timertext, timerclock, breaklen, sessionlen } = this.state;
    return (
      React.createElement("div", null,
      React.createElement("h1", null, "POMODORO CLOCK"),
      React.createElement("div", { class: "topone" },
      React.createElement("div", { class: "break-label" },
      React.createElement("p", { id: "break-label" }, "Break Length"),
      React.createElement("div", { class: "breakbuts" },
      React.createElement("button", { id: "break-decrement", onClick: this.handleBreakDecrease }, React.createElement("i", { class: "fa fa-arrow-down" })),
      React.createElement("p", { id: "break-length" }, breaklen),
      React.createElement("button", { id: "break-increment", onClick: this.handleBreakIncrease }, React.createElement("i", { class: "fa fa-arrow-up" })))),


      React.createElement("div", { class: "session-label" },
      React.createElement("p", { id: "session-label" }, "Session Length"),
      React.createElement("div", { class: "sessionbuts" },
      React.createElement("button", { id: "session-decrement", onClick: this.handleSessionDecrease }, React.createElement("i", { class: "fa fa-arrow-down" })),
      React.createElement("p", { id: "session-length" }, sessionlen),
      React.createElement("button", { id: "session-increment", onClick: this.handleSessionIncrease }, React.createElement("i", { class: "fa fa-arrow-up" }))))),



      React.createElement("div", { class: "midone" },
      React.createElement("p", { class: "timertext", id: "timer-label" }, timertext),
      React.createElement("span", { class: "timerclock", id: "time-left" }, this.clockstyle(timerclock))),

      React.createElement("div", { className: "lastone" },
      React.createElement("button", { id: "start_stop", onClick: this.handlePlayPause }, React.createElement("i", { className: "fa fa-play" }),
      React.createElement("i", { className: "fa fa-pause" })),
      React.createElement("button", { id: "reset", onClick: this.reset }, React.createElement("i", { className: "fa fa-refresh" }))),

      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav",
        ref: audio => {
          this.audioBeep = audio;
        } })));



  }}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));