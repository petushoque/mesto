import { Card } from './Card.js'

export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector)
      }
    
      addItem(element) {
        this._container.prepend(element);
      }
    
      renderItems() {    
        this._renderedItems.reverse().forEach(item => {
          this._renderer(item)
        });
      }
}