export class BinarySort {
    constructor(parent, size = 10) {
        this.parent = parent;
        this.size = size;
        this.sort = () => {
            this.removeComparing();
            if (this.index2 >= this.index1) {
                this.index1--;
                this.index2 = 0;
            }
            if (this.index1 <= 0) {
                return this.stop();
            }
            if (this.swapping) {
                if (this.almostSwap) {
                    this.addSwapping(this.index2);
                    this.addSwapping(this.index2 + 1);
                    this.almostSwap = false;
                }
                else {
                    this.swap(this.index2, this.index2 + 1);
                    this.swapping = false;
                    this.index2++;
                    // if(this.index2 >= this.index1){
                    //   this.index1--;
                    //   this.index2 = 0;
                    // }
                }
            }
            if (!this.swapping) {
                this.addComparing(this.index2);
                if (this.index2 < this.index1)
                    this.addComparing(this.index2 + 1);
                if (this.compare(this.index2, this.index2 + 1)) {
                    this.swapping = true;
                    this.almostSwap = true;
                }
                else {
                    this.index2++;
                }
            }
        };
        this.numbers = [];
        this.children = [];
        this.interval = -1;
        this.index1 = 0;
        this.index2 = 0;
        this.swapping = false;
        this.almostSwap = false;
        this.reset();
    }
    reset() {
        if (this.interval !== -1)
            clearInterval(this.interval);
        this.numbers = [];
        this.children = [];
        this.interval = -1;
        this.index1 = this.size - 1;
        this.index2 = 0;
        this.initArray();
        this.children = new Array();
        this.parent.innerHTML = "";
        for (let i = 0; i < this.size; i++) {
            this.addNumber(this.numbers[i], i);
        }
    }
    removeComparing() {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].classList.remove('comparing');
            this.children[i].classList.remove("swapping");
        }
    }
    addComparing(index) {
        const elem = this.getElementByOrder(index);
        if (elem !== null && !elem.classList.contains('comparing'))
            elem.classList.add('comparing');
    }
    addSwapping(index) {
        const elem = this.getElementByOrder(index);
        if (elem !== null)
            elem.classList.add('swapping');
    }
    addNumber(num, order) {
        const numDiv = document.createElement('DIV');
        numDiv.innerText = num.toString();
        numDiv.classList.add('number');
        numDiv.style.order = order.toString();
        this.parent.appendChild(numDiv);
        this.children.push(numDiv);
    }
    swap(i, j) {
        const a = this.getElementByOrder(i);
        const b = this.getElementByOrder(j);
        if (a === null || b === null)
            return;
        const order1 = a.style.order;
        a.style.order = b.style.order;
        b.style.order = order1;
    }
    getElementByOrder(order) {
        for (const child of this.children) {
            if (child.style.order === order.toString()) {
                return child;
            }
        }
        return null;
    }
    initArray() {
        this.numbers = new Array();
        for (let i = 0; i < this.size; i++) {
            const num = Math.floor(Math.random() * 1000);
            this.numbers.push(num);
        }
        console.log(this.numbers);
    }
    compare(i, j) {
        const numi = this.getElementByOrder(i);
        const numj = this.getElementByOrder(j);
        if (numi === null || numj === null || numi.textContent === null || numj.textContent === null)
            return false;
        return parseInt(numi.textContent) > parseInt(numj.textContent);
    }
    start() {
        this.interval = setInterval(this.sort, 1000);
    }
    stop() {
        clearInterval(this.interval);
    }
}
