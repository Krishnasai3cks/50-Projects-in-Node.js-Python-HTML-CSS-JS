function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
const def = `
# header
## header 2
**welcome here**
[link](freecodecamp.org)
> block of text
this is come code \`<div></div>\`
you can also have multilined code
\`\`\`
class happybirthday{
console.log("today is no-one's birthday");
}
\`\`\`
there are lists
- one
- two
Now images
![react logo](https://techchronos.com/wp-content/uploads/SszarkLabs/stack-icon/cywBkaGwkMeDAuJbSt1k.png)
`;
// a list item, a blockquote, an image, and bolded text
class App extends React.Component {
    constructor(...args) {
        super(...args);
        _defineProperty(this, "state", {
            text: def,
        });
        _defineProperty(this, "handleChange", (e) => {
            this.setState({
                text: e.target.value,
            });
        });
    }
    render() {
        const { text } = this.state;
        const markdown = marked(text, { breaks: true });
        console.log(markdown);
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1", { className: "text-center" },
                "Convert your markup here!"
            ),
            React.createElement(
                "div", { className: "row" },
                React.createElement(
                    "div", { className: "col-6" },
                    React.createElement(
                        "h5", { className: "text-center" },
                        "convert your text here"
                    ),
                    React.createElement("textarea", {
                        className: "form-control",
                        id: "editor",
                        value: text,
                        onChange: this.handleChange,
                    })
                ),

                React.createElement(
                    "div", { className: "col-6" },
                    React.createElement(
                        "h5", { className: "text-center" },
                        " See your markup here "
                    ),
                    React.createElement("div", {
                        className: "preview rounded",
                        id: "preview",
                        dangerouslySetInnerHTML: {
                            __html: markdown,
                        },
                    })
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));