class Combobox extends HTMLElement {
  button;
  datalist;
  datalistNodes = [];
  details;
  fieldset;
  input;
  label;
  li;
  shadowRoot;
  span;
  summary;
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
    this.button = document.createElement("button");
    this.datalist = document.createElement("datalist");
    this.details = document.createElement("details");
    this.fieldset = document.createElement("fieldset");
    this.input = document.createElement("input");
    this.label = document.createElement("label");
    this.li = document.createElement("li");
    this.span = document.createElement("span");
    this.summary = document.createElement("summary");
    this.ul = document.createElement("ul");
  }

  applyAttributes() {
    this.button.setAttribute("type", "checkbox");
    this.input.setAttribute("placeholder", "Type to search...");
    this.input.setAttribute("type", "search");
  }

  applyStyes() {
    this.button.style.height = "20px";
    this.button.style.width = "20px";
    this.datalist.style.display = "block";
    this.datalist.style.border = "1px solid";
    this.details.style.backgroundColor = "violet";
    this.fieldset.style.display = "block";
    this.input.style.display = "block";
    this.input.style.width = "100%";
    this.label.style.display = "block";
  }

  setContent() {
    this.label.textContent = this.getAttribute("label");
    this.li.textContent = "list item";
    this.summary.textContent = "Click to expand";
  }

  appendChildren() {
    this.fieldset.appendChild(this.label);
    this.fieldset.appendChild(this.input);
    this.fieldset.appendChild(this.datalist);

    this.datalist.appendChild(this.ul);
    this.ul.replaceChildren(...this.datalistNodes);
    this.details.appendChild(this.summary);
    this.details.appendChild(this.button);

    this.shadowRoot.appendChild(this.fieldset);
  }

  addEventListeners() {
    this.input.addEventListener("focusin", this.expandDatalist);
    this.input.addEventListener("focusout", this.collapseDatalist);
    this.input.addEventListener("keyup", this.filterDatalist);
  }

  setListOptions() {
    for (let i = 0; i < 26; i++) {
      const option = document.createElement("li");
      option.textContent = String.fromCharCode(i + 65);
      this.datalistNodes.push(option);
    }
  }

  expandDatalist = () => this.fieldset.appendChild(this.datalist);
  collapseDatalist = () => this.fieldset.removeChild(this.datalist);
  filterDatalist = (e) => {
    console.log(e.target.value.toUpperCase());
    console.log(this.datalistNodes);
    console.log(this.ul.children);
  };
}

customElements.define("wc-combobox", Combobox);
