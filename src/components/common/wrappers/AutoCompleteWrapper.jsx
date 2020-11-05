import React, {Component} from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

const light = theme => ({
    root: {
        fontSize: '0.7rem',
        backgroundColor: 'white',
    },
    icon: {
        color: '#333',
        position: 'absolute',
        right: 5,
        top: 7,
        width: 20,
        height: 20,
    },
});

const dark = theme => ({
    root: {
        fontSize: '0.7rem',
        backgroundColor: '#333',
        color: 'whitesmoke',
    },
    icon: {
        color: 'whitesmoke',
        position: 'absolute',
        right: 5,
        top: 7,
        width: 20,
        height: 20,
    },
});

class AutoCompleteWrapper extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        }

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    _handleIsOpen = (e) => {
        e.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    autocomplete = async (id, url, inputArray = []) => {
        let inp = document.getElementById(id);
        const rowsPerPage = 200;
        let currentFocus;
        let pageCount = 1;
        let currentArray = [];
        let isOpen = false;
        let isDark = false;
        await fetchValues("", 1);

        inp.addEventListener("input", async function (e) {
            currentFocus = -1;
            closeAllLists();
            localStorage.setItem(id, '');
            await fetchValues(this.value, 1);
            await displayList(false);
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
            isDark = localStorage.getItem('preferredTheme') === 'true';
            if(!isOpen) {
                currentFocus = -1;
                await fetchValues(inp.value, 1);
                await displayList(false);
            } else {
                closeAllLists();
            }
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
            isOpen = false;
        }

        async function displayList(displayAll = false) {
            if (currentArray) {
                closeAllLists();
                let val = inp.value;
                let a = document.createElement("div");
                a.setAttribute("id", id + "autocomplete-list");
                const a_theme = !isDark ? " background-color: white;" : " background-color: #333;";
                a.setAttribute("class", "autocomplete-items");
                a.setAttribute(
                    "style",
                    "max-height: 300px;overflow-x: scroll;scroll-behavior: smooth;overflow: auto;border: 1px solid #d4d4d4;" +
                    " border-radius: 4px; min-height: 1.1876em; white-space: nowrap; text-overflow: ellipsis;" + a_theme);
                a.addEventListener("scroll", async function (e) {
                    if (this.scrollTop + this.offsetHeight >= this.scrollHeight) {
                        pageCount += 1;
                        await fetchValues(
                            document.getElementById(id).value,
                            pageCount
                        );
                        await displayList(displayAll);
                    }
                });
                inp.parentNode.appendChild(a);
                for (let i = 0; i < currentArray.length; i++) {
                    if (displayAll || (currentArray[i].name.toUpperCase().includes(val.toUpperCase()))) {
                        const selectedValue = currentArray[i].id;
                        let b = document.createElement("div");
                        const b_theme = !isDark ? " background-color: white; color: black;"
                            : " background-color: #333; color: whitesmoke";
                        b.setAttribute("style",
                            "border: 0; cursor: pointer; display: flex; padding: 10px 6px 10px 10px;" + b_theme);
                        if (!displayAll) {
                            const startIndex = currentArray[i].name.toUpperCase().indexOf(val.toUpperCase());
                            b.innerHTML = currentArray[i].name.substr(0, startIndex);
                            b.innerHTML += "<strong>" + currentArray[i].name.substr(startIndex, val.length) + "</strong>";
                            b.innerHTML += currentArray[i].name.substr(startIndex + val.length, currentArray[i].name.length);
                        } else {
                            b.innerHTML += currentArray[i].name;
                        }
                        b.innerHTML += "<input type='hidden' value='" + currentArray[i].name + "'>";
                         b.addEventListener("click", function (e) {
                            inp.value = this.getElementsByTagName("input")[0].value;
                            localStorage.setItem(id, selectedValue);
                        });
                        a.appendChild(b);
                    }
                }
                isOpen = true;
            }
        }

        async function fetchValues(value = "", page) {
            if (inputArray.length === 0) {
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
                    if (page > 1)
                        currentArray.push(...response);
                    else
                        currentArray = response;
                } catch (e) {
                    currentArray = undefined;
                }
            } else {
                const arr = inputArray.filter(arr => arr.name.toUpperCase().includes(value.toUpperCase()))
                    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
                if (page > 1)
                    currentArray.push(...arr);
                else
                    currentArray = arr;
            }
        }
        document.addEventListener("click", function(e) {
            if(e.target.id !== id) {
                closeAllLists();
            }
        });
    }

    async componentDidMount() {
        await this.autocomplete(this.props.id, this.props.url, this.props.inputArray, this.props.isDark);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({
                isOpen: false
            });
        }
    }
    
    render() {
        const classes = !this.props.isDark ? light() : dark();
        let arrowIcon = null;
        if(this.state.isOpen) {
            arrowIcon = <KeyboardArrowUpRoundedIcon style={classes.icon} />;
        } else {
            arrowIcon = <KeyboardArrowDownRoundedIcon style={classes.icon} />;
        }

        return (
            <div ref={this.wrapperRef} className="autocomplete" style={{position: 'relative', display: 'inline-block'}}>
                <TextField
                    id={this.props.id}
                    type="text"
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    size={"small"}
                    InputProps={{
                        style: classes.root,
                        endAdornment: arrowIcon
                    }}
                    variant={"outlined"}
                    fullWidth={true}
                    onChange={this.props.onChange}
                    onClick={this._handleIsOpen}/>
            </div>
        )
    }
}

AutoCompleteWrapper.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    url: PropTypes.string,
    inputArray: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
    isDark: PropTypes.bool,
}

export default AutoCompleteWrapper;
