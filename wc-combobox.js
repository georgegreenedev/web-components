class Combobox extends HTMLElement {
  datalist;
  datalistNodes = [];
  fieldset;
  input;
  label;
  li;
  shadowRoot;
  ul;

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
    this.ul = document.createElement("ul");
  }

  applyAttributes() {
    this.input.setAttribute("placeholder", "Type to search...");
    this.input.setAttribute("type", "search");
  }

  applyStyes() {
    this.datalist.style.display = "block";
    this.datalist.style.border = "1px solid";
    this.fieldset.style.display = "block";
    this.input.style.display = "block";
    this.input.style.width = "100%";
    this.label.style.display = "block";
  }

  setContent() {
    this.label.textContent = this.getAttribute("label");
    this.li.textContent = "list item";
  }

  appendChildren() {
    this.fieldset.appendChild(this.label);
    this.fieldset.appendChild(this.input);

    this.datalist.appendChild(this.ul);
    this.ul.replaceChildren(...this.datalistNodes);

    this.shadowRoot.appendChild(this.fieldset);
  }

  addEventListeners() {
    this.input.addEventListener("focus", this.expandDatalist);
    this.input.addEventListener("blur", this.collapseDatalist);
    this.input.addEventListener("input", this.handleSearchInput);
  }

  setListOptions() {
    for (let i = 0; i < 26; i++) {
      const option = document.createElement("li");
      option.textContent = String.fromCharCode(i + 65);
      this.datalistNodes.push(option);
    }
  }

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
  };

  collapseDatalist = () => {
    this.fieldset.removeChild(this.datalist);
  };

  filterDatalist = (searchValue) => {
    if (typeof searchValue === "string" && searchValue !== "") {
      const matchingNodes = [];

      for (let i = 0; i < this.datalistNodes.length; i++) {
        if (this.datalistNodes[i].textContent === searchValue.toUpperCase()) {
          matchingNodes.push(this.datalistNodes[i]);
        }
      }

      this.datalist.replaceChildren(...matchingNodes);
    } else if (typeof searchValue === "string" && searchValue === "") {
      this.datalist.replaceChildren(...this.datalistNodes);
    }
  };
}

customElements.define("wc-combobox", Combobox);
