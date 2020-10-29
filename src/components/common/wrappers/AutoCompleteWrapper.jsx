import React, {Component} from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    root: {
        color: 'rgba(0, 0, 0, 0.87)',
        cursor: 'text',
        display: 'inline-flex',
        position: 'relative',
        fontSize: '0.7rem',
        boxSizing: 'border-box',
        alignItems: 'center',
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        fontWeight: 400,
        lineHeight: '1.1876em',
        letterSpacing: '0.00938em',
    },
});

class AutoCompleteWrapper extends Component{
    constructor(props) {
        super(props);
    }

    autocomplete = (id, url) => {
        let inp = document.getElementById(id);
        let currentFocus;
        let pageCount = 1;
        inp.addEventListener("input", async function (e) {
            currentFocus = -1;
            closeAllLists();
            pageCount = 1;
            localStorage.setItem(id, '');
            if (!this.value) {
                const array = await fetchValues("", 1);
                await displayList(inp, array, true);
            } else {
                const array = await fetchValues(inp.value, "");
                await displayList(inp, array, false);
            }
        });

        inp.addEventListener("keydown", function (e) {
            let x = document.getElementById(id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode === 40) { // ARROW DOWN
                currentFocus++;
                addActive(x);
            } else if (e.keyCode === 38) { // ARROW UP
                currentFocus--;
                addActive(x);
            } else if (e.keyCode === 13) { // ENTER
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });

        inp.addEventListener("click", async function (e) {
            e.preventDefault();
            closeAllLists();
            pageCount = 1;
            currentFocus = -1;
            const array = await fetchValues(inp.value, 1);
            await displayList(document.getElementById(id), array, true);
        });

        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists() {
            let x = document.getElementsByClassName("autocomplete-items");
            if (x.length >= 1) {
                for (let i = 0; i < x.length; i++) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        async function displayList(inp, array, displayAll = false, scrollTop = 0) {
            if (array) {
                closeAllLists();
                let val = inp.value;
                let a = document.createElement("div");
                a.setAttribute("id", id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                a.setAttribute(
                    "style",
                    "max-height: 300px;overflow-x: scroll;scroll-behavior: smooth;overflow: auto;border: 1px solid #d4d4d4");
                a.scrollTop = scrollTop;
                a.addEventListener("scroll", async function (e) {
                    if (this.scrollTop + this.offsetHeight >= this.scrollHeight) {
                        pageCount += 1;
                        const nextPage = await fetchValues(
                            document.getElementById(id).value,
                            pageCount
                        );
                        if (nextPage) {
                            array.push(...nextPage);
                            await displayList(inp, array, displayAll, this.scrollTop);
                        }
                    }
                });
                inp.parentNode.appendChild(a);
                for (let i = 0; i < array.length; i++) {
                    if (displayAll || (array[i].name.toUpperCase().includes(val.toUpperCase()))) {
                        const selectedValue = array[i].id;
                        let b = document.createElement("div");
                        b.setAttribute("style","border: 0");
                        if (!displayAll) {
                            const startIndex = array[i].name.toUpperCase().indexOf(val.toUpperCase());
                            b.innerHTML = array[i].name.substr(0, startIndex);
                            b.innerHTML += "<strong>" + array[i].name.substr(startIndex, val.length) + "</strong>";
                            b.innerHTML += array[i].name.substr(startIndex + val.length, array[i].name.length);
                        } else {
                            b.innerHTML += array[i].name;
                        }
                        b.innerHTML += "<input type='hidden' value='" + array[i].name + "'>";
                        b.addEventListener("click", function (e) {
                            inp.value = this.getElementsByTagName("input")[0].value;
                            localStorage.setItem(id, selectedValue);
                        });
                        a.appendChild(b);
                    }
                }
            }
        }
        
        async function fetchValues(value = "", page) {
            try {
                const URL = url + value + "&page=" + page;
                let response = await axios.get(URL, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                response = response.data;
                response.map(res => {
                   res.id = res.label;
                   res.name = res.label;
                });
                return response;
            } catch (e) {
                return undefined;
            }
        }
        document.addEventListener("click", function(e) {
           closeAllLists();
        });
    }

    componentDidMount() {
        this.autocomplete(this.props.id, this.props.url);
    }
    
    render() {
        const classes = styles();
        return (
            <div className="autocomplete">
                <TextField
                    id={this.props.id}
                    type="text"
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    size={"small"}
                    InputProps={{
                        style: classes.root
                    }}
                    variant={"outlined"}
                    fullWidth={true}/>
            </div>
        )
    }
}

AutoCompleteWrapper.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    url: PropTypes.string.isRequired
}

export default AutoCompleteWrapper;
