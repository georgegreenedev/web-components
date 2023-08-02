class Combobox extends HTMLElement {
  datalist;
  datalistNodes = [];
  fieldset;
  input;
  label;
  li;
  shadowRoot;
  span;
  ul;

  selectionsUl;
  selectionsInitialLi;

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
    this.li = document.createElement("li");
    this.selectionsUl = document.createElement("ul");
    this.selectionsInitialLi = document.createElement("li");
    this.span = document.createElement("span");
    this.ul = document.createElement("ul");
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
    this.selectionsUl.style.height = "57vh";
    this.selectionsUl.style.margin = "0px";
    this.selectionsUl.style.width = "25vw";
    this.selectionsUl.style.outline = "dotted";
  }

  setContent() {
    this.label.textContent = this.getAttribute("label");
    this.li.textContent = "list item";
    this.selectionsInitialLi.textContent = "Selections:";
  }

  appendChildren() {
    this.fieldset.appendChild(this.label);
    this.fieldset.appendChild(this.input);

    this.input.appendChild(this.span);

    this.datalist.appendChild(this.ul);
    this.ul.replaceChildren(...this.datalistNodes);

    this.shadowRoot.appendChild(this.fieldset);

    this.selectionsUl.appendChild(this.selectionsInitialLi);
    document.body.appendChild(this.selectionsUl);
  }

  addEventListeners() {
    this.input.addEventListener("blur", this.collapseDatalist);
    this.input.addEventListener("focus", this.expandDatalist);
    this.input.addEventListener("input", this.handleSearchInput);
    this.input.addEventListener("keypress", this.handleKeypress);
  }

  setListOptions() {
    const loremIpsum =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const loremIpsumList = loremIpsum.split(" ");

    for (let i = 0; i < loremIpsumList.length; i++) {
      const option = document.createElement("li");
      option.textContent = loremIpsumList[i];
      this.datalistNodes.push(option);
    }
  }

  handleKeypress = (e) => {
    if (e.key === "Enter" && this.suggestion) {
      const li = document.createElement("li");
      li.textContent = this.suggestion;
      this.selectionsUl.appendChild(li);
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
    if (typeof searchValue === "string" && searchValue !== "") {
      const matchingNodes = [];

      for (let i = 0; i < this.datalistNodes.length; i++) {
        if (this.datalistNodes[i].textContent.includes(searchValue)) {
          matchingNodes.push(this.datalistNodes[i]);
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
