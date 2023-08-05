class Combobox extends HTMLElement {
  datalist;
  datalistNodes = [];
  fieldset;
  input;
  label;
  option;
  shadowRoot;
  selectionsDatalist;
  selectionsInitialOption;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.createElements();
    this.applyAttributes();
    this.applyStyes();
    this.setContent();
    this.setListOptions();
    this.addEventListeners();
    this.appendChildren();
  }

  createElements() {
    this.datalist = document.createElement("datalist");
    this.fieldset = document.createElement("fieldset");
    this.input = document.createElement("input");
    this.label = document.createElement("label");
    this.option = document.createElement("option");
    this.selectionsDatalist = document.createElement("datalist");
    this.selectionsInitialOption = document.createElement("option");
  }

  applyAttributes() {
    this.input.setAttribute("placeholder", "Type to search...");
    this.input.setAttribute("type", "search");
  }

  applyStyes() {
    this.datalist.style.display = "block";
    this.datalist.style.maxHeight = "50vh";
    this.datalist.style.overflow = "auto";
    this.fieldset.style.border = "none";
    this.fieldset.style.display = "block";
    this.fieldset.style.outline = "solid";
    this.fieldset.style.width = "25w";
    this.input.style.display = "block";
    this.input.style.width = "100%";
    this.label.style.display = "block";
    this.selectionsDatalist.style.display = "block";
    this.selectionsDatalist.style.height = "57vh";
    this.selectionsDatalist.style.margin = "0px";
    this.selectionsDatalist.style.width = "25vw";
    this.selectionsDatalist.style.outline = "dotted";
  }

  setContent() {
    this.label.textContent = this.getAttribute("label");
    this.option.textContent = "list item";
    this.selectionsInitialOption.textContent = "Selections:";
  }

  appendChildren() {
    this.fieldset.appendChild(this.label);
    this.fieldset.appendChild(this.input);
    this.datalist.replaceChildren(...this.datalistNodes);
    this.shadowRoot.appendChild(this.fieldset);
    this.selectionsDatalist.appendChild(this.selectionsInitialOption);
    document.body.appendChild(this.selectionsDatalist);
  }

  addEventListeners() {
    // this.input.addEventListener("blur", this.collapseDatalist);
    this.input.addEventListener("focus", this.expandDatalist);
    this.input.addEventListener("input", this.handleSearchInput);
    this.input.addEventListener("keypress", this.handleKeypress);
    window.addEventListener("keydown", this.handleWindowKeydown);
    window.addEventListener("click", (e) => console.log(e));
  }

  setListOptions() {
    const loremIpsum =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const loremIpsumList = loremIpsum.split(" ");
    for (let i = 0; i < loremIpsumList.length; i++) {
      const option = document.createElement("option");
      option.addEventListener("click", this.handleOptionClick);
      option.textContent = loremIpsumList[i];
      this.datalistNodes.push(option);
    }
  }

  handleWindowKeydown = (e) => {
    // console.log(this.shadowRoot.activeElement);
    // console.log(this.datalist.children);
    if (document.activeElement === document.body) {
      // console.log("da body");
      // this.datalist.
    }
    if (
      this === document.activeElement &&
      e.key === "ArrowDown" &&
      this.datalist.children.length > 0
    ) {
      // console.log("should traverse list");
    }
  };

  handleOptionClick = (e) => {
    // console.log(e);
    if (e.target.value) {
      const option = document.createElement("option");
      option.textContent = e.target.value;
      this.selectionsDatalist.appendChild(option);
      this.datalist.removeChild(e.target);
    }
  };

  handleKeypress = (e) => {
    if (e.key === "Enter" && this.suggestion) {
      const option = document.createElement("option");
      option.textContent = this.suggestion;
      this.selectionsDatalist.appendChild(option);
      // this.datalist.removeChild(option);
      const a = this.datalist.firstChild;
      this.datalist.removeChild(a);
    }
  };

  handleSearchInput = (e) => {
    if (!e.inputType && e.type === "input") {
      this.datalist.replaceChildren(...this.datalistNodes);
    } else if (
      e.inputType === "insertText" ||
      e.inputType === "deleteContentBackward" ||
      e.inputType === "deleteContentForward"
    ) {
      this.filterDatalist(e.target.value);
    }
  };

  expandDatalist = () => {
    this.fieldset.appendChild(this.datalist);
    this.input.select();
  };

  collapseDatalist = () => {
    this.fieldset.removeChild(this.datalist);
  };

  filterDatalist = (searchValue) => {
    console.log(searchValue);
    if (typeof searchValue === "string" && searchValue !== "") {
      console.log("hey");
      console.log(this.datalist.children.length);
      const matchingNodes = [];
      for (let i = 0; i < this.datalist.children.length; i++) {
        console.log("dude");
        console.log(this.datalist);
        console.log(this.datalist.children.item(i));
        if (this.datalist.children.item(i).textContent.includes(searchValue)) {
          matchingNodes.push(this.datalist[i]);
        }
      }
      if (matchingNodes.length > 0) {
        this.suggestion = matchingNodes.at(0).textContent;
      }
      this.datalist.replaceChildren(...matchingNodes);
    } else if (typeof searchValue === "string" && searchValue === "") {
      this.suggestion = "";
      this.datalist.replaceChildren(...this.datalistNodes);
    }
  };
}

customElements.define("wc-combobox", Combobox);
